import { Perk } from "@/lib/gql/queries/blocks";
import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";
import Image from "next/image";
import { Fragment } from "react";

interface PerkBlockProps {
  perks: Perk[];
}

export function PerkBlock({ perks }: PerkBlockProps) {
  return (
    <Fragment>
      <h1 className="text-center font-black text-[40px] md:text-5xl lg:text-6xl">
        What you get
        <span className="text-primary"> Working with Me:</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
        {perks.map((perk, index) => (
          <Feature key={perk.title} {...perk} index={index} />
        ))}
      </div>
    </Fragment>
  );
}

const Feature = ({
  title,
  description,
  img,
  index,
  className,
  imgClassName,
  titleClassName,
}: Perk & { index: number }) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800",
        className
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="flex justify-center mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        <Image
          src={img}
          alt={title}
          className={cn("w-24 h-24", imgClassName)}
          width={45}
          height={45}
        />
      </div>
      <div
        className={cn(
          "text-lg font-bold mb-2 relative z-10 px-10",
          titleClassName
        )}
      >
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-indigo-700 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100 font-black">
          {title}
        </span>
      </div>
      <p className="text-sm font-montserrat text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
