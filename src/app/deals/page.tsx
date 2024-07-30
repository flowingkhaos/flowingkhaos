import { GET_PAGE } from "@/lib/gql/queries/pages/home";
import React from "react";
import notFound from "@/app/not-found";
import Hero from "@/components/modules/Hero";
import Footer from "@/components/modules/FooterBlock";
import { dealItems, footerItems } from "@/lib/assets";
import { Suspense } from "react";
import DecryptLoader from "@/components/loaders/DecryptLoader";
import StatBar from "@/components/modules/Stat";
import { Metadata, ResolvingMetadata } from "next";
import Faq from "@/components/modules/Faq";
import DealBox from "@/components/modules/DealBox";

const slug = "deals";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await GET_PAGE(slug);
  //console.log(pageData);
  //console.log(pageData?.slug);
  if (!pageData) {
    return {};
  }

  const twitterCard = "summary_large_image";
  const twitterHandle = "@newmediaintelligence";
  const site = `https://newmediaintelligence.com/${slug}`;
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
      siteName: "newmediaintelligence",
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
    metadataBase: new URL(`https://newmediaintelligence.com/${slug}`),
  };
}

function generateSchemaMarkup(pageData: any, dealItems: any[]) {
  const deals = dealItems.map((deal) => ({
    "@type": "Offer",
    name: deal.title,
    description: deal.description,
    url: `https://newmediaintelligence.com/deals/${deal.slug}`,
    image: deal.img,
    offeredBy: {
      "@type": "Organization",
      name: "New Media Intelligence",
      url: "https://newmediaintelligence.com",
    },
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: pageData.seoOverride?.title || pageData.title,
          description:
            pageData.seoOverride?.description || pageData.description,
          url: `https://newmediaintelligence.com/${pageData.slug}`,
          image: pageData.seoOverride?.image?.url || pageData.image?.url,
          datePublished: pageData.createdAt,
          dateModified: pageData.updatedAt,
          publisher: {
            "@type": "Organization",
            name: "New Media Intelligence",
            logo: {
              "@type": "ImageObject",
              url: "https://newmediaintelligence.com/favicon.ico",
              width: 60,
              height: 60,
            },
          },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: deals.map((deal, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: deal,
            })),
          },
          specialty: "Online business Deals",
          keywords: dealItems.map((deal) => deal.title).join(", "),
        }),
      }}
    />
  );
}

export default async function Page() {
  //? Fetch data on the server-side (SSR)
  const pageData = await GET_PAGE(slug);
  //console.log(pageData);
  //console.log(pageData?.slug);

  if (!pageData) {
    return notFound();
  }

  return (
    <section className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <head>{generateSchemaMarkup(pageData, dealItems)}</head>
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
        <h1 className="pt-24 text-3xl leading-9 font-black tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          {pageData.description}
        </h1>
        <div className="flex flex-wrap gap-10 mb-10">
          <Suspense fallback={<DecryptLoader />}>
            {dealItems.map((deal) => (
              <DealBox
                key={deal.id}
                id={deal.id}
                slug={deal.slug}
                title={deal.title}
                description={deal.description}
                name={deal.name}
                link={deal.link}
                className={deal.className}
                titleClassName={deal.titleClassName}
                img={deal.img}
                spareImg={deal.spareImg}
              />
            ))}
          </Suspense>
        </div>
        <div className="py-4 lg:py-16">
          <Suspense fallback={<DecryptLoader />}>
            {pageData?.stat && <StatBar {...pageData.stat} />}
          </Suspense>
        </div>
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
