import { GET_PAGE } from "@/lib/gql/queries/pages/home";
import React from "react";
import notFound from "@/app/not-found";
import Hero from "@/components/modules/Hero";
import RecentProjects from "@/components/modules/RecentProjects";
import Clients from "@/components/modules/Clients";
import { FloatingNav } from "@/components/aceternity/FloatingNavbar";
import { footerItems, globeItems, navItems } from "@/lib/assets";
import { Suspense } from "react";
import DecryptLoader from "@/components/loaders/DecryptLoader";
import StatBar from "@/components/modules/Stat";
import { Metadata, ResolvingMetadata } from "next";
import { Globe } from "@/components/modules/GlobeBlock";
import Footer from "@/components/modules/FooterBlock";
import Experience from "@/components/modules/ExperienceBlock";
import { Grid } from "@/components/modules/GridBlock";

const slug = "home";

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

function generateSchemaMarkup(pageData: any) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: pageData.seoOverride?.title || pageData.title,
          description:
            pageData.seoOverride?.description || pageData.description,
          url: `https://newmediaintelligence.com/${pageData.slug}`,
          image:
            `${pageData.seoOverride?.image?.url}` || `${pageData.image?.url}`,
          author: {
            "@type": "Person",
            name: "Luke Sidney",
            url: "https://flowingkhaos.com/authors/luke-sidney",
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
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://newmediaintelligence.com/${pageData.slug}`,
          },
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
    <section
      id="home"
      className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5"
    >
      <head>{generateSchemaMarkup(pageData)}</head>
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
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
        <Grid />
        {/* <Suspense fallback={<DecryptLoader />}>
          {globeItems.map((item, i) => (
            <Globe
              key={i}
              id={item.id}
              title={item.title}
              name={item.name}
              description={item.description}
              className={item.className}
            />
          ))}
        </Suspense> */}
        <Experience />
        <RecentProjects />
        <Clients />
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
