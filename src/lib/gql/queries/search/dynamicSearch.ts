import { request, gql } from "graphql-request";
import { Author, Category } from "../blog/posts";
const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

export interface SearchTerm {
  title: string;
  excerpt: string;
  slug: string;
  id: string;
  date: string;
  image: {
    id: string;
    url: string;
    height: number;
    width: number;
  };
  buttons: {
    id: string;
    text: string;
  }[];
  createdAt: string;
  publishedAt?: string;
  updatedAt: string;
  author?: Author;
  category?: Category;
}

interface Edge {
  cursor: string;
  node: SearchTerm;
}

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

interface ArticlesConnection {
  edges: Edge[];
  pageInfo: PageInfo;
}

interface SearchArticlesResponse {
  articlesConnection: ArticlesConnection;
}

export interface SearchArticlesResult {
  articles: SearchTerm[];
  pageInfo: PageInfo;
}

export const SearchArticles = async (
  searchTerm: string,
  first = 25,
  after: string | null | undefined = null
) => {
  const query = gql`
    query SearchArticles($searchTerm: String!, $first: Int, $after: String) {
      articlesConnection(
        where: {
          OR: [
            { title_contains: $searchTerm }
            { excerpt_contains: $searchTerm }
          ]
        }
        first: $first
        after: $after
        orderBy: createdAt_DESC
      ) {
        edges {
          cursor
          node {
            id
            title
            slug
            excerpt
            date
            createdAt
            publishedAt
            updatedAt
            category {
              name
              slug
            }
            author {
              role
              name
              id
              slug
              image {
                url
                width
                height
                id
              }
            }
            image {
              url
              width
              height
              id
            }
            buttons {
              id
              slug
              text
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  try {
    // Fetch articles using the search term and pagination arguments
    const result = await request<SearchArticlesResponse>(graphqlAPI, query, {
      searchTerm,
      first,
      after,
    });
    //console.log("GraphQL Response:", result); // Debugging: Log the full GraphQL response
    return {
      articles: result.articlesConnection.edges.map((edge) => edge.node),
      pageInfo: result.articlesConnection.pageInfo,
    };
  } catch (error) {
    console.error(
      `Error fetching search results for term ${searchTerm}:`,
      error
    );
    return { articles: [], pageInfo: { hasNextPage: false, endCursor: "" } };
  }
};
