"use server";

//import { revalidatePath } from "next/cache";
import { GET_FORMS } from "@/lib/gql/queries/forms";
const apiToken = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN as string;
const mutationsEndpoint = process.env
  .NEXT_PUBLIC_MUTATIONS_HYGRAPH_ENDPOINT as string;

export async function fetchCommentForm() {
  const formsData = await GET_FORMS();
  const CommentForm = formsData.find(
    (form) => form.title === "Comments section:"
  );

  if (!CommentForm) {
    throw new Error("Invalid form title provided.");
  }

  return CommentForm;
}

// in actions/commentForm.js

export async function submitCommentForm(
  id: string,
  prevState: any,
  formData: FormData
) {
  // console.log(
  //   "submitCommentForm called with id:",
  //   id,
  //   "and formData:",
  //   formData
  // );

  // Corrected extraction from FormData object
  const username = formData.get("nom d'utilisateur"); // corrected from formData.name
  const comment = formData.get("commentaire"); // corrected from formData.comment

  if (!username || !comment) {
    throw new Error("All fields are required.");
  }

  const mutation = JSON.stringify({
    query: `
            mutation CreateComment($username: String!, $comment: String!, $id: ID!) {
                createComment(data: {username: $username, comment: $comment, article: {connect: {id: $id}}}) { 
                    id 
                }
            }
        `,
    variables: {
      username,
      comment,
      id,
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
      throw new Error(
        errorData.errors[0].message || "Error submitting comment"
      );
    }

    // Parsing the successful JSON response
    const responseData = await response.json();
    const newCommentId = responseData.data.createComment.id;
    //console.log("Hygraph Response:", responseData);
    //console.log("Hygraph Response:", responseData.data.createComment.id);

    const publishMutation = JSON.stringify({
      query: `
          mutation PublishComment($id: ID!) {
            publishComment(where: {id: $id}, to: PUBLISHED) {
              id
            }
          }
        `,
      variables: { id: newCommentId },
    });

    // Sending the Publish Comment mutation to Hygraph
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
        publishErrorData.errors[0]?.message || "Error publishing comment"
      );
    }

    const publishResponseData = await publishResponse.json();
    //console.log("Hygraph Publish Response:", publishResponseData);

    //revalidatePath(`/posts/${slug}`);
    return {
      success: true,
      message: "Comment submitted and published successfully!",
    };
  } catch (error: any) {
    console.error("Error in submitCommentForm:", error.message);
    return {
      success: false,
      error: error.message,
      message: "Failed to submit and publish comment.",
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
