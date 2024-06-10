import { GET_PAGE } from "@/lib/gql/queries/pages/home";
import React from "react";
import notFound from "@/app/not-found";
import Footer from "@/components/modules/Footer";
import Hero from "@/components/modules/Hero";
import DecryptLoader from "@/components/loaders/DecryptLoader";
import StatBar from "@/components/modules/Stat";
import { footerItems } from "@/lib/assets";
import Image from "next/image";
import { RichText } from "@graphcms/rich-text-react-renderer";
import {
  ImageProps,
  LinkProps,
  VideoProps,
  IFrameProps,
  RichTextContent,
} from "@graphcms/rich-text-types";
import { Suspense } from "react";
import { Metadata, ResolvingMetadata } from "next";

type Src = {
  src: ImageProps;
};

type Text = {
  text: RichTextContent;
};

type StaticImport = any;

type Params = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const pageData = await GET_PAGE(params.slug);
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

export default async function Page({ params }: Params) {
  //? Fetch data on the server-side (SSR)
  const pageData = await GET_PAGE(params.slug);
  //console.log(pageData);
  //console.log(pageData?.slug);

  if (typeof pageData === "undefined") {
    return <div>Error fetching page</div>; // Handle potential errors
  }
  if (!params.slug) {
    return <div>Error: Missing slug</div>;
  }
  if (!pageData) {
    return notFound();
  }

  return (
    <section className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Suspense fallback={<DecryptLoader />}>
          {pageData?.hero && (
            <Hero
              title={pageData.hero?.title}
              subtitle={pageData.hero?.subtitle}
              description={pageData.hero?.description}
              buttons={pageData.buttons}
              image={pageData.hero?.image}
            />
          )}
        </Suspense>
        <article className="prose md:prose-lg lg:prose-xl lg:py-48 mt-6 pb-8 lg:pb-0 lg:row-span-2">
          <Suspense fallback={<DecryptLoader />}>
            {pageData?.content?.json && (
              <RichText
                content={pageData.content.json}
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
                        alt={src}
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
          </Suspense>
        </article>
        <div className="py-4 lg:py-16">
          <Suspense fallback={<DecryptLoader />}>
            {pageData?.stat && <StatBar {...pageData.stat} />}
          </Suspense>
        </div>
        {/* <Suspense fallback={<DecryptLoader />}> {pageData.faq && <Faq faq={pageData.faq} />}
          {pageData.sections &&
            pageData.sections?.map((section, id) => {
              console.log(pageData.sections);
              return <Section key={id} {...section} />;
            })}
        </Suspense> */}
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
