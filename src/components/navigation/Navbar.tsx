import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DecryptLoader from "../loaders/DecryptLoader";
import SingleNav from "@/components/navigation/Navlist";
import { Suspense } from "react";
import { SearchTool } from "../modules/SearchTool";

export default async function Navbar() {
  return (
    <>
      <nav className="flex flex-wrap items-center justify-between mx-auto p-6 fixed z-[98] w-full inviz shadow-xl">
        <Link
          href="/home"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="/favicon.ico"
            width={33}
            height={33}
            className="h-8"
            alt="FlowingKhaos Logo"
          />
          <span className="self-center text-2xl font-black whitespace-nowrap hover:text-accent">
            Flowing Khaos
          </span>
        </Link>
        <div className="flex items-center ml-auto space-x-4">
          <div className="md:flex">
            <SearchTool />
          </div>

          <Sheet>
            <SheetTrigger>
              <span className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm border border-secondary rounded md:hidden">
                <Menu className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Menu className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </span>
            </SheetTrigger>
            <SheetContent className="z-[99]">
              <SheetHeader>
                <SheetTitle className="text-xl leading-9 font-black text-center text-btn tracking-tight my-4 uppercase hover:text-primary">
                  Menu
                </SheetTitle>
                <SheetDescription>
                  <ul className="font-medium flex flex-col p-4 mt-4 text-btn tracking-tight text-lg leading-7">
                    <li className="">
                      <Button className="my-2 w-2/3" variant="default">
                        <Suspense fallback={<DecryptLoader />}>
                          <SingleNav navId="main" />
                        </Suspense>
                      </Button>
                    </li>

                    <li className="">
                      <Button className="my-2 w-2/3" variant="default">
                        <Suspense fallback={<DecryptLoader />}>
                          <SingleNav navId="blog" />
                        </Suspense>
                      </Button>
                    </li>

                    <li className="">
                      <Button className="my-2 w-2/3" variant="default">
                        <Suspense fallback={<DecryptLoader />}>
                          <SingleNav navId="about" />
                        </Suspense>
                      </Button>
                    </li>

                    <li className="">
                      <Button className="my-2 w-2/3" variant="default">
                        <Suspense fallback={<DecryptLoader />}>
                          <SingleNav navId="terms" />
                        </Suspense>
                      </Button>
                    </li>

                    <li className="hover:text-accent font-semibold">
                      <Button className="my-2 w-2/3" variant="default">
                        <Suspense fallback={<DecryptLoader />}>
                          <Link href="/search">Search</Link>
                        </Suspense>
                      </Button>
                    </li>
                  </ul>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li className="hover:text-accent font-semibold">
              <Suspense fallback={<DecryptLoader />}>
                <SingleNav navId="main" />
              </Suspense>
            </li>
            <li className="hover:text-accent font-semibold">
              <Suspense fallback={<DecryptLoader />}>
                <SingleNav navId="blog" />
              </Suspense>
            </li>
            <li className="hover:text-accent font-semibold">
              <Suspense fallback={<DecryptLoader />}>
                <SingleNav navId="about" />
              </Suspense>
            </li>
            <li className="hover:text-accent font-semibold">
              <Suspense fallback={<DecryptLoader />}>
                <SingleNav navId="terms" />
              </Suspense>
            </li>
            <li className="hover:text-accent font-semibold">
              <Suspense fallback={<DecryptLoader />}>
                <SingleNav navId="deals" />
              </Suspense>
            </li>
            <li className="hover:text-accent font-semibold">
              <Suspense fallback={<DecryptLoader />}>
                <Link href="/search">Search</Link>
              </Suspense>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
