"use client";

import { Button } from "@/components/ui/button";
import { Pattern as PatternIcon } from "@/icons/Pattern";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { PropsWithChildren, useEffect } from "react";
import Card, { CardProps } from "../card/Card";
import { TiltCard } from "../tiltcard/TiltCard";
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

const CardModal: React.FC<PropsWithChildren<ImageModalProps>> = ({
  card,
  onClose,
  children,
}) => {
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
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-lg bg-card shadow-lg overflow-hidden flex flex-col max-h-[90vh]">
              <CloseButton onClose={onClose} />
              <div className="flex flex-col sm:flex-row flex-1 h-full gap-6 overflow-auto sm:overflow-hidden p-8 items-center sm:[align-items:unset]">
                <div className="flex w-full max-w-[50%] sm:w-1/3 items-center justify-center aspect-[733/1024] max-h-[100%]">
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
                <div className="w-full sm:w-2/3 sm:overflow-auto">
                  <div className="p-4 space-y-4">{children}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CardModal;
