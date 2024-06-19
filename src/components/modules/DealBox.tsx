import { ArrowUpCircleIcon, WebhookIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import ClipPath from "./ClipPath";

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
      className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
      key={id}
    >
      <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
        <h5 className="h5 mb-5">{title}</h5>
        <p className="body-2 mb-6 text-n-3">{description}</p>
        <div className="flex items-center mt-auto">
          <Image src={img} width={48} height={48} alt={title} />
          <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider">
            Explore more
          </p>
          <ArrowUpCircleIcon />
        </div>
      </div>

      <div
        className="absolute inset-0.5 bg-n-8"
        style={{ clipPath: "url(#benefits)" }}
      >
        <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
          {spareImg && (
            <Image
              src={spareImg}
              width={380}
              height={362}
              alt={spareImg}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      <ClipPath />
    </article>
  );
}
