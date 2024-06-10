import next from "next";

//? query
export const Categories = `
      query Categories {
          categories {
            name
            slug
          }
      }
    `;

//? fetch function
export async function GET_CATEGORIES(): Promise<Category[]> {
  const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;
  try {
    const response = await fetch(apiRequest, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: Categories,
        next: { revalidate: 60 },
        // No variables are needed for this query.
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.statusText}`);
    }

    const categoriesData = await response.json();

    if (categoriesData.errors) {
      console.error(
        "Errors occurred while fetching categories:",
        categoriesData.errors
      );
      throw new Error("Errors occurred while fetching categories");
    }

    return categoriesData.data.categories;
  } catch (error) {
    console.error("GET_CATEGORIES error:", error);
    throw error; // Re-throw the error to be handled by the calling function.
  }
}

//? query
export const CategoryPost = `
query CategoryPost($categorySlug: String!, $skip: Int, $first: Int) {
    articles(
      where: {category: {slug: $categorySlug}}
      skip: $skip
      first: $first
      orderBy: createdAt_DESC
    ) {
      author {
        role
        name
        id
        image {
          url
          width
          height
          id
        }
      }
      id
      createdAt
      publishedAt
      updatedAt
      slug
      title
      excerpt
      image {
        url
        width
        height
        id
      }
      category {
        name
        slug
      }
      buttons {
        id
        slug
        text
      }
    }
  }
  `;

//? fetch function
export async function GET_CATEGORY_POSTS(
  categorySlug: string,
  skip = 0,
  first = 12
): Promise<Post[]> {
  try {
    const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;
    const requestBody = {
      query: CategoryPost,
      variables: { categorySlug, skip, first },
    };

    const response = await fetch(apiRequest, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("API returned non-JSON response");
    }

    const data = await response.json();

    // Handle potential data structure changes gracefully
    const articles = data?.data?.articles || []; // Use optional chaining and default to an empty array
    console.log(data.data.articles);

    if (data?.errors) {
      // Check if "errors" exist (optional)
      throw new Error(JSON.stringify(data.errors, null, 2));
    }

    return articles; // Return the extracted articles
  } catch (error) {
    console.error("Failed to fetch category posts:", error);
    return []; // Return an empty array or a more specific error object if needed
  }
}

export interface Category {
  name: string;
  slug: string;
}

interface Author {
  name: string;
  id: string;
  role: string;
  image: {
    url: string;
    width: number;
    height: number;
    id: string;
  };
}

interface Button {
  id: string;
  slug: string;
  text: string;
}

export interface Post {
  author: Author;
  id: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
  slug: string;
  title: string;
  excerpt: string;
  image: {
    url: string;
    width: number;
    height: number;
    id: string;
  };
  category?: Category;
  buttons: Button[];
}

export interface CategoryResponse {
  data: {
    category: Category;
  };
  errors?: any;
}

export interface CategoryPostsResponse {
  data: {
    articles: Post[];
  };
  errors?: any;
}
