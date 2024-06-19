import { URLSearchParams } from "url";

//? query
export const Authors = `
query AUTHORS {
  authorsConnection(locales: en) {
    edges {
      node {
        biography
        id
        name
        role
        slug
        articles {
          id
        }
        image {
          id
          height
          width
          url
        }
      }
    }
  }
}
`;

//? fetch function
export async function GET_ALL_AUTHORS(): Promise<Author[]> {
  const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;
  try {
    const response = await fetch(apiRequest, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: Authors,
        //next: { revalidate: 3600 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching authors: ${response.statusText}`);
    }

    const authors = await response.json();

    console.log(authors.data.authorsConnection.edges);
    return authors.data.authorsConnection.edges.map((edge: any) => ({
      biography: edge.node.biography,
      id: edge.node.id,
      name: edge.node.name,
      role: edge.node.role,
      slug: edge.node.slug,
      image: edge.node.image,
      articles: edge.node.articles,
    }));
  } catch (error) {
    console.error("GET_ALL_AUTHORS error:", error);
    throw error; // Re-throw the error to be handled by the calling function.
  }
}

export const AUTHORS_QUERY = `
query AUTHORS_QUERY($slug: String!) {
  authorsConnection(locales: en, where: { slug: $slug }) {
    edges {
      node {
        biography
        id
        name
        role
        slug
        articles {
          id
        }
        image {
          id
          height
          width
          url
        }
      }
    }
  }
}
  `;

export async function GET_AUTHORS(slug: string): Promise<Author[]> {
  const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

  const params = new URLSearchParams({
    method: "POST",
    AUTHORS_QUERY,
    variables: JSON.stringify({ slug: slug }),
  });
  //console.log(slug);

  try {
    const response = await fetch(`${apiRequest}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: AUTHORS_QUERY,
        variables: { slug: slug },
      }),
    });

    if (!response.ok) {
      throw new Error(
        `fetchAPI request failed with status: ${response.status}`
      );
    }

    const authorsData = await response.json();
    console.log("Authors Data:", authorsData);

    if (authorsData.errors) {
      console.error(
        "Errors occurred while fetching authors data:",
        authorsData.errors
      );
      throw new Error("Errors occurred while fetching authors data");
    }
    console.log("Authors Connection:", authorsData.data.authorsConnection);
    //console.log(authorsData.data.authorsConnection.edge);
    return authorsData.data.authorsConnection.edges.map((edge: any) => ({
      biography: edge.node.biography,
      id: edge.node.id,
      name: edge.node.name,
      role: edge.node.role,
      slug: edge.node.slug,
      image: edge.node.image,
      articles: edge.node.articles,
    }));
  } catch (error) {
    console.error(`Error fetching Author with slug ${slug}:`, error);
    throw error; // Re-throw the error to be handled by the calling function.
  }
}

// types/author.ts

interface Image {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface Article {
  id: string;
}

export interface Author {
  biography: string;
  id: string;
  name: string;
  role: string;
  slug: string;
  image: Image;
  articles: Article[];
}
