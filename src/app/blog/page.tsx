import React, { Suspense } from "react";
import BlogHero from "@/components/blog/BlogHero";
import { GET_PAGE } from "@/lib/gql/queries/pages/home";
import notFound from "@/app/not-found";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { GET_POSTS, Post, PostButton } from "@/lib/gql/queries/blog/posts";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import DecryptLoader from "@/components/loaders/DecryptLoader";
import { getRelativeTime, isOlderThanAdayAgo } from "@/lib/actions/utils";
import StatBar from "@/components/modules/Stat";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const slug = "blog";

function BlogButton({ article }: { article: Post }) {
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

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await GET_PAGE(slug);
  //console.log(pageData);
  //console.log(pageData?.slug);
  if (!pageData) {
    return {};
  }

  const twitterCard = "summary_large_image";
  const twitterHandle = "@flowingkhaos";
  const site = "https://flowingkhaos.vercel.app";
  const robots = "index, follow";

  return {
    title: pageData.seoOverride?.title || pageData.title,
    description: pageData.seoOverride?.description || pageData.description,
    robots: robots,
    openGraph: {
      type: "website",
      url: site,
      title: pageData.seoOverride?.title || pageData.title,
      description: pageData.seoOverride?.description || pageData.description,
      siteName: "Flowingkhaos",
      images: [
        {
          url:
            `${pageData.seoOverride?.image?.url}` || `${pageData.image?.url}`,
          width: pageData.seoOverride?.image?.width || pageData.image?.width,
          height: pageData.seoOverride?.image?.height || pageData.image?.height,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      creator: twitterHandle,
      site: site,
      title: pageData?.seoOverride?.title || pageData?.title,
      description: pageData?.seoOverride?.description || pageData?.description,
      images: [
        {
          url:
            `${pageData?.seoOverride?.image?.url}` || `${pageData?.image?.url}`,
          width: pageData?.seoOverride?.image?.width || pageData?.image?.width,
          height:
            pageData?.seoOverride?.image?.height || pageData?.image?.height,
        },
      ],
    },
  };
}

export default async function Page() {
  const pageData = await GET_PAGE(slug);

  if (!pageData) {
    return (
      <div>
        <h1>Page not found!</h1>
      </div>
    );
  }

  const allPosts = await GET_POSTS();
  //console.log(allPosts);
  //console.log(pageData);
  //console.log(typeof allPosts);

  if (!allPosts) {
    return (
      <div>
        <h1>no Posts found!</h1>
      </div>
    );
  }
  return (
    <section className=" mx-4">
      <div className="pt-72 md:pt-48 pb-8 space-y-2 md:space-y-5">
        <Suspense fallback={<DecryptLoader />}>
          {pageData?.hero && (
            <BlogHero
              title={pageData.hero?.title}
              subtitle={pageData.hero?.subtitle}
              description={pageData.hero?.description}
              buttons={pageData.buttons}
              image={pageData.hero?.image}
            />
          )}
        </Suspense>
        <h1 className="text-3xl leading-7 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 text-content font-montserrat font-black">
          {pageData?.subtitle}
        </h1>
      </div>

      <ul className="">
        <Suspense fallback={<DecryptLoader />}>
          {allPosts?.articles?.map(async (article) => {
            return (
              <li
                key={article.id}
                className="my-4 py-8 px-2 rounded border border-secondary inviz shadow-xl"
              >
                <article className="flex items-center space-x-5">
                  <dl className="flex-shrink-0 px-2 py-1 text-secondary rounded">
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base leading-6 font-bold">
                      <p>last update,</p>
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
                    {article?.image && (
                      <div className="w-50 h-50 overflow-hidden flex-shrink-0 hidden md:block shadow-xl">
                        <Image
                          src={article?.image?.url}
                          alt={article?.slug}
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
            );
          })}
        </Suspense>
      </ul>
      <div className="py-16 lg:pt-24">
        <Suspense fallback={<DecryptLoader />}>
          {pageData?.stat && <StatBar {...pageData.stat} />}
        </Suspense>
      </div>
    </section>
  );
}
