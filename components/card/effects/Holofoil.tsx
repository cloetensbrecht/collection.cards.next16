import Glare from "@/components/glare/Glare";
import { cn } from "@/lib/utils";

const Holofoil: React.FC = () => {
  return (
    <>
      <div
        style={
          {
            "--rotate-delta": "0deg",
            "--bars": "5%",
            "--bar-bg": "hsla(0, 0%, 0%, 1)",
            "--bar-color": "hsla(0, 0%, 70%, 1)",
          } as React.CSSProperties
        }
        className={cn(
          "holofoil absolute w-full h-full z-1",
          "backface-hidden",
          "mix-blend-overlay",
          "[contain:paint]",
          "will-change-[background-position]",
          "mask-[var(--mask)] mask-luminance mask-center mask-cover",
          "filter-[brightness(1.25)_contrast(3)_saturate(.75)]",
          "bg-blend-overlay",
          "bg-size-[400%_400%]",
          "[background-position:calc(((50%_-_var(--background-x)))_+_50%)_calc(((50%_-_var(--background-y)))_+_50%)]",
          "[background-image:repeating-linear-gradient(10deg,var(--holo),var(--holo),var(--holo),var(--holo),var(--holo),var(--holo),var(--holo))]",
          "before:absolute",
          "before:inset-0",
          "before:bg-size-[200%_200%,200%_200%]",
          "before:[background-position:50%_calc((var(--background-y)_*_1.2)),50%_calc((var(--background-y)_*_-1.2))] before:bg-blend-screen",
          "before:mix-blend-multiply",
          "before:filter-[brightness(1)_contrast(2)_saturate(.75)]",
          "before:[background-image:repeating-linear-gradient(_calc((var(--tilt-x)_-_var(--rotate-delta))_*_0.25),_var(--bar-bg)_calc(var(--bars)*2.5),_var(--bar-color)_calc(var(--bars)*3.25),_hsla(0,_0%,_75%,_.5)_calc(var(--bars)*3.5),_var(--bar-color)_calc(var(--bars)*3.75),_var(--bar-bg)_calc(var(--bars)*4.5),_var(--bar-bg)_calc(var(--bars)*8)),repeating-linear-gradient(_calc((var(--tilt-x)_-_var(--rotate-delta))_*_-0.25),_var(--bar-bg)_calc(var(--bars)*2.5),_var(--bar-color)_calc(var(--bars)*3.25),_hsla(0,_0%,_75%,_.5)_calc(var(--bars)*3.5),_var(--bar-color)_calc(var(--bars)*3.75),_var(--bar-bg)_calc(var(--bars)*4.5),_var(--bar-bg)_calc(var(--bars)*8))]",
          "before:will-change-[background-position,background-image]",
          "before:mask-[var(--mask)]",
          "before:mask-luminance",
          "before:mask-center",
          "before:mask-cover",
          "after:absolute",
          "after:inset-0",
          "after:[background-image:radial-gradient(farthest-corner_circle_at_var(--pointer-x)_var(--pointer-y),_hsla(0,_0%,_90%,_0.8)_0%,_hsla(0,_0%,_78%,_0.1)_25%,_hsl(0,_0%,_35%)_90%)]",
          "after:bg-center",
          "after:bg-cover",
          "after:mix-blend-luminosity",
          "after:filter-[brightness(1)_contrast(3)]",
          "after:mask-[var(--mask)]",
          "after:mask-luminance",
          "after:mask-center",
          "after:mask-cover",
          "after:will-change-[background-image]"
        )}
      />
      <Glare />
    </>
  );
};

export default Holofoil;
