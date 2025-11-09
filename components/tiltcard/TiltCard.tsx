"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import { useRef, type ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltMaxAngle?: number;
  tiltReverse?: boolean;
  scale?: number;
  transitionSpeed?: number;
}

export function TiltCard({
  children,
  className,
  tiltMaxAngle = 15,
  tiltReverse = false,
  scale = 1.05,
  transitionSpeed = 400,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    // Cancel any pending RAF to prevent multiple updates per frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate tilt based on position (0 to 1 range)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      const pointerX = percentX < 0 ? (1 + percentX) * 50 : percentX * 50 + 50;
      const pointerY = percentY < 0 ? (1 + percentY) * 50 : percentY * 50 + 50;

      const tiltX = percentY * tiltMaxAngle * (tiltReverse ? -1 : 1);
      const tiltY = percentX * tiltMaxAngle * (tiltReverse ? 1 : -1);

      // Apply transforms using CSS variables (GPU-accelerated, no re-render)
      card.style.setProperty("--pointer-x", `${pointerX}%`);
      card.style.setProperty("--pointer-y", `${pointerY}%`);
      card.style.setProperty(
        "--pointer-from-center",
        `${percentX < 0 ? -percentX : percentX}%`
      );
      card.style.setProperty("--pointer-from-left", `${pointerX / 100}`);
      card.style.setProperty("--pointer-from-top", `${pointerY / 100}`);
      card.style.setProperty("--scale", `${scale}`);
      card.style.setProperty("--tilt-x", `${tiltX}deg`);
      card.style.setProperty("--tilt-y", `${tiltY}deg`);
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    // Cancel any pending RAF
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    // Reset transform
    card.style.setProperty("--pointer-x", `50%`);
    card.style.setProperty("--pointer-y", `50%`);
    card.style.setProperty("--pointer-from-center", `0`);
    card.style.setProperty("--pointer-from-left", `0.5`);
    card.style.setProperty("--pointer-from-top", `0.5`);
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--scale", "1");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("tilt-card relative z-1 hover:z-10", className)}
      style={
        {
          "--pointer-x": "50%",
          "--pointer-y": "50%",
          "--pointer-from-center": "0",
          "--pointer-from-left": "0.5",
          "--pointer-from-top": "0.5",
          "--tilt-x": "0deg",
          "--tilt-y": "0deg",
          "--scale": "1",
          "--transition-speed": `${transitionSpeed}ms`,
          transform:
            "perspective(1000px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) scale(var(--scale))",
          transition:
            "transform var(--transition-speed) cubic-bezier(0.03, 0.98, 0.52, 0.99)",
          willChange: "transform",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
