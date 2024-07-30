import { FaLocationArrow } from "react-icons/fa6";

import { projectItems } from "@/lib/assets/index";
import { PinContainer } from "@/components/aceternity/Pin";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const RecentProjects = () => {
  return (
    <div id="projects" className="mt-10">
      <h1 className="text-center font-black text-[40px] md:text-5xl lg:text-6xl">
        Discover what I have
        <span className="text-primary"> Built</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10">
        {projectItems.map((item) => (
          <div
            className="lg:min-h-[42rem] h-[32rem] flex items-center justify-center sm:w-[520px] w-[80vw]"
            key={item.id}
          >
            <PinContainer title="visit" href={`${item.link}`}>
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
                    blurDataURL="/svg/bg.png"
                    placeholder="blur"
                  />
                </div>
                <Image
                  src={item.img}
                  alt="cover"
                  width={475}
                  height={475}
                  className="z-10 absolute bottom-0 rounded-t-xl"
                  blurDataURL={item.img}
                  placeholder="blur"
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
                        blurDataURL={icon}
                        placeholder="blur"
                      />
                    </div>
                  ))}
                </div>

                <Button variant="secondary">
                  <Link href={`${item.link}`} className="">
                    Visit now
                  </Link>
                  <FaLocationArrow className="ms-3 text-accent" />
                </Button>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
