"use client";

import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";

export default function InfoContainer() {
  const ANSWERED_QUESTIONS = [
    {
      question:
        "1. For every legislator available, how many bills did the legislator support (voted for the bill)? How many bills did the legislator oppose?",
      answer:
        "The number of bills supported and opposed by each legislator is available in the Legislators table. You can filter the table by legislator to see the specific bills they supported or opposed.",
    },
    {
      question:
        "2. For every bill available, how many legislators supported the bill? How many legislators opposed the bill? Who was the primary sponsor of the bill?",
      answer:
        "The number of legislators who supported and opposed each bill is available in the Bills table. You can filter the table by bill to see the specific legislators who supported or opposed it. The primary sponsor of the bill is also listed in the table.",
    },
  ];
  return (
    <div className="p-4 rounded-lg bg-white dark:bg-gray-900 shadow-md">
      <h1 className="text-lg md:text-lg font-bold bg-gradient-to-r from-quorum-primary to-quorum-secondary text-transparent bg-clip-text">
        What information can I find here?
      </h1>
      <Accordion type="single" collapsible>
        {ANSWERED_QUESTIONS.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-sm md:text-base font-semibold">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-base">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
