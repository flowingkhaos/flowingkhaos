// app/search/[query]/page.jsx
import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SEARCH_QUERY,
  SearchTerm,
} from "@/lib/gql/queries/search/staticSearch";
import { getRelativeTime, isOlderThanAdayAgo } from "@/lib/actions/utils";
import DecryptLoader from "@/components/loaders/DecryptLoader";
import { Button } from "@/components/ui/button";
import { Post } from "@/lib/gql/queries/blog/posts";
import Footer from "@/components/modules/Footer";
import { footerItems } from "@/lib/assets";

function BlogButton({ article }: { article: SearchTerm }) {
  return (
    <Button className="" type="button" variant="default">
      <Link
        href={`/blog/articles/${article.slug}`}
        className="mx-1 flex items-center"
        aria-label={`Read "${article.title}"`}
      >
        {article.buttons?.[0]?.text}
        <svg
          xmlns="http:www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mx-1"
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

type Params = {
  params: { query: string };
};

//Function to fetch data based on the current query
export async function generateMetadata({ params }: Params) {
  const searchTerm = params.query;
  const data = await SEARCH_QUERY(searchTerm); // Fetch search results
  const searchResults = data.edges.map((edge) => edge.node);
  // Generate a title using the search term
  const title = `Search results for the term "${searchTerm}"`;
  // Generate a description
  const description = `Explore articles and posts related to "${searchTerm}" on our blog.`;
  // Use a default Open Graph image
  const openGraphImage = {
    url: "/public/svg/question.svg", // Replace with your default Open Graph image URL
    width: 1200,
    height: 630,
  };
  const robots = "index, follow";
  const twitterCard = "summary_large_image";
  const twitterHandle = "@flowingkhaos";
  const site = "https://flowingkhaos.com";

  // Check if there are any search results to include an image in metadata
  if (searchResults.length > 0) {
    // Use the image from the first search result as the Open Graph image
    openGraphImage.url = searchResults[0].image.url;
  }

  // Construct metadata object
  return {
    title: title,
    description: description,
    robots: robots,
    openGraph: {
      type: "website",
      url: site,
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

// The page component function that uses the fetched data to render the page
export default async function SearchPage({ params }: Params) {
  const searchResultsData = await SEARCH_QUERY(params.query);
  const searchResults = searchResultsData.edges.map((edge) => edge.node);
  //console.log("Search Results:", searchResults);
  //console.log("Search Result:", params.query);
  if (!searchResults || searchResults.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen px-4">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
          {/* Left Div for Text */}
          <div className="flex flex-col justify-center items-center space-y-6 text-center">
            <h1 className="text-4xl md:text-6xl leading-10 font-extrabold text-primary">
              No posts available at the moment !
            </h1>
            <p className="text-xl md:text-2xl">
              We couldn&#39;t locate any article related to the topic you&#39;re
              looking for :(
            </p>
            <button className="rounded btn btn-primary shadow-xl">
              <Link href="/search">Search for something else!</Link>
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
  return (
    <section className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 py-24">
      <div className="max-w-7xl w-full">
        <h1 className="text-center font-black text-[40px] md:text-5xl lg:text-6xl">
          Search results for the term:
          <span className="text-primary"> {params.query}</span>
        </h1>
        <h2 className="prose max-w-none text-content font-montserrat py-6 text-lg leading-7">
          This page was created to help new users find their way through more
          useful content.
        </h2>
        <Button className="" type="button" variant="default">
          <Link href="/search">Use the search tool!</Link>
        </Button>
        <ul className="divide-y divide-secondary py-6">
          <Suspense fallback={<DecryptLoader />}>
            {searchResults.map(async (article) => (
              <li key={article.id} className="py-12">
                <article className="flex items-center space-x-5">
                  <dl className="flex-shrink-0 px-2 py-1 text-secondary rounded-md">
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base leading-6 font-bold">
                      <p>Dernière mise à jour,</p>
                      <time dateTime={article.updatedAt}>
                        {await getRelativeTime(article.updatedAt)}
                      </time>
                      <span className="animate-pulse flex text-content justify-center border border-warning rounded mt-3 text-sm shadow-lg">
                        {(await isOlderThanAdayAgo(article.updatedAt)) &&
                          "new!"}
                      </span>
                    </dd>
                  </dl>
                  <Suspense fallback={<DecryptLoader />}>
                    {article.image && (
                      <div className="w-50 h-50 overflow-hidden flex-shrink-0 hidden md:block shadow-xl">
                        <Image
                          src={article.image.url}
                          alt={article.slug}
                          className="object-cover w-full h-full rounded"
                          width={192}
                          height={192}
                        />
                      </div>
                    )}
                  </Suspense>
                  <div className="flex-grow space-y-5">
                    <div className="space-y-6">
                      <h2 className="text-lg md:text-2xl leading-8 font-bold tracking-tight text-primary font-montserrat">
                        <Link href={`/blog/articles/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h2>
                      {article.excerpt && (
                        <div className="text-sm lg:text-md prose max-w-none text-content font-montserrat">
                          {article.excerpt}
                        </div>
                      )}
                    </div>
                    <div className="text-base leading-6 font-medium">
                      {article.buttons.length > 0 && (
                        <BlogButton article={article} />
                      )}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </Suspense>
        </ul>

        <Footer
          id={footerItems[0].id}
          title={footerItems[0].title}
          description={footerItems[0].description}
          name={footerItems[0].name}
        />
      </div>
    </section>
  );
}
