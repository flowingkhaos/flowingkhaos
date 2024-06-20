import { ArrowUpCircleIcon, WebhookIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

interface DealBoxProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  name: string;
  link: string;
  className: string;
  titleClassName: string;
  img: string;
  spareImg: string;
}

export default async function DealBox({
  id,
  slug,
  title,
  description,
  name,
  link,
  className,
  titleClassName,
  img,
  spareImg,
}: DealBoxProps) {
  return (
    <article
      className="mt-10 block relative p-0.5 bg-no-repeat bg-[length:100%_100%] border border-primary rounded shadow-xl inviz md:max-w-[24rem]"
      key={id}
    >
      <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem]">
        <h1 className="h5 mb-5 font-black text-secondary text-center z-50 uppercase">
          {title}
        </h1>
        <p className="mb-6 text-sm leading-6 text-content font-montserrat">
          {description}
        </p>
        <div className="flex items-center mt-auto z-10">
          <Image
            src={img}
            width={48}
            height={48}
            alt={title}
            className="rounded-full"
          />
          <Button className="flex ml-24 items-center hover:text-secondary">
            <Link
              href={`${link}`}
              className="ml-auto font-code text-xs font-bold uppercase tracking-wider font-montserrat"
            >
              Get Now !
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
              />
            </svg>
          </Button>
        </div>
      </div>

      <div className="absolute inset-0.5">
        <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
          <Image
            src={spareImg}
            width={380}
            height={362}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </article>
  );
}
