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
import Footer from "@/components/modules/FooterBlock";
import { footerItems, searchItems } from "@/lib/assets";

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
  const description = `Explore articles and posts related to "${searchTerm}" in our blog.`;
  // Use a default Open Graph image
  const openGraphImage = {
    url: "/public/svg/question.svg", // Replace with your default Open Graph image URL
    width: 1200,
    height: 630,
  };
  const robots = "index, follow";
  const twitterCard = "summary_large_image";
  const twitterHandle = "@newmediaintelligence";
  const site = `https://newmediaintelligence.com/search/${searchTerm}`;

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
    icons: {
      icon: "/favicon.ico",
    },
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
    alternates: {
      canonical: site,
      languages: {
        "fr-FR": site,
      },
    },
    metadataBase: new URL(
      `https://newmediaintelligence.com/search/${searchTerm}`
    ),
  };
}

async function generateSchemaMarkup({ params }: Params) {
  const searchTerm = params.query;
  const data = await SEARCH_QUERY(searchTerm);
  const searchResults = data.edges.map((edge) => edge.node);
  const title = `Search results for "${searchTerm}" - New Media Intelligence`;
  const description = `Explore articles and posts related to "${searchTerm}" in our blog.`;
  const site = `https://newmediaintelligence.com/search/${searchTerm}`;

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    name: title,
    description: description,
    url: site,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: searchResults.map((result, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          headline: result.title,
          description: result.excerpt,
          url: `https://newmediaintelligence.com/blog/articles/${result.slug}`,
          image: result.image?.url,
          datePublished: result.publishedAt,
          dateModified: result.updatedAt,
          author: {
            "@type": "Person",
            name: "Luke Sidney",
            url: "https://flowingkhaos.com/authors/luke-sidney",
            sameAs: [
              "https://newmediaintelligence.com/authors/luke-sidney",
              "https://linkedin.com/in/luke-sidney",
            ],
          },
          publisher: {
            "@type": "Organization",
            name: "New Media Intelligence",
            logo: {
              "@type": "ImageObject",
              url: "https://newmediaintelligence.com/logo.png", // Replace with your actual logo URL
            },
          },
        },
      })),
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://newmediaintelligence.com/search/{search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    creator: {
      "@type": "Person",
      name: "Luke Sidney",
      url: "https://flowingkhaos.com/authors/luke-sidney",
      sameAs: [
        "https://newmediaintelligence.com/authors/luke-sidney",
        "https://linkedin.com/in/luke-sidney",
      ],
    },
    dateModified: new Date().toISOString(),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
    />
  );
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
  const specificItem = searchItems.find(
    (item) => item.id === "clxmb6zfq3jg308r980oqyys6"
  );

  return (
    <section className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 py-24">
      <head>{generateSchemaMarkup({ params: { query: params.query } })}</head>
      <div className="max-w-7xl w-full">
        {specificItem && (
          <div key={specificItem.id}>
            <h1 className="leading-10 tracking-tight font-montserrat font-black text-[40px] md:text-3xl lg:text-5xl text-center">
              {specificItem.name}
              <span className="text-primary"> {params.query}</span>
            </h1>
            <h1 className="prose max-w-none text-content font-montserrat py-6 text-lg leading-7">
              {specificItem.title}
            </h1>
          </div>
        )}
        <Button className="" type="button" variant="secondary">
          <Link href="/search">Use the search tool!</Link>
        </Button>
        <ul className="py-6">
          <Suspense fallback={<DecryptLoader />}>
            {searchResults.map(async (article) => (
              <li
                key={article.id}
                className="my-4 py-8 px-2 border-b border-slate-500"
              >
                <article className="max-md:flex-col flex items-center md:space-x-5">
                  <Suspense fallback={<DecryptLoader />}>
                    {article?.image && (
                      <div className="max-md:w-full overflow-hidden flex-shrink-0 py-4">
                        <Image
                          src={article?.image?.url}
                          alt={article?.slug}
                          className="object-cover w-full h-full rounded-xl"
                          width={250}
                          height={250}
                          blurDataURL={article?.image?.url}
                          placeholder="blur"
                        />
                      </div>
                    )}
                  </Suspense>
                  <div className="flex-grow w-full px-2">
                    <div className="flex items-center">
                      <Link
                        href={`/blog/category/${article.category?.slug}`}
                        className="hover:underline hover:text-accent antialiased font-semibold"
                      >
                        {article?.category?.name}
                      </Link>
                      <dl className="inline-block px-6 py-1 text-content text-xs font-montserrat rounded antialiased">
                        <dt className="sr-only">Published on</dt>
                        <dd className="leading-6">
                          <time dateTime={article.updatedAt}>
                            {await getRelativeTime(article.updatedAt)}
                            {(await isOlderThanAdayAgo(article.updatedAt)) && (
                              <Button
                                type="button"
                                size="sm"
                                variant="default"
                                className="justify-center pointer-events-none mx-4 max-md:hidden"
                                aria-label="New!"
                              >
                                New!
                              </Button>
                            )}
                          </time>
                        </dd>
                      </dl>
                    </div>
                    <div className="flex justify-center animate-pulse md:hidden">
                      {(await isOlderThanAdayAgo(article.updatedAt)) && (
                        <Button
                          type="button"
                          size="sm"
                          variant="default"
                          className="flex justify-center pointer-events-none w-full"
                          aria-label="New!"
                        >
                          New!
                        </Button>
                      )}
                    </div>
                    <div className="space-y-6">
                      <h1 className="text-2xl md:text-3xl leading-8 font-black tracking-tight text-primary font-montserrat hover:underline antialiased">
                        <Link href={`/blog/articles/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h1>
                      <Link href={`/authors/${article.author?.slug}`}>
                        <p className="text-content font-montserrat font-semibold leading-7 hover:text-accent hover:underline">
                          {article.author?.name}
                        </p>
                      </Link>
                      {article.excerpt && (
                        <div className="text-sm lg:text-md prose max-w-none text-content font-montserrat max-md:hidden">
                          <p>{article.excerpt}</p>
                        </div>
                      )}
                    </div>

                    {/* <div className="text-base leading-6 font-medium">
        {article.buttons.length > 0 && (
          <BlogButton article={article} />
        )}
      </div> */}
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
