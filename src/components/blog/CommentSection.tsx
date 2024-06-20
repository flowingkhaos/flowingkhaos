"use client";

import { useState, useEffect } from "react";

import { fetchCommentForm } from "@/lib/actions/forms/comments";
import CommentForm from "@/components/blog/CommentForm";
import { Form } from "@/lib/gql/queries/forms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Button as NeonButton } from "@/components/aceternity/MovingBorders";

interface CommentSectionProps {
  slug: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ slug }) => {
  const [formState, setFormState] = useState<Form | null>(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const form = await fetchCommentForm();
        setFormState(form);
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };

    fetchForm();
  }, []);

  if (!formState) return <p>Loading form...</p>;

  const closeButton = formState.buttons.find(
    (button) => button.slug === "close"
  );

  return (
    <>
      <h2 className="text-2xl font-black font-montserrat mt-24 text-primary leading-7 md:text-2xl md:leading-7 p-5">
        {formState.title}
      </h2>
      <div className="flex items-center justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="inline-flex items-center justify-center text-sm text-content hover:bg-accent border-accent"
            >
              {formState.modal}
            </Button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle className="mb-4 text-xl leading-14 font-black tracking-tight">
                <h2>{formState.subtitle}</h2>
              </DialogTitle>
              <DialogDescription className="max-w-none font-montserrat">
                Comments section
              </DialogDescription>
            </DialogHeader>
            <CommentForm
              title={formState.title}
              subtitle={formState.subtitle}
              fields={formState.fields}
              buttons={formState.buttons}
              slug={slug}
            />
            <DialogClose asChild>
              {closeButton && (
                <Button type="button" className="bg-secondary w-full">
                  {closeButton.text}
                </Button>
              )}
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CommentSection;
