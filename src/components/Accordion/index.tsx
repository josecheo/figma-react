import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { AccordionProps } from "./Accordion.type";

export default function DefaultAccordion({
  title,
  content,
  getCodeByFrame,
}: AccordionProps) {
  const [open, setOpen] = useState(1);
  const [active, setActive] = useState("");

  const handleOpen = (value: React.SetStateAction<number>) =>
    setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)}>{title}</AccordionHeader>
        <AccordionBody className="flex-col p-2">
          {content.map((frame: any) => {
            return (
              <button
                onClick={() => {
                  getCodeByFrame(frame);
                  setActive(frame.id);
                }}
                key={frame.id}
                className={`font-medium text-slate-900 cursor-pointer w-[100%] rounded-lg mt-2 p-2 leading-5  ring-2 bg-gray-100 ${
                  active === frame.id ? "ring-blue" : "ring-gray-300"
                } `}
              >
                {frame.name}
              </button>
            );
          })}
        </AccordionBody>
      </Accordion>
    </>
  );
}
