"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  SearchArticles,
  SearchTerm,
} from "@/lib/gql/queries/search/dynamicSearch";
import { IoSearchCircleOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SearchTool() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchTerm[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true; // This flag denotes if the component is mounted
    if (searchValue) {
      SearchArticles(searchValue, 25, null).then((data) => {
        // Note: You may need to adjust the parameters
        if (isMounted) {
          setSearchResults(data.articles); // Access the posts array from the data object
        }
      });
    } else {
      setSearchResults([]);
    }
    return () => {
      isMounted = false;
    }; // Cleanup function to avoid state update if the component is unmounted
  }, [searchValue]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="accent" size="lg">
          <p className="max-md:hidden">Quick Seach</p>
          <IoSearchCircleOutline className="h-6 w-6 lg:h-6 lg:w-6 ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader className="my-4">
          <DialogTitle className="mb-4 text-xl leading-14 font-extrabold text-secondary tracking-tight sm:text-xl sm:leading-14 md:text-2xl md:leading-14">
            Look for articles here.
          </DialogTitle>
          <DialogDescription className="text-sm lg:text-md prose max-w-none text-btn font-montserrat">
            Type any topic or article name.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center space-x-2 my-4">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <Input
                id="search"
                placeholder="how to make money online..."
                value={searchValue}
                onChange={handleSearchChange}
                autoFocus
                className="rounded"
              />
            </div>

            <Button
              type="submit"
              className="px-3 border border-secondary hover:text-btn"
            >
              <IoSearchCircleOutline className="h-10 w-10" />
            </Button>
          </div>
        </form>
        <ul className="divide-y divide-secondary">
          {searchResults.map((article, id) => (
            <li key={id} className="py-7">
              <article className="flex items-center space-x-5">
                <div className="flex-grow space-y-5">
                  <h1 className="text-xl leading-8 font-bold tracking-tight text-primary">
                    <DialogClose asChild>
                      <Link
                        className="hover:underline "
                        href={`/blog/articles/${article.slug}`}
                        onClick={handleDialogClose}
                      >
                        {article.title}
                      </Link>
                    </DialogClose>
                  </h1>
                  {article.excerpt && <p>{article.excerpt}</p>}
                </div>
              </article>
            </li>
          ))}
        </ul>

        <DialogClose asChild>
          <Button type="button" className="w-full" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
