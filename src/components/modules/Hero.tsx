import React, { Suspense } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "../aceternity/MagicButton";
import { Spotlight } from "../aceternity/Spotlight";
import { TextGenerateEffect } from "../aceternity/TextGenerateEffect";
import DecryptLoader from "../loaders/DecryptLoader";
import { HeroProps } from "@/lib/gql/queries/pages/home";

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
        {/**
         *  UI: Spotlights
         *  Link: https://ui.aceternity.com/components/spotlight
         */}
        <div>
          <Spotlight
            className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
            fill="white"
          />
          <Spotlight
            className="h-[80vh] w-[50vw] top-10 left-full"
            fill="purple"
          />
          <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
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

        <div className="flex justify-center relative my-20 z-10">
          <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
            <p className="uppercase tracking-widest text-xs text-center max-w-80 leading-5">
              {subtitle ||
                "Navigate the khaos that is the web, solve more problems."}
            </p>
            {/**
             *  Link: https://ui.aceternity.com/components/text-generate-effect
             *
             *  change md:text-6xl, add more responsive code
             */}
            <Suspense fallback={<DecryptLoader />}>
              <TextGenerateEffect
                words={
                  title ||
                  "Transforming Concepts into Seamless User Experiences"
                }
                className="text-center font-black text-[40px] md:text-5xl lg:text-6xl"
              />
            </Suspense>
            <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
              {description ||
                "Hey! I'm Wilson, a Web Developer & entrepreneur based in Canada."}
            </p>

            <div className="md:flex flex-col md:flex-row w-2/3">
              {buttons?.map((button, idx) => (
                <div className="my-4" key={idx}>
                  <a href={`${button.slug}`} className="md:px-4 block">
                    <MagicButton
                      title={`${button.text}` || "Show my work"}
                      icon={<FaLocationArrow />}
                      position="right"
                    />
                  </a>
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
