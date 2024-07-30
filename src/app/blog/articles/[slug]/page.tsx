import Link from "next/link";
import Image from "next/image";
import { RichText } from "@graphcms/rich-text-react-renderer";
import {
  ImageProps,
  LinkProps,
  VideoProps,
  IFrameProps,
  RichTextContent,
} from "@graphcms/rich-text-types";
import { Metadata, ResolvingMetadata } from "next";
import { GET_POSTS, GET_POST_DATA, Post } from "@/lib/gql/queries/blog/posts";
import { Button } from "@/components/ui/button";
import Faq from "@/components/modules/Faq";
import CommentSection from "@/components/blog/CommentSection";
import CommentList from "@/components/blog/CommentList";
import DOWNLOADABLE_CONTENT_BUCKET from "@/components/modules/DownloadableContentBucket";
import { lazy } from "react";

type Params = {
  params: { slug: string };
};
type Src = {
  src: ImageProps;
};
type Text = {
  text: RichTextContent;
};

type StaticImport = any;

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

function BlogButton({ article }: { article: Post }) {
  return (
    <Button className="my-2" type="button" size="xl">
      <Link
        href={`/blog`}
        className="flex items-center"
        aria-label={`Back to blog`}
      >
        {article.buttons[1].text}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 mx-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
      </Link>
    </Button>
  );
}

function CategoryButton({ article }: { article: Post }) {
  return (
    <Button className="my-2" type="button" size="xl">
      <Link
        href={`/blog/category/${article?.category?.slug}`}
        className="flex items-center"
        aria-label={`Back to category`}
      >
        {article.buttons[2] && article.buttons[2].text}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 mx-1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
      </Link>
    </Button>
  );
}

export async function generateStaticParams() {
  const articles = await GET_POSTS();
  //console.log(articles.articles);
  //console.log(typeof articles.articles);
  return articles.articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params: { slug } }: Props) {
  const article = await GET_POST_DATA(slug);
  //console.log(article);
  const twitterCard = "summary_large_image";
  const twitterHandle = "@newmediaintelligence";
  const site = `https://newmediaintelligence.com/blog/articles/${slug}`;
  const robots = "index, follow";

  return {
    title: article?.seoOverride?.title || article?.title,
    description: article?.seoOverride?.description || article?.excerpt,
    robots: robots,
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      publishedTime: article?.publishedAt,
      type: "article",
      url: site,
      title: article?.seoOverride?.title || article?.title,
      description: article?.seoOverride?.description || article?.excerpt,
      siteName: "newmediaintelligence",
      images: [
        {
          url:
            `${article?.seoOverride?.image?.url}` || `${article?.image?.url}`,
          width: article?.seoOverride?.image?.width || article?.image?.width,
          height: article?.seoOverride?.image?.height || article?.image?.height,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      site: twitterHandle,
      title: article?.seoOverride?.title || article?.title,
      description: article?.seoOverride?.description || article?.excerpt,
      images: [
        {
          url:
            `${article?.seoOverride?.image?.url}` || `${article?.image?.url}`,
          width: article?.seoOverride?.image?.width || article?.image?.width,
          height: article?.seoOverride?.image?.height || article?.image?.height,
        },
      ],
    },
    alternates: {
      canonical: site,
      languages: {
        "fr-FR": site,
      },
    },
    metadataBase: new URL(
      `https://newmediaintelligence.com/blog/articles/${slug}`
    ),
  };
}

function generateSchemaMarkup(article: Post) {
  const schemaData: any = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.seoOverride?.title || article.title,
    description: article.seoOverride?.description || article.excerpt,
    image: [`${article.seoOverride?.image?.url}` || `${article.image?.url}`],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: article.author?.name,
      url: `https://flowingkhaos.com/authors/${article.author?.slug}`,
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
        url: "https://newmediaintelligence.com/favicon.ico",
        width: 600,
        height: 60,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://newmediaintelligence.com/blog/${article.slug}`,
    },
  };

  // Add downloadable content if available
  if (
    article.downloadableContentBucket &&
    article.downloadableContentBucket.length > 0
  ) {
    schemaData.hasPart = article.downloadableContentBucket.map((content) => ({
      "@type": "DigitalDocument",
      name: content.name,
      identifier: content.file.fileName,
      description: content.slug,
      encodingFormat: content.file.mimeType,
      url: content.file.url,
    }));
  }

  // Add FAQ if available
  if (article.faq) {
    schemaData.mainEntity = {
      "@type": "FAQPage",
      mainEntity: article.faq.question.map((question, index) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: article?.faq?.answer[index],
        },
      })),
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  );
}

