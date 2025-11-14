import { holofoilPatterns, reverseHolofoilPatterns } from "@/consts/effect";
import { variant } from "@/consts/variant";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Glare from "../glare/Glare";
import Holofoil from "./effects/holofoil";
import ReverseHolofoil from "./effects/reverseholofoil";
import ReverseHolofoilMasterBall from "./effects/reverseHolofoilMasterBall";
import ReverseHolofoilPokeBall from "./effects/reverseHolofoilPokeBall";

export type CardProps = {
  blurDataURL?: string;
  edgeColor?: string;
  focus?: { x: number; y: number };
  foil?: string;
  glowColor?: string;
  id: string;
  inModal?: boolean;
  mask?: string;
  onClick?: () => void;
  pattern?:
    | keyof typeof reverseHolofoilPatterns
    | keyof typeof holofoilPatterns;
  sizes: string;
  src: string;
  title: string;
  variant: keyof typeof variant;
};

const Card: React.FC<CardProps> = ({
  blurDataURL,
  edgeColor,
  focus,
  foil,
  glowColor,
  id,
  inModal,
  mask,
  onClick,
  pattern,
  sizes,
  src,
  title,
  variant,
}) => {
  let Effect = Glare;
  switch (variant) {
    case "holofoil":
      switch (pattern) {
        case "tinsel":
          console.log("ToDo: implement tinsel holofoil effect");
          break;
        default:
          Effect = Holofoil;
      }
      break;
    case "reverse_holofoil":
      switch (pattern) {
        case "masterBall":
          Effect = ReverseHolofoilMasterBall;
          break;
        case "pokeBall":
          Effect = ReverseHolofoilPokeBall;
          break;
        default:
          Effect = ReverseHolofoil;
      }
      break;
    default:
      Effect = Glare;
  }

  const CardContainer = !inModal ? motion.button : "div";
  const cardContainerProps = !inModal ? { layoutId: `card-${id}` } : {};

  return (
    <CardContainer
      className={cn(
        "group/card",
        "relative w-full overflow-hidden rounded-[10px] md:rounded-[4.15%/2.98%] flex items-center justify-center aspect-[733/1024]",
        "shadow-lg",
        glowColor
          ? "hover:shadow-[0_0_3px_-1px_rgba(0,0,0,0),0_0_2px_1px_var(--card-edge),0_0_5px_var(--card-glow),0_10px_20px_-5px_#000,0_2px_15px_-5px_var(--card-glow),0_0_20px_var(--card-glow)]"
          : undefined,
        glowColor
          ? "focus:shadow-[0_0_3px_-1px_rgba(0,0,0,0),0_0_2px_1px_var(--card-edge),0_0_5px_var(--card-glow),0_10px_20px_-5px_#000,0_2px_15px_-5px_var(--card-glow),0_0_20px_var(--card-glow)]"
          : undefined,
        "focus:outline-1 md:focus:outline-2 focus:outline-solid focus:outline-[var(--card-glow)]",
        onClick ? "cursor-pointer" : null
      )}
      {...cardContainerProps}
      onClick={onClick}
      style={
        {
          "--card-edge": edgeColor,
          "--card-glow": glowColor || "black",
          "--foil": foil ? `url(/media${foil})` : undefined,
          "--mask": mask ? `url(/media${mask})` : undefined,
          "--ring": glowColor || "black",
        } as React.CSSProperties
      }
    >
      <motion.div
        className="relative w-full h-full"
        layoutId={!inModal ? `card-image-${id}` : undefined}
      >
        <Image
          alt={title}
          blurDataURL={blurDataURL}
          fetchPriority="high"
          fill={true}
          layout="fill"
          placeholder="blur"
          preload={true}
          src={src}
          style={{
            backgroundColor: edgeColor,
            objectFit: "contain",
            objectPosition: focus
              ? `${focus.x * 100}% ${focus.y * 100}%`
              : undefined,
          }}
          sizes={sizes}
        />
        <Effect />
      </motion.div>
    </CardContainer>
  );
};

export default Card;
