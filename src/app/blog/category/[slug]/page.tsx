import Link from "next/link";
import Image from "next/image";
import {
  GET_CATEGORIES,
  GET_CATEGORY_POSTS,
  Post,
} from "@/lib/gql/queries/blog/categories";
import { notFound } from "next/navigation";
import { getRelativeTime, isOlderThanAdayAgo } from "@/lib/actions/utils";
import { Metadata, ResolvingMetadata } from "next";
import { Button } from "@/components/ui/button";

async function BlogButton({ article }: { article: Post }) {
  return (
    <Button className="my-2" size="sm" type="button" variant="default">
      <Link
        href={`/blog/articles/${article.slug}`}
        className="mx-1 flex items-center"
        aria-label={`Read "${article.title}"`}
      >
        {article.buttons[0].text}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
          />
        </svg>
      </Link>
    </Button>
  );
}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// export async function generateStaticParams({ params: { slug } }: Props) {
//   const articles = await GET_CATEGORY_POSTS(slug);
//   //console.log("articles: ", articles);
//   //console.log(typeof articles);
//   return articles.map((article) => ({
//     slug: article.slug,
//   }));
// }

export async function generateStaticParams() {
  const categories = await GET_CATEGORIES();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  // Fetch the category details using the slug from params
  const categoryPosts = await GET_CATEGORY_POSTS(slug);
  // Generate a title using the search term
  const title = `"${slug} Category Page"`;
  // Generate a description
  const description = `Browse through the ${slug} category for more accurate research on the topic`;
  // Use a default Open Graph image
  const openGraphImage = {
    url: "/public/svg/question.svg", // Replace with your default Open Graph image URL
    width: 1200,
    height: 630,
  };
  const site = "https://flowingkhaos.com";
  const robots = "index, follow";
  const type = "website";
  const twitterCard = "summary_large_image";
  const twitterHandle = "@mtlonweb";

  if (!categoryPosts || categoryPosts.length === 0) return notFound();
  // Check if there are any search results to include an image in metadata
  if (categoryPosts.length > 0) {
    // Use the image from the first search result as the Open Graph image
    openGraphImage.url = categoryPosts[0].image.url;
  }

  // Construct metadata object
  return {
    title: title,
    description: description,
    robots: robots,
    openGraph: {
      type: type,
      url: site,
      siteName: "Flowingkhaos",
      title: title,
      description: description,
      images: [openGraphImage],
    },
    twitter: {
      card: twitterCard, // or 'summary' based on your preference
      site: twitterHandle, // Your Twitter handle, if available
      title: title, // Twitter card title
      description: description, // Twitter card description
      images: [openGraphImage], // Add your Twitter image URL here
    },
  };
}

export default async function CategoryPosts({ params: { slug } }: Props) {
  //const categoryPosts = await GET_CATEGORY_POSTS(slug);
  let categoryPosts;
  //console.log(slug);
  try {
    categoryPosts = await GET_CATEGORY_POSTS(slug);
  } catch (error) {
    console.error("Failed to fetch category posts:", error);
    return (
      <div className="flex justify-center items-center h-screen px-4">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
          {/* Left Div for Text */}
          <div className="flex flex-col justify-center items-center space-y-6 text-center">
            <h1 className="text-4xl md:text-6xl leading-10 font-extrabold text-primary">
              We Losts all Posts in the Abyss !
            </h1>
            <p className="text-xl md:text-2xl">
              There was an error loading the posts :(
            </p>
            <button className="rounded btn btn-primary shadow-xl">
              <Link href="/blog">Get me out of here!</Link>
            </button>
          </div>
          {/* Right Div for Image */}
          <div className="w-[300px] md:w-[550px] h-[300px] md:h-[550px]">
            <Image
              src="/svg/noresult.svg"
              alt="No results"
              width={300}
              height={300}
              layout="responsive"
            />
          </div>
        </div>
      </div>
    );
  }

  // Render posts if available
  if (!categoryPosts || categoryPosts.length === 0) {
    return (
      <section className="flex justify-center items-center h-screen px-4">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
          {/* Left Div for Text */}
          <div className="flex flex-col justify-center items-center space-y-6 text-center">
            <h1 className="text-4xl md:text-6xl leading-10 font-extrabold text-primary">
              No posts available at the moment !
            </h1>
            <p className="text-xl md:text-2xl">
              We couldn&#39;t locate the posts you&#39;re looking for :(
            </p>
            <button className="rounded btn btn-primary shadow-xl">
              <Link href="/blog">Get me out of here!</Link>
            </button>
          </div>
          {/* Right Div for Image */}
          <div className="w-[300px] md:w-[550px] h-[300px] md:h-[550px]">
            <Image
              src="/svg/noresult.svg"
              alt="No results"
              width={300}
              height={300}
              layout="responsive"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 py-24 inviz z-50">
      {categoryPosts.map(async (article) => (
        <article
          key={article.id}
          className="flex flex-col shadow-xl p-4 rounded border border-secondary mx-4 h-full"
        >
          <Image
            className="w-full h-68 lg:h-52 object-cover mb-4 rounded shadow-lg"
            src={article.image.url}
            alt={article.slug}
            width={1024}
            height={720}
          />
          <div className="flex-grow">
            <dl className="flex-shrink-0 px-2 py-1 text-secondary rounded-md">
              <dt className="sr-only">Published on</dt>
              <dd className="text-base leading-6 font-bold">
                <p>Last update,</p>
                <time dateTime={article.updatedAt}>
                  {getRelativeTime(article.updatedAt)}
                </time>
                {(await isOlderThanAdayAgo(article.updatedAt)) && (
                  <span className="animate-pulse flex text-content justify-center border border-warning rounded mt-3 text-sm shadow-lg">
                    {(await isOlderThanAdayAgo(article.updatedAt)) && "new!"}
                  </span>
                )}
              </dd>
            </dl>
            <h2 className="text-primary text-xl uppercase font-black mb-2 py-4">
              {article.title}
            </h2>
            <p className="text-content">{article.excerpt}</p>
          </div>
          {article.buttons.length > 0 && <BlogButton article={article} />}
        </article>
      ))}
    </section>
  );
}
