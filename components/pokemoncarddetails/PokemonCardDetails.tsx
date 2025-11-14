"use client";

import { holofoilPatterns, reverseHolofoilPatterns } from "@/consts/effect";
import { variant } from "@/consts/variant";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Title } from "../title/Title";
import { Button } from "../ui/button";

export type PokemonCardDetailsProps = {
  id: string;
  number: string;
  pattern?:
    | keyof typeof reverseHolofoilPatterns
    | keyof typeof holofoilPatterns;
  variant: keyof typeof variant;
  title: string;
};

export default function PokemonCardDetails({
  nextHandler,
  prevHandler,
  ...cardProps
}: PokemonCardDetailsProps & {
  nextHandler?: () => void;
  prevHandler?: () => void;
}) {
  const [direction, setDirection] = useState<number>(0);

  const handleNext = () => {
    setDirection(1);
    nextHandler?.();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevHandler?.();
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={cardProps.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 800, damping: 60 },
            opacity: { duration: 0.15 },
            duration: 0.15,
            ease: "easeOut",
          }}
        >
          <Title.H2>
            {cardProps.title}{" "}
            <span className="ml-2 text-gray-400 dark:text-gray-300/75 font-normal text-sm">
              # {cardProps.number}
            </span>
          </Title.H2>
          <p>
            Variant: {cardProps.variant} {cardProps.pattern}
          </p>
          <p>ToDo:</p>
          <ul>
            <li>Fix reverse holo on mobile in card detail</li>
            <li>Check full art holofoil effect</li>
            <li>Add holofoil EX effect</li>
            <li>Add holofoil tilt effect</li>
            <li>Add more details about the card</li>
          </ul>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-2 mt-4">
        {prevHandler && (
          <Button className="m-0 cursor-pointer" onClick={handlePrev}>
            Previous
          </Button>
        )}
        {nextHandler && (
          <Button className="m-0 cursor-pointer" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
