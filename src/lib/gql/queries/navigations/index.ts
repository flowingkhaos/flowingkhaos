import { request, gql } from "graphql-request";
import next from "next";

const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

// export const GET_SINGLE_NAV = async ({
//   navId,
// }: {
//   navId: string;
// }): Promise<Navigation> => {
//   const query = gql`
//     query GET_SINGLE_NAV($navId: String!) {
//       navigation(where: { navId: $navId }) {
//         id
//         link {
//           externalUrl
//           text
//           id
//           page {
//             ... on Page {
//               id
//               slug
//             }
//           }
//         }
//         navId
//       }
//     }
//   `;
export const GET_SINGLE_NAV = async ({
  navId,
}: {
  navId: string;
}): Promise<Navigation> => {
  const query = gql`
    query GET_SINGLE_NAV($navId: String!) {
      navigationsConnection(locales: en, where: { navId: $navId }) {
        edges {
          node {
            id
            link {
              externalUrl
              text
              id
              page {
                ... on Page {
                  id
                  slug
                }
              }
            }
            navId
          }
        }
      }
    }
  `;

  try {
    const result: { navigationsConnection: { edges: any[] } } = await request(
      apiRequest,
      query,
      { navId }
    );

    // Access the first navigation object from edges (assuming single nav)
    const navigation = result.navigationsConnection.edges[0]?.node;

    if (!navigation) {
      throw new Error("Navigation not found"); // Handle case where no nav found
    }

    return {
      id: navigation.id,
      link: navigation.link,
      navId: navigation.navId,
    };
  } catch (error) {
    console.error("Error fetching navigation:", error);
    throw new Error("Failed to fetch navigation");
  }
};

interface Page {
  id: string;
  slug: string;
}

export interface Link {
  externalUrl?: string | null;
  text: string;
  id: string;
  page?: Page | null;
}

export interface Navigation {
  id: string;
  link: Link | Link[];
  navId: string;
}

interface SingleNavResponse {
  navigationsConnection: Navigation;
}
