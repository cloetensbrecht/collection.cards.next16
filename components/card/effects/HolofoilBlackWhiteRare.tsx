import Glare from "@/components/glare/Glare";
import { cn } from "@/lib/utils";

type HolofoilBlackWhiteRareProps = { radial?: boolean };

const HolofoilBlackWhiteRare: React.FC<HolofoilBlackWhiteRareProps> = ({
  radial,
}) => {
  return (
    <>
      <div
        className={cn(
          "holofoil-special-illustration-rare",
          "absolute w-full h-full z-1",
          "[contain:paint] backface-hidden",
          "mix-blend-color-dodge",
          "mask-[var(--mask)] mask-luminance mask-center mask-cover",
          "filter-[brightness(.6)_contrast(1.5)_saturate(1)]",

          "before:absolute",
          "before:inset-0",
          "before:backface-hidden",
          "before:z-2",
          "before:mask-[var(--mask)]",
          "before:mask-luminance",
          "before:mask-center",
          "before:mask-cover",
          "before:mix-blend-overlay",
          "before:filter-[brightness(1)_contrast(.75)_saturate(1)]",
          "before:bg-size-[240%_240%]",
          "before:bg-center",
          "before:[background-image:repeating-linear-gradient(15deg,var(--holo),var(--holo),var(--holo))]",

          "after:absolute",
          "after:inset-0",
          "after:backface-hidden",
          "after:z-3",
          "after:mask-[var(--mask)]",
          "after:mask-luminance",
          "after:mask-center",
          "after:mask-cover",
          "after:mix-blend-hard-light",
          "after:filter-[brightness(1)_contrast(.75)_saturate(1)]",
          "after:[background-blend-mode:exclusion,exclusion]",
          "after:bg-size-[300%_300%]",
          "after:bg-position-[50%_calc((var(--background-y)*-1.8)),50%_calc((var(--background-y)*-1.3))]",
          "after:will-change-[background-position,background-image]",
          "after:bg-repeat",
          radial
            ? "after:[background-image:radial-gradient(farthest-corner_circle_at_var(--pointer-x)_var(--pointer-y),0%,#797979_30%,black_36%)]"
            : "after:[background-image:linear-gradient(calc(var(--tilt-x)*-0.25),black_24%,#797979_30%,black_36%),linear-gradient(calc(var(--tilt-x)*0.25),black_24%,#797979_30%,black_36%)]"
        )}
      />
      <Glare
        className={cn(
          "backface-hidden",
          "mix-blend-multiply",
          "filter-[contrast(1.5)]",
          "[background-image:radial-gradient(farthest-corner_circle_at_var(--pointer-x)_var(--pointer-y),hsl(0,0%,80%)_10%,hsla(0,0%,50%,40%)_70%)]",
          "group-hover/card:[background-image:radial-gradient(farthest-corner_circle_at_var(--pointer-x)_var(--pointer-y),hsl(0,0%,80%)_10%,hsl(0,0%,50%)_70%)]"
        )}
      />
      <div
        className={cn(
          "absolute w-full h-full",
          "inset-0",
          "[contain:paint] backface-hidden",
          "mask-[var(--foil)] mask-luminance mask-center mask-cover",
          "mix-blend-overlay",
          "filter-[contrast(.8)]",
          "bg-white"
        )}
      />
    </>
  );
};

export default HolofoilBlackWhiteRare;
