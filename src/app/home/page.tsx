import { GET_PAGE } from "@/lib/gql/queries/pages/home";
import React from "react";
import notFound from "@/app/not-found";
import Hero from "@/components/modules/Hero";
import Footer from "@/components/modules/Footer";
import Grid from "@/components/modules/Grid";
import RecentProjects from "@/components/modules/RecentProjects";
import Clients from "@/components/modules/Clients";
import Experience from "@/components/modules/Experience";
import Approach from "@/components/modules/Approach";
import { FloatingNav } from "@/components/aceternity/FloatingNavbar";
import { footerItems, navItems } from "@/lib/assets";
import { Suspense } from "react";
import DecryptLoader from "@/components/loaders/DecryptLoader";
import StatBar from "@/components/modules/Stat";
import { Metadata, ResolvingMetadata } from "next";

const slug = "home";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await GET_PAGE(slug);
  //console.log(pageData);
  //console.log(pageData?.slug);
  if (!pageData) {
    return {};
  }

  const twitterCard = "summary_large_image";
  const twitterHandle = "@flowingkhaos";
  const site = "https://flowingkhaos.com";
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
      className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5"
    >
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
        <RecentProjects />
        <Clients />
        <Experience />
        <Approach />
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
