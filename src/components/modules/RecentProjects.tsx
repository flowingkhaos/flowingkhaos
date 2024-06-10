import { FaLocationArrow } from "react-icons/fa6";

import { projectItems } from "@/lib/assets/index";
import { PinContainer } from "@/components/aceternity/Pin";
import Image from "next/image";
import Link from "next/link";

const RecentProjects = () => {
  return (
    <div id="projects" className="py-20">
      <h1 className="text-center font-black text-[40px] md:text-5xl lg:text-6xl">
        A small selection of
        <span className="text-primary"> recent projects</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10">
        {projectItems.map((item) => (
          <div
            className="lg:min-h-[42rem] h-[32rem] flex items-center justify-center sm:w-[520px] w-[80vw]"
            key={item.id}
          >
            <PinContainer title="visit" href="https://twitter.com/mannupaaji">
              <div className="relative flex items-center justify-center sm:w-[520px] w-[80vw] overflow-hidden h-[20vh] lg:h-[41vh] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#020024" }}
                >
                  <Image
                    src="/svg/bg.png"
                    alt="bgimg"
                    width={500}
                    height={500}
                  />
                </div>
                <Image
                  src={item.img}
                  alt="cover"
                  width={450}
                  height={450}
                  className="z-10 absolute bottom-0"
                />
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1 text-content">
                {item.title}
              </h1>

              <p
                className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2 text-primary"
                style={{
                  margin: "1vh 0",
                }}
              >
                {item.des}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {item.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <Image
                        src={icon}
                        alt="icon5"
                        className="p-2"
                        width={450}
                        height={450}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center hover:bg-accent rounded p-1">
                  <Link
                    href={`https://${item.link}`}
                    className="flex lg:text-xl md:text-xs text-sm text-content animate-pulse"
                  >
                    Check Live Site
                  </Link>
                  <FaLocationArrow className="ms-3" color="#CBACF9" />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
