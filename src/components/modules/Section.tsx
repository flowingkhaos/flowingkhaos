import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RichText } from "@graphcms/rich-text-react-renderer";
import {
  ImageProps,
  LinkProps,
  VideoProps,
  IFrameProps,
  RichTextContent,
} from "@graphcms/rich-text-types";
import { Suspense } from "react";
import DecryptLoader from "@/components/loaders/DecryptLoader";
import { Button } from "@/components/ui/button";
import { SectionProps } from "@/lib/gql/queries/pages/home";

type Src = {
  src: ImageProps;
};
type Text = {
  text: RichTextContent;
};

type StaticImport = any;

const Section: React.FC<SectionProps> = async ({ ...section }) => {
  const imageUrl = section.image?.url;

  return (
    <div className="py-6">
      <h2 className="text-3xl font-extrabold mb-4 text-primary tracking-tight leading-9 md:text-4xl md:leading-9">
        {section?.title}
      </h2>
      <p className="text-lg font-extrabold mb-6 leading-7 text-accent">
        {section?.subtitle}
      </p>
      <div className="flex flex-col w-full lg:flex-row">
        <div className="flex-grow p-4 md:w-2/3">
          <div className="prose lg:pb-0 lg:row-span-2">
            <Suspense fallback={<DecryptLoader />}>
              {section.content.json && (
                <RichText
                  content={section.content.json}
                  renderers={{
                    h1: ({ children }) => (
                      <h1 className="text-primary leading-9 tracking-tight font-montserrat font-black text-[40px] md:text-3xl lg:text-5xl">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-secondary leading-7 text-[30px] font-bold font-montserrat">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-accent leading-5  text-[20px] font-semibold font-montserrat">
                        {children}
                      </h3>
                    ),
                    img: (src: string | StaticImport) => (
                      <div className="">
                        <Image
                          src={src}
                          alt={section.title}
                          width={500}
                          height={500}
                          className="mx-auto w-full h-auto shadow-lg"
                        />
                      </div>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-primary hover:text-accent font-montserrat"
                      >
                        {children}
                      </a>
                    ),
                    p: ({ children }) => (
                      <p className="mb-3 leading-7 flex-grow text-content text-lg font-montserrat">
                        {children}
                      </p>
                    ),
                    li: ({ children }) => (
                      <li className="hover:text-primary font-semibold hover:font-extrabold">
                        {children}
                      </li>
                    ),
                    code_block: ({ children }) => (
                      <pre className="bg-accent-foreground text-btn">
                        {children}
                      </pre>
                    ),
                    code: ({ children }) => (
                      <code className="text-accent">{children}</code>
                    ),
                  }}
                />
              )}
            </Suspense>
          </div>
          {imageUrl ? (
            <div className="flex-grow p-4 md:w-1/3 flex items-center justify-center">
              <Image
                src={imageUrl}
                alt={section?.title}
                width={500}
                height={500}
                unoptimized={true}
                className="rounded shadow-xl"
              />
            </div>
          ) : (
            <div>No Image URL found for this section.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Section;
