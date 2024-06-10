import { FaLocationArrow } from "react-icons/fa6";

import { footerItems, socialItems } from "@/lib/assets";
import MagicButton from "../aceternity/MagicButton";
import Image from "next/image";
import { ThemeSelect } from "../themes/ThemeSelect";
import Link from "next/link";

// const fetchFooterData = async () => {
//   // Mocking a fetch call
//   return {
//     title: "Ready to take your presence to the next level?",
//   };
// };

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
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <Image
          src="/svg/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 "
          width={100}
          height={100}
        />
      </div> */}
      {footerItems.length > 0 && (
        <div className="flex flex-col items-center" key={id}>
          <div className="flex flex-wrap justify-center">
            {wordsArray.map((word, idx) => (
              <h1
                key={word + idx}
                className={`${
                  idx > 6
                    ? "text-center font-black text-[40px] md:text-5xl lg:text-6xl text-primary"
                    : "text-center font-black text-[40px] md:text-5xl lg:text-6xl text-content"
                }`}
              >
                {word}&nbsp;
              </h1>
            ))}
          </div>
          <p className="uppercase text-center md:tracking-widest mb-4 text-sm md:text-lg lg:text-xl pt-6">
            {description}
          </p>
          <a href="mailto:wil.s@mtlonweb.com">
            <MagicButton
              title="Let's get in touch"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      )}
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="uppercase text-center md:tracking-widest mb-4 text-sm pt-6">
          {name}
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          <ThemeSelect />
          {socialItems.map((info) => (
            <div
              key={info.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded border border-primary shadow-lg bg-primary hover:bg-card"
            >
              <Link href={info.link}>
                <Image src={info.img} alt={info.name} width={20} height={20} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
