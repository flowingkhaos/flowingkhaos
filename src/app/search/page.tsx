"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import {
  SearchArticles,
  SearchArticlesResult,
  SearchTerm,
} from "@/lib/gql/queries/search/dynamicSearch";
import Footer from "@/components/modules/FooterBlock";
import { searchItems } from "@/lib/assets";
import DecryptLoader from "@/components/loaders/DecryptLoader";
import { Button } from "@/components/ui/button";
import { getRelativeTime, isOlderThanAdayAgo } from "@/lib/actions/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function BlogButton({ article }: { article: SearchTerm }) {
  return (
    <Button className="" type="button" variant="default">
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

const SearchPage = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [articles, setArticles] = useState<SearchTerm[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [endCursor, setEndCursor] = useState<string | null>(null);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    // Reset pagination state when a new search is initiated
    setHasNextPage(false);
    setEndCursor(null);

    try {
      const { articles: fetchedArticles, pageInfo } = await SearchArticles(
        searchTerm,
        25,
        null
      );
      setArticles(fetchedArticles);
      setHasNextPage(pageInfo.hasNextPage);
      setEndCursor(pageInfo.endCursor);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreArticles = async () => {
    if (!hasNextPage) return;

    setLoading(true);
    try {
      const { articles: newArticles, pageInfo } = await SearchArticles(
        searchTerm,
        2,
        endCursor
      );
      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      setHasNextPage(pageInfo.hasNextPage);
      setEndCursor(pageInfo.endCursor);
    } catch (error) {
      console.error("Error fetching more posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderMetaData = () => {
    const defaultImage = "/favicon.ico";
    const siteName = "Flowingkhaos";
    const title = `Search results for "${searchTerm}" | ${siteName}`;
    const description = `Find the information you are looking for with our search tool. Results for "${searchTerm}".`;
    const image = articles.length > 0 ? articles[0].image.url : defaultImage;

    return (
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content={siteName} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://${siteName}.com/search`}></link>
        <link
          rel="alternate"
          hrefLang="fr-FR"
          href={`https://${siteName}.com/search`}
        ></link>
      </Head>
    );
  };

  const specificItem = searchItems.find(
    (item) => item.id === "clxm8q08m39i908r9jizcf4i6"
  );

  return (
    <>
      {renderMetaData()}
      <section className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 py-24">
        <div className="max-w-7xl w-full">
          {specificItem && (
            <div key={specificItem.id}>
              <h1 className="text-center font-black text-[40px] md:text-5xl lg:text-6xl">
                {specificItem.name}
              </h1>
              <h1 className="text-center font-black text-[40px] md:text-5xl lg:text-6xl py-12">
                <span className="text-secondary p-4 rounded border border-accent inviz shadow-xl">
                  {searchTerm}
                </span>
              </h1>
              <h1 className="lg:text-xl max-lg:text-md leading-7 text-primary pb-2">
                {specificItem.title}
              </h1>
              <p className="lg:text-xl max-lg:text-md leading-7 text-primary pb-2">
                {specificItem.description}
              </p>
            </div>
          )}
          <form onSubmit={handleSearch} className="py-6">
            <Label className="">
              <span className="font-montserrat">Search for content here .</span>
            </Label>
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded font-bold text-secondary my-3"
            />
            <div className="py-4 lg:px-10 text-base leading-6 font-medium">
              <Button type="submit" className="mx-1 flex items-center">
                Search
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mx-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Button>
            </div>
          </form>

          <ul className="py-6">
            <Suspense fallback={<DecryptLoader />}>
              {articles.map(async (article) => (
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
                              {(await isOlderThanAdayAgo(
                                article.updatedAt
                              )) && (
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
              {hasNextPage && (
                <Button
                  className="mx-1 flex items-center"
                  onClick={loadMoreArticles}
                  disabled={loading}
                >
                  click here for more results.
                </Button>
              )}
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default SearchPage;
