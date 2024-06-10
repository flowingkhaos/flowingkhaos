import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqProps {
  faq: {
    id: string;
    title: string;
    question: string[];
    answer: string[];
  };
}

const Faq: React.FC<FaqProps> = ({ faq }) => {
  const { question, answer } = faq; // Destructure question and answer from faq

  // Ensure questions and answers have the same length
  if (question.length !== answer.length) {
    console.error(
      "Error: Questions and answers arrays must have the same length."
    );
    return null; // Handle the error gracefully or display an appropriate message
  }

  return (
    <section className="p-6">
      <h1 className="text-3xl h1 text-center text-content uppercase lg:text-4xl font-montserrat">
        {faq.title}
      </h1>
      <Accordion type="single" collapsible>
        {question.map((question, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger className="text-secondary font-montserrat">
              {question}
            </AccordionTrigger>
            <AccordionContent className="text-content">
              {answer[index]}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Faq;
