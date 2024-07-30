import { ArrowUpCircleIcon, WebhookIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { BiPurchaseTagAlt } from "react-icons/bi";

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
        <h1 className="h5 mb-5 font-black text-content hover:text-success text-center z-50 uppercase">
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
            blurDataURL={img}
            placeholder="blur"
          />
          <Button className="flex ml-24 items-center hover:text-success">
            <Link
              href={`${link}`}
              className="ml-auto font-code text-xs font-bold uppercase tracking-wider"
            >
              Get Now !
            </Link>
            <BiPurchaseTagAlt className="ml-2 w-6 h-6" />
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
            blurDataURL={spareImg}
            placeholder="blur"
          />
        </div>
      </div>
    </article>
  );
}
