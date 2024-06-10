"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { submitCommentForm } from "@/lib/actions/forms/comments";
import { FormButton, FormField } from "@/lib/gql/queries/forms";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface CommentFormProps {
  title: string;
  subtitle?: string;
  fields: FormField[];
  buttons: FormButton[];
  slug: string;
}

interface FormState {
  success?: boolean;
  message: string;
}

function SubmitButton({ buttons }: { buttons: FormButton[] }) {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full mt-2"
      disabled={pending}
      aria-disabled={pending}
      type="submit"
    >
      {buttons[0].text}
    </Button>
  );
}

const CommentForm: React.FC<CommentFormProps> = ({
  title,
  subtitle,
  fields,
  buttons,
  slug,
}) => {
  const initialState: FormState = { message: "" };
  const submitCommentWithSlug = submitCommentForm.bind(null, slug);
  // Then, utilize useFormState with the binded action
  const [state, formAction] = useFormState(submitCommentWithSlug, initialState);
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  useEffect(() => {
    if (state.message) {
      setIsMessageVisible(true);
      // Set timeout to hide message after delay
      const hideTimeout = setTimeout(() => setIsMessageVisible(false), 3000);

      //  Cleanup function to clear timeout on component unmount or state change
      return () => clearTimeout(hideTimeout);
    }
  }, [state.message]);

  return (
    <>
      <form
        className="form-control w-full CommentForm my-5"
        action={formAction}
      >
        <ul className="list-none">
          {fields.map((field, id) => {
            // Check if the field is a textarea field
            if (field.__typename === "FormTextarea") {
              return (
                <li key={id}>
                  <Label className="">
                    <span className="font-semibold">{field.textareaLabel}</span>
                  </Label>
                  <Textarea
                    name={field.name}
                    placeholder={field.placeholder}
                    required
                    className="w-full rounded font-semibold text-secondary"
                  />
                </li>
              );
            } else {
              // Render input fields
              return (
                <li key={id} className="py-3">
                  <Label className="text-start">
                    <span className="font-semibold">{field.inputLabel}</span>
                  </Label>
                  <Input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    required
                    className="w-full rounded font-semibold text-secondary"
                  />
                </li>
              );
            }
          })}
        </ul>
        {isMessageVisible && state.message && (
          <p
            className={`${state.success ? "text-success" : "text-error"} p-2 font-bold alert-message`}
          >
            {state.message}
          </p>
        )}
        {buttons.length > 0 && <SubmitButton buttons={buttons} />}
      </form>
    </>
  );
};

export default CommentForm;
