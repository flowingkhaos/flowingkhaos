import { URLSearchParams } from "url";

export const AllPages = `
  query AllPages {
    pages {
      id
      slug
      title
      updatedAt
    }
  }
`;

export async function GET_PAGES(slug: string): Promise<Page[]> {
  const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

  const params = new URLSearchParams({
    method: "POST",
    AllPages,
    variables: JSON.stringify({ where: { slug: slug } }),
  });
  console.log(slug);

  try {
    const response = await fetch(`${apiRequest}?${params}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching pages: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    return data.data.pages;
  } catch (error) {
    console.error(`GET_PAGES error with slug ${slug}:`, error);
    throw error; // Re-throw the error to be handled by the calling function.
  }
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  updatedAt: string;
}