import { request, gql } from "graphql-request";

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
  publishedAt: string;
  updatedAt: string;
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

interface SearchArticlesResult {
  articles: SearchTerm[];
  pageInfo: PageInfo;
}

export async function GET_POPULAR_SEACH_TERMS() {
  // Replace with actual logic to fetch popular search terms
  return [
    "ai",
    "blog",
    "generator",
    "image",
    "intelligen",
    "agent",
    "model",
    "base",
    "data",
    "bot",
    "chatbot",
    "outil",
    "rédaction",
    "write",
    "business",
    "chatgpt",
    "openai",
    "gpt",
    "art",
    "mémoire",
    "application",
    "productivité",
  ];
}

export async function generateStaticParams() {
  const popularSearchTerms = await GET_POPULAR_SEACH_TERMS(); // Fetch popular search terms
  return popularSearchTerms.map((term) => ({
    params: { query: term },
  }));
}

// This function executes the SearchQuery GraphQL query with the fetch API
export async function SEARCH_QUERY(
  searchTerm: string,
  first = 25,
  after = null
): Promise<ArticlesConnection> {
  const query = gql`
    query SearchQuery($searchTerm: String!, $first: Int, $after: String) {
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
            image {
              id
              url
              height
              width
            }
            buttons {
              id
              text
            }
            publishedAt
            updatedAt
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;
  const variables = { searchTerm, first, after };
  const result = await fetch(graphqlAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
      //next: { revalidate: 3600 },
    }),
  }).then((res) => res.json());
  //console.log("GraphQL Response:", result); // Debugging: Log the full GraphQL response

  if (result.errors) {
    console.error("GraphQL Errors:", result.errors);
    throw new Error("Failed to fetch search results.");
  }

  return result.data.articlesConnection;
}
