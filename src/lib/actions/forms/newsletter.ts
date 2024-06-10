"use server";

import { Form, GET_FORMS } from "@/lib/gql/queries/forms/index";

// interface FormData {
//   email: string;
//   name?: string;
//   get(key: string): string | null;
// }

export async function fetchNewsletterForm(): Promise<Form | undefined> {
  const formsData = await GET_FORMS();
  const blogNewsletterForm = formsData.find(
    (form) => form.title === "Subscribe to the Newsletter!"
  );

  if (!blogNewsletterForm) {
    throw new Error("Invalid form title provided.");
  }

  return blogNewsletterForm;
}

export async function submitNewsletterForm(
  prevState: { success: boolean; error?: string; message: string },
  formData: FormData
): Promise<{ success: boolean; error?: string; message: string }> {
  const apiRequest = process.env.BREVO_ENDPOINT as string;
  const apiKey = process.env.BREVO_API_NEWSLETTER_KEY as string;
  //console.log("submitNewsletterForm called with formData:", formData);

  // Extract email and name from formData within the appropriate block
  let email: string;
  let name: string | undefined; // Declare name as optional (undefined)

  if (formData instanceof FormData) {
    email = formData.get("email") as string; // Type assertion for clarity
    name = formData.get("name") as string; // Type assertion for clarity
    // ... logic for standard FormData
  } else {
    const formDataAsObject = formData as { email: string; name?: string }; // Assert to custom object type
    email = formDataAsObject.email;
    name = formDataAsObject.name?.trim() || ""; // Handle optional name
    // ... logic for custom object
  }

  // Define data outside the if block to be accessible within the try block
  const data = {
    email, // Use destructuring for cleaner syntax
    attributes: { PRENOM: name },
    listIds: [8], // Static brevo listId
    updateEnabled: false,
  };
  //console.log("Sending to Brevo:", JSON.stringify(data));

  try {
    const response = await fetch(apiRequest, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const responseData = await response.json();
      console.error("Brevo Error:", responseData);
      throw new Error(responseData.message || "Error subscribing user");
    }

    const responseData = await response.json();
    //console.log("Brevo Response:", responseData);
    return { success: true, message: "Subscription safe & successful!" };
  } catch (error: any) {
    console.error("Error in submitNewsletterForm:", error.message);
    return { success: false, error: error.message, message: error.message };
  }
}
