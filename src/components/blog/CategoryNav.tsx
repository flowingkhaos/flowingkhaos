import Link from "next/link";
import { Categories } from "@/lib/gql/queries/blog/categories";

async function fetchCategories() {
  // console.log("Request body for Categories:", JSON.stringify({
  //     query: Categories
  // }, null, 2));
  const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

  const response = await fetch(apiRequest, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: Categories,
      //next: { revalidate: 3600 },
    }),
  });

  const res = await response.json();
  //console.log(res.data.categories);

  if (!response.ok || res.errors) {
    console.error("API returned an error. Response:", res);
    throw new Error(
      `API error: ${res.errors ? res.errors[0].message : response.statusText}`
    );
  }

  //console.log("Response data for Categories:", res);

  if (!res.data || !res.data.categories) {
    console.error("Unexpected response structure: ", res);
    throw new Error(`Categories data not found`);
  }
  //console.log("Detailed Categories Data:", res.data.categories);
  return res.data.categories;
}

export default async function CategoryNav() {
  let categories = [];
  try {
    categories = await fetchCategories();
  } catch (error) {
    console.error("Error fetching categories data:", error);
    return <div>Error loading categories</div>;
  }

  if (!Array.isArray(categories) || categories.length === 0) {
    console.warn("No categories available.");
    return <div>No categories available</div>;
  }

  return (
    <section className="flex flex-col h-full p-4 inviz shadow-xl rounded border border-primary z-50 mb-8 lg:my-24 font-black">
      <h1 className="text-xl leading-9 text-center tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 my-4 font-montserrat">
        Categories
      </h1>
      <ul className="list-none list-inside space-y-4">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/blog/category/${category.slug}`}
              className="text-xl leading-9 font-bold text-primary hover:text-secondary tracking-tight md:text-2xl md:leading-10"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
