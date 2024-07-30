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
import DecryptLoader from "../loaders/DecryptLoader";

interface CommentSectionProps {
  id: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ id }) => {
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

  if (!formState) return <DecryptLoader />;

  const closeButton = formState.buttons.find(
    (button) => button.slug === "close"
  );

  return (
    <>
      <h2 className="text-3xl h1 text-center text-content uppercase lg:text-4xl font-black font-montserrat">
        {formState.title}
      </h2>
      <div className="flex items-center justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="accent"
              size="lg"
              className="inline-flex items-center justify-center"
            >
              {formState.modal}
            </Button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle className="mb-4 text-xl leading-14 font-black tracking-tight">
                <h2>{formState.subtitle}</h2>
              </DialogTitle>
              <DialogDescription className="text-3xl h1 text-center text-secondary uppercase lg:text-4xl font-black font-montserrat">
                Comments section
              </DialogDescription>
            </DialogHeader>
            <CommentForm
              title={formState.title}
              subtitle={formState.subtitle}
              fields={formState.fields}
              buttons={formState.buttons}
              id={id}
            />
            <DialogClose asChild>
              {closeButton && (
                <Button
                  type="button"
                  variant="default"
                  className="w-full hover:text-error"
                >
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
