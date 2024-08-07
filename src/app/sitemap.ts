import { generateStaticParams } from "@/lib/gql/queries/search/staticSearch";
import { GET_POSTS } from "@/lib/gql/queries/blog/posts";
import { GET_CATEGORIES } from "@/lib/gql/queries/blog/categories";
import { GET_PAGES } from "@/lib/gql/queries/pages";
import { GET_ALL_AUTHORS } from "@/lib/gql/queries/blog/authors";

export default async function sitemap() {
  const baseUrl = "https://flowingkhaos.com/";
  const articlesConnection = await GET_POSTS();
  const categoriesConnection = await GET_CATEGORIES();
  const pagesConnection = await GET_PAGES();
  const authorsConnection = await GET_ALL_AUTHORS();
  const terms = await generateStaticParams();
  //console.log(terms);
  //console.log(productsConnection);
  const excludedSlugs = ["luke-sidney", "sam-pronto"];
  return [
    ...articlesConnection.articles.map((article) => ({
      url: `${baseUrl}blog/articles/${article.slug}`,
      lastModified: `${article.publishedAt}`,
      changeFrequency: "daily",
      priority: 1,
    })),

    ...categoriesConnection.map((category) => ({
      url: `${baseUrl}blog/category/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    })),

    ...terms.map((term) => ({
      url: `${baseUrl}search/${term.params.query}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    })),

    ...pagesConnection
      .filter((page) => !excludedSlugs.includes(page.slug))
      .map((page) => ({
        url: `${baseUrl}${page.slug}`,
        lastModified: `${page.updatedAt}`,
        changeFrequency: "monthly",
        priority: 0.1,
      })),

    ...authorsConnection.map((author) => ({
      url: `${baseUrl}authors/${author.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    })),
  ];
}
