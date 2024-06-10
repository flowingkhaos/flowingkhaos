import { request, gql } from "graphql-request";
import next from "next";

const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

export const GET_SINGLE_NAV = async ({
  navId,
}: {
  navId: string;
}): Promise<Navigation> => {
  const query = gql`
    query GET_SINGLE_NAV($navId: String!) {
      navigation(where: { navId: $navId }) {
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
  `;

  try {
    const result: SingleNavResponse = await request(apiRequest, query, {
      navId,
      next: { revalidate: 60 },
    });
    //console.log("GraphQL query result:", result);
    return result.navigation;
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
  navigation: Navigation;
}
