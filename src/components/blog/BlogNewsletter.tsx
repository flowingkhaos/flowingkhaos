"use client";

import { useState, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import {
  fetchNewsletterForm,
  submitNewsletterForm,
} from "@/lib/actions/forms/newsletter";
import { Form, FormButton } from "@/lib/gql/queries/forms";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

function SubmitButton({ buttons }: { buttons: FormButton[] }) {
  const { pending } = useFormStatus();

  return (
    <Button
      className="mt-5 rounded shadow-xl animate-bounce hover:animate-none"
      disabled={pending}
      aria-disabled={pending}
      type="submit"
    >
      {buttons[0].text}
    </Button>
  );
}

const BlogNewsletter = () => {
  const [formState, setFormState] = useState<Form | null>(null);
  const [state, formAction] = useFormState(
    async (
      prevState: { success: boolean; error?: string; message: string },
      formData: FormData
    ) => {
      const email =
        formData instanceof FormData
          ? formData.get("email")
          : (formData as { email: string }).email;

      const name =
        formData instanceof FormData
          ? formData.get("name")
          : (formData as { name: string }).name;

      try {
        const response = await submitNewsletterForm(prevState, formData);
        return {
          success: response.success,
          error: response.error,
          message: response.message,
        };
      } catch (error: any) {
        console.error("Error submitting form:", error);
        return { ...prevState, error: "An error occurred. Please try again." };
      }
    },
    { success: false, error: undefined, message: "" } // Initial state
  );
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const form = await fetchNewsletterForm();
        setFormState(form === undefined ? null : form);
      } catch (error: any) {
        console.error("Error fetching form:", error);
      }
    };

    fetchForm();
  }, []);

  useEffect(() => {
    if (state.message) {
      setIsMessageVisible(true);
      // Set timeout to hide message after delay
      const hideTimeout = setTimeout(() => setIsMessageVisible(false), 3000);

      // Cleanup function to clear timeout on component unmount or state change
      return () => clearTimeout(hideTimeout);
    }
  }, [state.message]);

  if (!formState) {
    return <p>Loading form...</p>;
  }

  return (
    <section className="inviz shadow-xl rounded border border-primary z-50 p-4">
      {!formState ? (
        <p>Loading form...</p>
      ) : (
        <>
          <h1 className="text-xl leading-9 font-montserrat font-black text-center tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 my-4">
            {formState.title}
          </h1>
          <form className="w-full" action={formAction}>
            <ul className="list-none">
              {formState.fields.map((field, id) => (
                <li key={id}>
                  <Label className="">
                    <span className="font-montserrat">{field.inputLabel}</span>
                  </Label>
                  <Input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    required
                    className="w-full rounded font-montserrat font-bold text-secondary my-3"
                  />
                </li>
              ))}
            </ul>
            {isMessageVisible && state.message && (
              <p
                className={`${state.success ? "text-success" : "text-error"} p-2 font-semibold font-oswald uppercase tracking-wide`}
              >
                {state.message}
              </p>
            )}
            {formState.buttons.length > 0 && (
              <SubmitButton buttons={formState.buttons} />
            )}
          </form>
        </>
      )}
    </section>
  );
};

export default BlogNewsletter;
