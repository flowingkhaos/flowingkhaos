"use client";

import React from "react";

import { companyItems, testimonialItems } from "@/lib/assets/index";
import { InfiniteMovingCards } from "@/components/aceternity/InfiniteCards";
import Image from "next/image";

const Clients = () => {
  return (
    <section id="testimonials" className="py-20">
      <h1 className="text-center font-black text-[40px] md:text-5xl lg:text-6xl">
        Kind words from
        <span className="text-primary"> satisfied clients</span>
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10">
        <div
          // remove bg-white dark:bg-black dark:bg-grid-white/[0.05], h-[40rem] to 30rem , md:h-[30rem] are for the responsive design
          className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden"
        >
          <InfiniteMovingCards
            items={testimonialItems}
            direction="right"
            speed="slow"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10 animate-scroll">
          {companyItems.map((company) => (
            <React.Fragment key={company.id}>
              <div className="flex md:max-w-60 max-w-32 gap-2 ">
                <Image
                  src={company.img}
                  alt={company.name}
                  className="md:w-10 w-5"
                  width={50}
                  height={50}
                />
                <p className="text-lg md:text-2xl leading-8 font-bold tracking-tight text-content font-montserrat">
                  {company.name}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
