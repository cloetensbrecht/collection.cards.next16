"use client";

import { Button } from "@/components/ui/button";
import { Pattern as PatternIcon } from "@/icons/Pattern";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import Card, { CardProps } from "../card/Card";
import { TiltCard } from "../tiltcard/TiltCard";
import { Title } from "../title/Title";
const { renderToString } = await import("react-dom/server");

interface ImageModalProps {
  card: CardProps | null;
  onClose: () => void;
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute right-4 top-4 z-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background cursor-pointer hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
      onClick={onClose}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </Button>
  );
}

export function CardModal({ card, onClose }: ImageModalProps) {
  useEffect(() => {
    if (!card) return;

    const docEl = document.documentElement;
    const body = document.body;
    const sbw = window.innerWidth - docEl.clientWidth;

    docEl.style.setProperty("--sbw", `${sbw}px`);
    docEl.classList.add("modal-open");
    body.classList.add("modal-open");

    return () => {
      docEl.classList.remove("modal-open");
      body.classList.remove("modal-open");
      docEl.style.removeProperty("--sbw");
    };
  }, [card]);

  const maskImage = `url(\'data:image/svg+xml;utf8,${renderToString(
    <PatternIcon />
  )}\')`;

  return (
    <AnimatePresence>
      {card && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-foreground/3 backdrop-blur-sm"
            onClick={onClose}
          >
            <div
              className="absolute inset-0 bg-foreground/3 mask-size-[30px_auto] mask-center mask-repeat"
              style={{
                maskImage: maskImage,
              }}
            ></div>
          </motion.div>
          <motion.div
            layoutId={`card-${card.id}`}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-5xl max-h-[90vh] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-card shadow-lg overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClose={onClose} />
            <div className="flex flex-row flex-1 h-full gap-6 overflow-hidden p-8">
              {/* Left (1/3) */}
              <div className="flex w-1/3 items-center justify-center aspect-[733/1024] max-h-[100%]">
                {/* Aspect box that respects max height */}
                <div className="aspect-[733/1024] w-auto h-full max-w-[100%] max-h-[100%] flex items-center justify-center">
                  <motion.div
                    layoutId={`card-image-${card.id}`}
                    className="relative w-full h-full content-center"
                  >
                    <TiltCard>
                      <Card {...card} inModal={true} />
                    </TiltCard>
                  </motion.div>
                </div>
              </div>

              {/* Right (2/3) */}
              <div className="w-2/3 overflow-auto">
                <div className="p-4 space-y-4">
                  <Title.H2>{card.title}</Title.H2>
                  <p>
                    ToDo:
                    <br />
                    - Optimize for mobile
                    <br />- Add more details about the card
                    <br />- Add Prev/Next buttons to navigate between cards
                  </p>
                  <p>
                    This area can contain details, descriptions, buttons, etc.
                    It scrolls if the content overflows the modal height.
                  </p>
                  <p>
                    This area can contain details, descriptions, buttons, etc.
                    It scrolls if the content overflows the modal height.
                  </p>
                  <p>
                    This area can contain details, descriptions, buttons, etc.
                    It scrolls if the content overflows the modal height.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
