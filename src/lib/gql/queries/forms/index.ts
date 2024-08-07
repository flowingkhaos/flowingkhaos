import next from "next";
import { ReactNode } from "react";

// export const AllForms = `
// query AllForms {
//     forms {
//       id
//       title
//       subtitle
//       modal
//       fields {
//         __typename
//         ... on FormInput {
//           name
//           type
//           inputLabel: label
//           placeholder
//         }
//         ... on FormTextarea {
//           name
//           textareaLabel: label
//           placeholder
//         }
//         ... on FormSelect {
//           name
//           inputLabel: label
//           choices {
//             ... on FormOption {
//               id
//             }
//           }
//         }
//       }
//       buttons {
//         id
//         text
//         slug
//       }
//     }
//   }
// `;
export const AllForms = `
  query GET_FORMS {
    formsConnection {
      edges {
        node {
          id
          title
          slug
          subtitle
          modal
          fields {
            __typename
            ... on FormInput {
              name
              type
              inputLabel: label
              placeholder
            }
            ... on FormTextarea {
              name
              textareaLabel: label
              placeholder
            }
            ... on FormSelect {
              name
              inputLabel: label
              choices(first: 26) {
                ... on FormOption {
                  id
                  name
                  timeSlot
                  timeString
                }
              }
            }
          }
          buttons {
            id
            text
            slug
          }
        }
      }
    }
  }
`;

export async function GET_FORMS(): Promise<Form[]> {
  const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;
  try {
    const response = await fetch(apiRequest, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: AllForms,
        next: { revalidate: 3300 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching forms: ${response.statusText}`);
    }

    const formsData: FormsResponse = await response.json();

    if (formsData.errors) {
      console.error("Errors occurred while fetching forms:", formsData.errors);
      throw new Error("Errors occurred while fetching forms");
    }

    const forms: Form[] = formsData?.data?.formsConnection?.edges.map(
      ({ node }: { node: any }) => ({
        id: node.id,
        title: node.title,
        slug: node.slug,
        subtitle: node.subtitle,
        modal: node.modal,
        fields: node.fields.map((field: any) => {
          switch (field.__typename) {
            case "FormInput":
              return {
                __typename: field.__typename,
                name: field.name,
                type: field.type,
                inputLabel: field.inputLabel,
                placeholder: field.placeholder,
              };
            case "FormTextarea":
              return {
                __typename: field.__typename,
                name: field.name,
                textareaLabel: field.textareaLabel,
                placeholder: field.placeholder,
              };
            case "FormSelect":
              return {
                __typename: field.__typename,
                name: field.name,
                inputLabel: field.inputLabel,
                choices: field.choices,
              };
            default:
              throw new Error(`Unknown field type: ${field.__typename}`);
          }
        }),
        buttons: node.buttons.map((button: any) => ({
          id: button.id,
          text: button.text,
          slug: button.slug,
        })),
      })
    );

    return forms;
  } catch (error) {
    console.error("GET_FORMS error:", error);
    throw error;
  }
}

export interface FormField {
  inputLabel: ReactNode;
  __typename: string; // This property is required for unions
  name: string;
  label?: string; // Optional label property

  // Specific properties for different field types (unions)
  type?: string; // For FormInput
  placeholder?: string; // For FormInput
  textareaLabel?: string; // For FormTextarea

  // For FormSelect
  choices?: FormOption[];
}

export interface FormOption {
  id: string;
  name: string;
  timeSlot: string;
  timeString: string;
}

export interface FormInput extends FormField {
  type: "text" | "email" | "number" | "password"; // && other supported input types
  label: string; // Override label property for clarity
  placeholder?: string;
}

export interface FormTextarea extends FormField {
  textareaLabel: string; // Override label property for clarity
  placeholder?: string;
}

export interface FormSelect extends FormField {
  label: string; // Override label property for clarity
  choices: FormOption[];
}

export interface FormButton {
  id: string;
  text: string;
  slug?: string; // Optional slug property
}

export interface Form {
  id: string;
  title: string;
  slug: string;
  subtitle?: string; // Optional subtitle property
  modal?: boolean; // Optional modal property
  fields: FormField[];
  buttons: FormButton[];
}

export interface FormsResponse {
  data: {
    formsConnection: any;
    forms: Form[];
  };
  errors?: any;
}
