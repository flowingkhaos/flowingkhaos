"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { FormButton, FormField } from "@/lib/gql/queries/forms";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { submitBookingForm } from "@/lib/actions/forms/booking";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import DatePicker from "@/components/modules/DatePicker";

interface BookingFormProps {
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

function SubmitButton({
  buttons,
  isDateSelected,
}: {
  buttons: FormButton[];
  isDateSelected: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full mt-2 hover:text-success"
      disabled={pending || !isDateSelected}
      aria-disabled={pending || !isDateSelected}
      type="submit"
    >
      {buttons[0].text}
    </Button>
  );
}

const BookingForm: React.FC<BookingFormProps> = ({
  title,
  subtitle,
  fields,
  buttons,
  slug,
}) => {
  const initialState: FormState = { message: "" };
  const submitBookingWithSlug = submitBookingForm.bind(null, slug);
  // Then, utilize useFormState with the binded action
  const [state, formAction] = useFormState(submitBookingWithSlug, initialState);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [dateError, setDateError] = useState<string | null>(null);

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
    <Card className="w-[350px] md:w-[450px] lg:w-[500px] text-content gradient border-none rounded-xl inviz shadow-xl">
      <CardHeader>
        <CardTitle className="font-extrabold text-content">{title}</CardTitle>
        <CardDescription className="font-semibold text-neutral">
          {subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="form-control w-full my-5"
          action={async (formData) => {
            formData.append(
              "selectedDate",
              selectedDate ? selectedDate.toISOString().split("T")[0] : ""
            );
            await formAction(formData);
          }}
        >
          <ul className="list-none">
            {fields.map((field, id) => {
              // Check if the field is a textarea field
              //console.log(field.choices);
              if (field.__typename === "FormTextarea") {
                return (
                  <li key={id}>
                    <Label className="">
                      <span className="font-semibold">
                        {field.textareaLabel}
                      </span>
                    </Label>
                    <Textarea
                      name={field.name}
                      placeholder={field.placeholder}
                      required
                      className="w-full rounded font-semibold text-secondary"
                    />
                  </li>
                );
              } else if (field.__typename === "FormSelect") {
                return (
                  <li key={id} className="py-3">
                    <Label className="text-start">
                      <span className="font-semibold">{field.inputLabel}</span>
                    </Label>
                    <Select name={field.name} required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.choices &&
                          field.choices.map((timeSlot) => (
                            <SelectItem
                              key={timeSlot.id}
                              value={timeSlot.timeString}
                              aria-required
                            >
                              {timeSlot.timeSlot}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
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
            <li className="py-3">
              <Label className="text-start">
                <span className="font-semibold">Select Date</span>
              </Label>
              <DatePicker
                selectedDate={selectedDate}
                setSelectedDate={(date) => {
                  setSelectedDate(date);
                  setDateError(null);
                }}
              />
              {dateError && (
                <p className="text-error text-sm mt-1">{dateError}</p>
              )}
            </li>
          </ul>
          {isMessageVisible && state.message && (
            <p
              className={`${state.success ? "text-success" : "text-error"} p-2 font-bold alert-message`}
            >
              {state.message}
            </p>
          )}
          {buttons.length > 0 && (
            <SubmitButton buttons={buttons} isDateSelected={!!selectedDate} />
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
