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
    <Button className="my-2" type="button" variant="default">
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
    <Button className="my-2" type="button" variant="default">
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
  const twitterHandle = "@flowingkhaos";
  const site = `https://flowingkhaos.com/blog/articles/${slug}`;
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
      siteName: "Flowingkhaos",
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
        "en-US": site,
      },
    },
    metadataBase: new URL(`https://flowingkhaos.com/blog/articles/${slug}`),
  };
}

function generateSchemaMarkup(article: Post) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.seoOverride?.title || article.title,
          description: article.seoOverride?.description || article.excerpt,
          image: [
            `${article.seoOverride?.image?.url}` || `${article.image?.url}`,
          ],
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
          author: {
            "@type": "Person",
            name: article.author?.name,
            url: `https://flowingkhaos.com/authors/${article.author?.slug}`,
          },
          publisher: {
            "@type": "Organization",
            name: "Flowingkhaos",
            logo: {
              "@type": "ImageObject",
              url: "https://flowingkhaos.com/favicon.ico",
              width: 600,
              height: 60,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://flowingkhaos.com/blog/${article.slug}`,
          },
        }),
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
                  priority={true}
                />
              </div>
            )}

            <h1 className="text-3xl leading-9 font-black tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
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
        <div className="prose lg:pb-0 lg:row-span-2 py-8">
          {article.content.json && (
            <RichText
              content={article.content.json}
              renderers={{
                h1: ({ children }) => (
                  <h1 className="text-primary leading-9 tracking-tight font-montserrat font-black text-[40px] md:text-3xl lg:text-5xl">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-secondary leading-7 text-[30px] font-bold font-montserrat">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-accent leading-5  text-[20px] font-semibold font-montserrat">
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
                    className="text-primary hover:text-accent font-montserrat"
                  >
                    {children}
                  </a>
                ),
                p: ({ children }) => (
                  <p className="mb-3 leading-7 flex-grow text-content text-lg font-montserrat">
                    {children}
                  </p>
                ),
                li: ({ children }) => (
                  <li className="hover:text-primary font-semibold hover:font-extrabold">
                    {children}
                  </li>
                ),
                code_block: ({ children }) => (
                  <pre className="bg-accent-foreground text-btn">
                    {children}
                  </pre>
                ),
                code: ({ children }) => (
                  <code className="text-accent">{children}</code>
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
          <CommentSection slug={article.slug} />
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
