import { FaLocationArrow } from "react-icons/fa6";

import { footerItems, socialItems } from "@/lib/assets";
import Image from "next/image";
import { ThemeSelect } from "../themes/ThemeSelect";
import Link from "next/link";
import { Button } from "../ui/button";

export default async function Footer({
  id,
  title,
  description,
  name,
}: {
  id: string;
  title: string;
  description: string;
  name: string;
}) {
  if (!id || !title || !description || !name) {
    return null;
  }
  const wordsArray = title.split(" ");
  //console.log(footerItems);
  return (
    <footer
      className="w-full pt-20 pb-10 border-t border-content/20 max-md:border-none max-md:rounded-xl max-md:bg-neutral max-md:my-4 max-md:px-4 max-md:shadow-xl max-md:text-btn"
      id="contact"
    >
      {footerItems.length > 0 && (
        <div className="flex flex-col items-center" key={id}>
          <div className="flex flex-wrap justify-center">
            {wordsArray.map((word, idx) => (
              <h1
                key={word + idx}
                className={`${
                  idx > 6
                    ? "text-center font-black text-[40px] md:text-5xl lg:text-6xl text-primary max-md:text-primary"
                    : "text-center font-black text-[40px] md:text-5xl lg:text-6xl text-content max-md:text-btn"
                }`}
              >
                {word}&nbsp;
              </h1>
            ))}
          </div>
          <p className="uppercase text-center md:tracking-widest mb-4 text-sm md:text-lg lg:text-xl pt-6">
            {description}
          </p>
          <Button type="button" size="xl">
            <Link
              href="mailto:sales@newmediaintelligence.com"
              className="flex items-center"
            >
              <span>Contact me!</span>
              <FaLocationArrow className="ms-3 mx-1.5 text-accent" />
            </Link>
          </Button>
        </div>
      )}
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="uppercase text-center md:tracking-widest mb-4 text-sm pt-6">
          {name}
        </p>
        <div className="flex-col">
          <Link href="/about" className="hover:underline hover:text-accent">
            <p className="uppercase text-center md:tracking-widest mb-4 text-sm pt-6">
              About Page
            </p>
          </Link>
          <Link
            href="/privacy-policies-and-terms-of-use"
            className="hover:underline hover:text-accent"
          >
            <p className="uppercase text-center md:tracking-widest mb-4 text-sm pt-6">
              Terms of Use, Privacy and Compliance
            </p>
          </Link>
        </div>
        <div className="flex items-center md:gap-3 gap-6">
          <ThemeSelect />
          {socialItems.map((info) => (
            <Button key={info.id} variant="secondary">
              <Link href={info.link}>
                <Image src={info.img} alt={info.name} width={20} height={20} />
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
