import React, { Suspense } from "react";
import BlogHero from "@/components/blog/BlogHero";
import { GET_PAGE } from "@/lib/gql/queries/pages/home";
import notFound from "@/app/not-found";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import {
  Articles,
  GET_POSTS,
  Post,
  PostButton,
} from "@/lib/gql/queries/blog/posts";
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
  const twitterHandle = "@newmediaintelligence";
  const site = `https://newmediaintelligence.com/${pageData.slug}`;
  const robots = "index, follow";

  return {
    title: pageData.seoOverride?.title || pageData.title,
    description: pageData.seoOverride?.description || pageData.description,
    robots: robots,
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      type: "website",
      url: site,
      title: pageData.seoOverride?.title || pageData.title,
      description: pageData.seoOverride?.description || pageData.description,
      siteName: "Newmediaintelligence",
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
    alternates: {
      canonical: site,
      languages: {
        "fr-FR": site,
      },
    },
    metadataBase: new URL(`https://newmediaintelligence.com/${pageData.slug}`),
  };
}

function generateSchemaMarkup(pageData: any, allPosts: Articles) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: pageData.seoOverride?.title || pageData.title,
          description:
            pageData.seoOverride?.description || pageData.description,
          url: `https://newmediaintelligence.com/${slug}`,
          image:
            `${pageData.seoOverride?.image?.url}` || `${pageData.image?.url}`,
          author: {
            "@type": "Person",
            name: "Luke Sidney",
            url: `https://flowingkhaos.com/authors/${allPosts?.articles?.[0].author?.slug}`,
            sameAs: [
              "https://newmediaintelligence.com/authors/luke-sidney",
              "https://linkedin.com/in/luke-sidney",
            ],
          },
          datePublished: pageData.createdAt,
          dateModified: pageData.updatedAt,
          publisher: {
            "@type": "Organization",
            name: "New Media Intelligence",
            logo: {
              "@type": "ImageObject",
              url: "https://newmediaintelligence.com/favicon.ico",
              width: 600,
              height: 60,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://newmediaintelligence.com/${slug}`,
          },
          articleSection: "Blog",
          keywords: allPosts.articles
            .map((article) => article.title)
            .join(", "),
        }),
      }}
    />
  );
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
    <section className="mx-4">
      <head>{generateSchemaMarkup(pageData, allPosts)}</head>

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
        <h1 className="leading-10 tracking-tight font-montserrat font-black text-[40px] md:text-3xl lg:text-5xl">
          {pageData?.subtitle}
        </h1>
      </div>

      <ul className="">
        <Suspense fallback={<DecryptLoader />}>
          {allPosts?.articles?.map(async (article) => {
            return (
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
                          blurDataURL={article.image.url}
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
                      <Link
                        href={
                          article.author
                            ? `/authors/${article.author.slug}`
                            : "#"
                        }
                      >
                        <p className="text-content font-montserrat font-semibold leading-7 hover:text-accent hover:underline">
                          {article.author?.name || "Unknown Author"}
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
