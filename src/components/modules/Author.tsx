// Import dependencies if necessary
import Image from "next/image";
import React from "react";

export interface AuthorProps {
  biography: string;
  id: string;
  name: string;
  role: string;
  slug: string;
  articles: { id: string }[];
  image: { url: string; width: number; height: number };
}

const Author: React.FC<{ author: AuthorProps }> = ({ author }) => {
  const getArticleCount = () => {
    return author.articles.length.toString();
  };
  return (
    <section className="mt-48">
      <ul className="flex justify-center items-center my-6">
        <li key={author.id} className="flex space-x-2">
          <Image
            className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
            src={author.image.url}
            width={author.image.width}
            height={author.image.height}
            alt={author.name}
          />
          <dl className="flex-1 text-sm leading-5">
            <dt className="sr-only">Name</dt>
            <dd className="text-primary leading-5 text-[40px] font-semibold font-montserrat my-6 max-md:leading-9">
              {author.name}
            </dd>
            {author.role && (
              <>
                <dt className="sr-only">Role</dt>
                <dd className="text-secondary font-bold font-montserrat">
                  {author.role}
                </dd>
              </>
            )}
          </dl>
        </li>
      </ul>
      <div className="">
        <p className="text-content font-montserrat">{author.biography}</p>
        <div className="my-8">
          <h1 className="text-primary font-bold font-montserrat">
            I wrote over {getArticleCount()}+ Articles
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Author;
