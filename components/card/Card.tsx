import { cn } from "@/lib/utils";
import Image from "next/image";
import Glare from "../glare/Glare";

export type CardProps = {
  averageColor?: string;
  blurDataURL?: string;
  edgeColor?: string;
  focus?: { x: number; y: number };
  glowColor?: string;
  id: string;
  sizes: string;
  src: string;
  title: string;
};

const Card: React.FC<CardProps> = ({
  averageColor,
  blurDataURL,
  edgeColor,
  focus,
  glowColor,
  sizes,
  src,
  title,
}) => (
  <button
    className={cn(
      "relative w-full overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center aspect-[733/1024]",
      "shadow-[0_0_3px_-1px_rgba(0,0,0,0),0_0_2px_1px_rgba(0,0,0,0),0_0_5px_rgba(0,0,0,0),0_10px_20px_-5px_#000,0_2px_15px_-5px_#000,0_0_20px_rgba(0,0,0,0)]",
      glowColor
        ? "hover:shadow-[0_0_3px_-1px_rgba(0,0,0,0),0_0_2px_1px_var(--card-edge),0_0_5px_var(--card-glow),0_10px_20px_-5px_#000,0_2px_15px_-5px_var(--card-glow),0_0_20px_var(--card-glow)]"
        : undefined,
      glowColor
        ? "focus:shadow-[0_0_3px_-1px_rgba(0,0,0,0),0_0_2px_1px_var(--card-edge),0_0_5px_var(--card-glow),0_10px_20px_-5px_#000,0_2px_15px_-5px_var(--card-glow),0_0_20px_var(--card-glow)]"
        : undefined,
      "focus:outline-1 md:focus:outline-2 focus:outline-solid focus:outline-[var(--card-glow)]"
    )}
    style={
      {
        "--card-edge": edgeColor,
        "--card-glow": glowColor || "black",
        "--ring": glowColor || "black",
      } as React.CSSProperties
    }
  >
    <Image
      alt={title}
      blurDataURL={blurDataURL}
      fetchPriority="high"
      layout="fill"
      placeholder="blur"
      preload={true}
      src={src}
      style={{
        backgroundColor: averageColor,
        objectFit: "contain",
        objectPosition: focus
          ? `${focus.x * 100}% ${focus.y * 100}%`
          : undefined,
      }}
      sizes={sizes}
    />
    <Glare />
  </button>
);

export default Card;
