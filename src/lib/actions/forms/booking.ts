"use server";

//import { revalidatePath } from "next/cache";
const apiToken = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN as string;
const mutationsEndpoint = process.env
  .NEXT_PUBLIC_MUTATIONS_HYGRAPH_ENDPOINT as string;

// in actions/booking.ts

export async function submitBookingForm(
  slug: string,
  prevState: any,
  formData: FormData
) {
  //console.log("submitBookingForm called with id:", formData);

  // Corrected extraction from FormData object
  const email = formData.get("courriel"); // corrected from formData.email
  const name = formData.get("nom"); // corrected from formData.name
  //?creating variables for date & time
  const timeString = formData.get("plage horaire");
  const selectedDate = formData.get("selectedDate");

  if (!name || !email || !timeString || !selectedDate) {
    throw new Error("All fields are required.");
  }

  //?combining timeString & selectedDate to create slot field
  const dateTime = new Date(`${selectedDate}${timeString}`);

  const mutation = JSON.stringify({
    query: `
      mutation CREATE_APPOINTMENT($email: String!, $name: String!, $slot: DateTime!, $slug: String!) {
        createAppointment(
          data: {email: $email, name: $name, slot: $slot, product: {connect: {slug: $slug}}}
        ) {
          id
          email
          slot
          name
          product {
            name
          }
        }
      }
        `,
    variables: {
      name,
      email,
      slot: dateTime,
      slug,
    },
  });

  // Headers including Content-Type for JSON and the Authorization token for Hygraph
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiToken}`,
  };

  try {
    // Sending the mutation to Hygraph
    const response = await fetch(mutationsEndpoint, {
      method: "POST",
      headers: headers,
      body: mutation,
    });

    if (!response.ok) {
      // Handling responses that are not OK (e.g., network errors, non-200 status codes)
      const errorData = await response.json();
      console.error("Hygraph Error:", errorData);
      throw new Error(errorData.errors[0].message || "Error submitting slot");
    }

    // Parsing the successful JSON response
    const responseData = await response.json();
    const newAppointmentId = responseData.data.createAppointment.id;
    //console.log("Hygraph Response:", responseData);
    //console.log("Hygraph Response:", responseData.data.createAppointment.id);

    const publishMutation = JSON.stringify({
      query: `
        mutation PublishAppointment($id: ID!) {
          publishAppointment(where: {id: $id}, to: PUBLISHED) {
            id
            email
            slot
            name
            product {
              name
            }
          }
        }
        `,
      variables: { id: newAppointmentId },
    });

    // Sending the Publish Appointment mutation to Hygraph
    const publishResponse = await fetch(mutationsEndpoint, {
      method: "POST",
      headers,
      body: publishMutation,
    });

    //revalidatePath(`/articles/${slug}`);
    if (!publishResponse.ok) {
      const publishErrorData = await publishResponse.json();
      console.error("Hygraph Publish Error:", publishErrorData);
      throw new Error(
        publishErrorData.errors[0]?.message || "Error publishing appointment"
      );
    }

    const publishResponseData = await publishResponse.json();
    //console.log("Hygraph Publish Response:", publishResponseData);

    //revalidatePath(`/posts/${slug}`);
    return {
      success: true,
      message:
        "Rendez-vous enregistré. vous recevrez un courriel de confirmation sous peu...",
    };
  } catch (error: any) {
    console.error("Error in submitBookingForm:", error.message);

    // Check for specific errors
    if (error.message.includes('value is not unique for the field "slot"')) {
      return {
        success: false,
        message:
          "Ce créneau horaire est déjà pris. Merci d'en choisir un autre.",
      };
    }

    if (error.message.includes('value is not unique for the field "email"')) {
      return {
        success: false,
        message:
          "Cet email est déjà associé à un rendez-vous. Veuillez utiliser une autre adresse e-mail ou contactez-nous si vous devez apporter des modifications.",
      };
    }

    // For any other errors
    return {
      success: false,
      message:
        "Échec de la soumission et de la publication du rendez-vous. Veuillez réessayer.",
    };
  }
}

// const graphQLClient = new GraphQLClient(graphqlAPI, {
//     headers: {
//       authorization: `Bearer ${graphCMSToken}`,
//     },
//   });

//   const mutation = gql`
//     mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
//       createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) {
//         id
//       }
//     }
//   `;

//   const result = await graphQLClient.request(mutation, commentData);
//   return result;
// };
