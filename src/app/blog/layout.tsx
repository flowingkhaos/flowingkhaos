import React from "react";
import CategoryNav from "@/components/blog/CategoryNav";
import Footer from "@/components/modules/Footer";
import BlogNewsletter from "@/components/blog/BlogNewsletter";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import { footerItems } from "@/lib/assets";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className="flex flex-wrap">
      <div className="w-full lg:w-2/3">
        <div>{children}</div>
      </div>
      <div className="w-full md:w-full lg:w-1/3">
        <aside className="flex flex-col justify-center space-y-6 px-10 md:px-4">
          <CategoryNav />
          <BlogNewsletter />
          <FeaturedPosts />
        </aside>
      </div>
      <footer className="max-w-5xl w-full mx-auto">
        <Footer
          id={footerItems[0].id}
          title={footerItems[0].title}
          description={footerItems[0].description}
          name={footerItems[0].name}
        />
      </footer>
    </main>
  );
}
