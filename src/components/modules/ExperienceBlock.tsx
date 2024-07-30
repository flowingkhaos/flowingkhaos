import React from "react";

import { experienceItems } from "@/lib/assets/index";
import { Button } from "@/components/aceternity/MovingBorders";
import Image from "next/image";

type StaticImport = any;

const Experience = () => {
  return (
    <div id="experience" className="py-20 w-full">
      <h1 className="text-center font-black text-[40px] md:text-5xl lg:text-6xl">
        My experience in the
        <span className="text-primary"> industry</span>
      </h1>

      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {experienceItems.map(
          (card: {
            id: any;
            thumbnail: string | StaticImport;
            title:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<React.AwaitedReactNode>
              | null
              | undefined;
            desc:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<React.AwaitedReactNode>
              | null
              | undefined;
          }) => (
            <Button
              key={card.id}
              //   random duration will be fun , I think , may be not
              duration={Math.floor(Math.random() * 10000) + 10000}
              borderRadius="1.75rem"
              style={{
                //   add these two
                //   you can generate the color from here https://cssgradient.io/
                // add this border radius to make it more rounded so that the moving border is more realistic
                borderRadius: `calc(1.75rem* 0.96)`,
              }}
              // remove bg-white dark:bg-slate-900
              className="flex-1 text-content border-neutral-200 dark:border-slate-800 inviz shadow-xl"
            >
              <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-7 gap-2">
                <Image
                  src={card.thumbnail}
                  alt={card.thumbnail}
                  width={150}
                  height={150}
                  className="lg:w-52 md:w-20 w-24"
                  blurDataURL={card.thumbnail}
                  placeholder="blur"
                />
                <div className="lg:ms-5">
                  <h1 className="text-start text-xl md:text-2xl font-bold">
                    {card.title}
                  </h1>
                  <p className="text-start text-white-100 mt-3 font-montserrat">
                    {card.desc}
                  </p>
                </div>
              </div>
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default Experience;