export default async function Page({ params: { slug } }: Props) {
  const article = await GET_POST_DATA(slug);
  //console.log(article);
  //console.log(article?.content);
  //console.log(article?.comments);
  //console.log(typeof article);
  if (typeof article === "undefined") {
    return <div>Error fetching page</div>; // Handle potential errors
  }
  if (!slug) {
    return <div>Error: Missing slug</div>;
  }
  if (!article) {
    return <div>Error: Missing article Data</div>;
  }
  return (
    <article>
      <header className="pt-24 mx-2 lg:pb-10">
        <head>{generateSchemaMarkup(article)}</head>
        <div className="space-y-1">
          <div>
            {article?.image && (
              <div className="hero h-[300px] md:h-[600px] lg:h-[700px] lg:mb-6">
                <Image
                  className="shadow-lg rounded"
                  src={article.image.url}
                  width={article.image.width || 1280}
                  height={article.image.height || 720}
                  alt={article.slug}
                  priority
                  blurDataURL={article.image.url}
                  placeholder="blur"
                />
              </div>
            )}

            <h1 className="leading-10 tracking-tight font-montserrat font-black text-[40px] md:text-3xl lg:text-5xl">
              {article.title}
            </h1>
          </div>
        </div>
      </header>
      <div
        className="divide-y lg:divide-y-0 divide-secondary lg:grid lg:grid-cols-[200px_1fr] gap-x-6 pb-16 lg:pb-20 mx-3"
        style={{ gridTemplateRows: "auto 1fr" }}
      >
        <dl className="pt-6 pb-10 lg:pt-0 lg:border-b lg:border-secondary">
          <dt className="mb-2 text-sm font-bold leading-5 text-secondary">
            Written by
          </dt>
          <dd>
            {article?.author?.image && (
              <ul className="space-x-8 sm:space-x-12 lg:space-x-0 lg:space-y-8">
                <li key={article.author.remoteId} className="flex space-x-2">
                  <Image
                    className="w-10 h-10 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2"
                    src={article.author.image.url}
                    width={article.author.image.width}
                    height={article.author.image.height}
                    alt={article.author.name}
                    blurDataURL={article.author.image.url}
                    placeholder="blur"
                  />
                  <Link
                    href={`/authors/${article.author.slug}`}
                    className="hover:underline hover:text-content"
                  >
                    <dl className="flex-1 text-sm leading-5">
                      <dt className="sr-only">Name</dt>
                      <dd className="text-accent font-bold">
                        {article.author.name}
                      </dd>
                      {article.author.role && (
                        <>
                          <dt className="sr-only">Role</dt>
                          <dd className="text-secondary font-semibold">
                            {article.author.role}
                          </dd>
                        </>
                      )}
                    </dl>
                  </Link>
                </li>
              </ul>
            )}
          </dd>
          <div className="mt-8">
            <dt className="text-sm font-bold leading-5 text-secondary">
              Published on
            </dt>
            <dd className="text-base leading-6 text-accent font-semibold">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </dd>
          </div>
        </dl>
        <div className="prose lg:pb-0 lg:row-span-2 py-8 antialiased">
          {article.content.json && (
            <RichText
              content={article.content.json}
              renderers={{
                h1: ({ children }) => (
                  <h1 className="text-primary leading-10 tracking-tight font-montserrat font-black text-[37px] md:text-3xl lg:text-5xl">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-secondary leading-7 text-[25px] font-extrabold font-montserrat">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-accent leading-5  text-[22px] font-bold font-montserrat">
                    {children}
                  </h3>
                ),
                img: (src: string | StaticImport) => (
                  <div className="">
                    <Image
                      src={src}
                      alt={article.slug}
                      width={500}
                      height={500}
                      className="mx-auto w-full h-auto shadow-lg"
                    />
                  </div>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-primary hover:text-accent font-montserrat font-semibold"
                  >
                    {children}
                  </a>
                ),
                p: ({ children }) => (
                  <p className="mb-3 leading-6 flex-grow text-content font-montserrat font-semibold">
                    {children}
                  </p>
                ),
                li: ({ children }) => (
                  <li className="hover:text-primary font-semibold hover:font-extrabold">
                    {children}
                  </li>
                ),
                code_block: ({ children }) => (
                  <pre className="bg-accent-foreground text-btn font-semibold">
                    {children}
                  </pre>
                ),
                code: ({ children }) => (
                  <code className="text-accent font-semibold">{children}</code>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-secondary my-4">
                      {children}
                    </table>
                  </div>
                ),
                table_head: ({ children }) => (
                  <thead className="bg-secondary text-primary">
                    {children}
                  </thead>
                ),
                table_body: ({ children }) => <tbody>{children}</tbody>,
                table_row: ({ children }) => (
                  <tr className="border-b border-secondary">{children}</tr>
                ),
                table_cell: ({ children }) => (
                  <td className="px-4 py-2 text-sm">{children}</td>
                ),
                table_header_cell: ({ children }) => (
                  <th className="px-4 py-2 font-bold text-left text-sm">
                    {children}
                  </th>
                ),
              }}
            />
          )}
          {article.downloadableContentBucket && (
            <DOWNLOADABLE_CONTENT_BUCKET
              downloadableContent={article.downloadableContentBucket}
            />
          )}
          {article.faq && <Faq faq={article.faq} />}
          <CommentSection id={article.id} />
          {article.comments && <CommentList comments={article.comments} />}
          {!article.comments?.length && (
            <p className="text-secondary text-center text-sm font-bold pb-6">
              Be the first to comment !
            </p>
          )}
        </div>
        <footer className="text-sm font-bold leading-5">
          <div className="pt-8 flex justify-center">
            {article?.buttons?.length > 1 && (
              <ul className="flex flex-wrap gap-2">
                <li className="">
                  <BlogButton article={article} />
                </li>
                <li>
                  <CategoryButton article={article} />
                </li>
              </ul>
            )}
          </div>
        </footer>
      </div>
    </article>
  );
}
