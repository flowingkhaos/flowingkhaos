import React, { Suspense } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { Spotlight } from "../aceternity/Spotlight";
import { TextGenerateEffect } from "../aceternity/TextGenerateEffect";
import DecryptLoader from "../loaders/DecryptLoader";
import { HeroProps } from "@/lib/gql/queries/pages/home";
import { Button } from "../ui/button";
import Link from "next/link";
import { typewriterItems } from "@/lib/assets";
import { TypewriterHero } from "./TypewriterBlock";

const Hero: React.FC<HeroProps> = async ({
  title,
  subtitle,
  description,
  buttons,
  image,
}) => {
  //console.log(buttons);
  return (
    <>
      <div className="pb-20 pt-36">
        <div
          className="w-full bg-background 
       absolute top-0 left-0 flex items-center justify-center"
        >
          <div
            className="absolute pointer-events-none inset-0 flex items-center justify-center
         bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
          />
        </div>

        <div className="flex justify-center relative my-20 z-10">
          <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
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

            <div className="md:flex grid justify-center md:flex-row w-2/3">
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

export default Hero;
