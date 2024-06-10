import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GET_FEATURED_POSTS, Post } from "@/lib/gql/queries/blog/posts";
import { isOlderThanAdayAgo } from "@/lib/actions/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";

function BlogButton({ article }: { article: Post }) {
  return (
    <Button
      className="md:block hidden"
      size="sm"
      type="button"
      variant="default"
    >
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

export default async function FeaturedPosts() {
  const featuredPosts = await GET_FEATURED_POSTS();
  //console.log("Featured Posts:", featuredPosts);

  return (
    <section className="">
      <h1 className="text-xl leading-9 font-montserrat font-black text-center tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 my-4">
        Most popular!
      </h1>
      <div className="flex justify-center my-8">
        <Carousel className="w-[280px] lg:w-[500px]">
          <CarouselContent className="h-[200px] lg:h-[357px]">
            {featuredPosts?.articles.map(async (article, index) => (
              <CarouselItem key={index} className="pt-1">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex items-center justify-center p-6">
                      <div
                        id={article.id}
                        key={article.id}
                        className="relative w-full md:w-full mx-auto border border-primary"
                      >
                        {article?.image && (
                          <Image
                            src={article.image.url}
                            alt={article.title}
                            width={1024}
                            height={720}
                            className="w-full"
                            priority={true}
                          />
                        )}
                        <div className="absolute -bottom-[17px] lg:bottom-1 lg:left-5 font-montserrat">
                          <h1 className="text-btn my-2 font-bold leading-7 text-xs lg:text-xl inviz p-1 rounded uppercase">
                            {article.title}
                          </h1>
                          {article.buttons.length > 0 && (
                            <BlogButton article={article} />
                          )}
                          <span className="text-btn flex flex-wrap my-2 text-xs p-2">
                            Featured article {index + 1}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
