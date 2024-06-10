import { ReactNode } from "react";

export const AllForms = `
query AllForms {
    forms {
      id
      title
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
          choices {
            ... on FormOption {
              id
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
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching forms: ${response.statusText}`);
    }

    const formsData = await response.json();
    //console.log("Received Forms Data:", formsData.data?.forms);

    if (formsData.errors) {
      console.error("Errors occurred while fetching forms:", formsData.errors);
      throw new Error("Errors occurred while fetching forms");
    }

    return formsData.data.forms;
  } catch (error) {
    console.error("GET_FORMS error:", error);
    throw error; // Re-throw the error to be handled by the calling function.
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
  subtitle?: string; // Optional subtitle property
  modal?: boolean; // Optional modal property
  fields: FormField[];
  buttons: FormButton[];
}

export interface FormsResponse {
  data: {
    forms: Form[];
  };
  errors?: any;
}
