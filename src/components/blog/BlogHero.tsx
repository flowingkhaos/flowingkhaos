import React, { Suspense } from "react";
import { Spotlight } from "../aceternity/Spotlight";
import { TextGenerateEffect } from "../aceternity/TextGenerateEffect";
import DecryptLoader from "../loaders/DecryptLoader";
import { HeroProps } from "@/lib/gql/queries/pages/home";
import { FaLocationArrow } from "react-icons/fa6";
import { Button } from "../ui/button";
import Link from "next/link";
import { TypewriterHero } from "../modules/TypewriterBlock";
import { typewriterItems } from "@/lib/assets";

const BlogHero: React.FC<HeroProps> = async ({
  title,
  subtitle,
  description,
  buttons,
  image,
}) => {
  return (
    <>
      <div className="pb-20 pt-36">
        {/**
         *  UI: Spotlights
         *  Link: https://ui.aceternity.com/components/spotlight
         */}
        <div>
          <Spotlight
            className="max-md:-top-20 -top-40 -left-10 md:-left-32 md:-top-20 h-screen"
            fill="white"
          />
          <Spotlight
            className="max-md:w-15 max-md:w-[35vh] h-[80vh] w-[50vw] top-10"
            fill="teal"
          />
          <Spotlight
            className="max-md:left-40 max-md:w-[45vh] left-80 top-28 h-[80vh] w-[50vw]"
            fill="blue"
          />
        </div>

        <div
          className="h-screen w-full bg-background dark:bg-dot-white/[0.05] bg-dot-black/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
        >
          {/* Radial gradient for the container to give a faded look */}
          <div
            // chnage the bg to bg-black-100, so it matches the bg color and will blend in
            className="absolute pointer-events-none inset-0 flex items-center justify-center
         bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
          />
        </div>

        <div className="flex justify-center relative mb-20 lg:my-20 z-10">
          <div className="max-w-[80vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
            {typewriterItems.map((item, i) => (
              <TypewriterHero
                key={i}
                title={item.title}
                name={item.name}
                description={item.description}
                className={item.className}
                cursorClassName={item.titleClassName}
              />
            ))}
            <Suspense fallback={<DecryptLoader />}>
              <TextGenerateEffect
                words={
                  title ||
                  "Transforming Concepts into Seamless User Experiences"
                }
                className="text-center font-black text-[40px] md:text-5xl lg:text-6xl"
              />
            </Suspense>
            <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl font-montserrat">
              {description ||
                "Hey! I'm Luke, a Web Developer & entrepreneur based in Canada."}
            </p>

            <div className="md:flex flex-col md:flex-row w-2/3">
              {buttons?.map((button, idx) => (
                <div className="my-4 mx-4" key={idx}>
                  <Button type="button" size="xl">
                    <Link
                      href={`/${button.slug}`}
                      className="flex items-center"
                    >
                      {`${button.text}` || "Show my work"}
                      <FaLocationArrow className="ms-3 mx-1.5 text-accent" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogHero;
