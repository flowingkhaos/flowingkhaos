"use client";
import { Comment } from "@/lib/gql/queries/blog/posts";
import React, { Fragment, ReactNode } from "react";
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
  //console.log("comments for the comment section: ", comments);
  return (
    <section className="flex flex-col p-2 text-content space-y-4 py-4">
      {comments.map(async (comment) => (
        <div
          key={comment.id}
          className="inviz rounded-xl shadow-xl hover:shadow-2xl hover:shadow-blue-700/[0.2] p-4"
        >
          <div className="w-full">
            <div className="">
              <time
                dateTime={comment.createdAt}
                className="text-xs text-content"
              >
                <p className="inline-block text-lg font-bold text-accent">{`@${comment.username}`}</p>{" "}
                {`${await getRelativeTime(comment.createdAt)}`}
              </time>
            </div>
            <div className="text-left">
              <p className="font-montserrat font-semibold">{comment.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default CommentList;
