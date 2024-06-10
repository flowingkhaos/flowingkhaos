"use client";
import { Comment } from "@/lib/gql/queries/blog/posts";
import React, { ReactNode } from "react";
import { Button } from "@/components/aceternity/MovingBorders";

interface CommentListProps {
  comments: Comment[];
}

export async function getRelativeTime(time: string | number | Date) {
  const now = new Date();
  const then = new Date(time);
  // Get the difference in milliseconds
  const diffInMs = now.getTime() - then.getTime();

  // Now you can perform calculations using diffInMs which is a number
  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}

function CommentList({ comments }: CommentListProps) {
  console.log("comments for the comment section: ", comments);
  return (
    <section className="flex flex-col p-2 text-content space-y-10 py-10">
      {comments.map(
        async (comment: {
          id: any;
          username:
            | string
            | number
            | bigint
            | boolean
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | Promise<React.AwaitedReactNode>
            | null
            | undefined;
          comment:
            | string
            | number
            | bigint
            | boolean
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | Promise<React.AwaitedReactNode>
            | null
            | undefined;
          createdAt: string;
          email: string;
        }) => (
          <Button
            key={comment.id}
            //   random duration will be fun , I think , may be not
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              //   add these two
              //   you can generate the color from here https://cssgradient.io/
              // add this border radius to make it more rounded so that the moving border is more realistic
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            // remove bg-white dark:bg-slate-900
            className="flex-1 border-primary dark:border-primary inviz"
          >
            <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
              <div className="text-start lg:ms-5">
                <h1 className=" text-2xl font-black font-montserrat text-content">
                  {comment.username}
                </h1>
                <p className="mt-3 text-content font-montserrat">
                  {comment.comment}
                </p>
                <time
                  dateTime={comment.createdAt}
                  className="text-accent text-xs p-4 lg:p-0 font-montserrat"
                >
                  {await getRelativeTime(comment.createdAt)}: <br />
                  {comment.email}
                </time>
              </div>
            </div>
          </Button>
        )
      )}

      {/* {comments.map(async (comment) => (
        <div key={comment.id} className="lg:p-4 m-4">
          <div className="w-full">
            {!comment.username ? (
              <h1 className="flex px-4 text-lg font-extrabold">- Anon:</h1>
            ) : (
              <p className="flex px-4 text-lg font-extrabold">
                - {comment.username}:
              </p>
            )}
            <div className="text-left">
              <p className="">{comment.comment}</p>
            </div>
            <div className=" max-md:ml-56 lg:ml-80">
              <time
                dateTime={comment.createdAt}
                className="text-accent text-xs font-bold p-4 lg:p-0"
              >
                {await getRelativeTime(comment.createdAt)}: <br />
                {comment.email}
              </time>
            </div>
          </div>
        </div>
      ))} */}
    </section>
  );
}

export default CommentList;
