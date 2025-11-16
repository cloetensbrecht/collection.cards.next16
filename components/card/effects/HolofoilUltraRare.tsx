import Glare from "@/components/glare/Glare";
import { cn } from "@/lib/utils";

const HolofoilUltraRare: React.FC = () => {
  return (
    <>
      <div
        style={
          {
            "--space": "5%",
            "--angle": "128.5deg",
            "--imgsize": "cover",
          } as React.CSSProperties
        }
        className={cn(
          "absolute w-full h-full z-1",
          "[contain:paint] backface-hidden",
          "mix-blend-color-dodge",
          "will-change-[background-position]",
          "mask-[var(--mask)] mask-luminance mask-center mask-cover",
          "filter-[brightness(calc((var(--pointer-from-center)*0.4)_+_.5))_contrast(2.5)_saturate(.66)]",
          "bg-size-[var(--imgsize),var(--imgsize),200%_700%,300%_100%,200%_100%]",
          "[background-blend-mode:soft-light,soft-light,hue,hard-light]",
          "bg-position-[center_center,center_center,0%_var(--background-y),calc(var(--background-x)_+_(var(--background-y)*0.2))_var(--background-y),var(--background-x)_var(--background-y)]",
          "[background-image:var(--mask),var(--foil),repeating-linear-gradient(0deg,var(--sunpillar-1)_calc(var(--space)*1),var(--sunpillar-2)_calc(var(--space)*2),var(--sunpillar-3)_calc(var(--space)*3),var(--sunpillar-4)_calc(var(--space)*4),var(--sunpillar-5)_calc(var(--space)*5),var(--sunpillar-6)_calc(var(--space)*6),var(--sunpillar-1)_calc(var(--space)*7)),repeating-linear-gradient(var(--angle),#0e152e_0%,hsl(180,_10%,_60%)_3.8%,hsl(180,_29%,_66%)_4.5%,hsl(180,_10%,_60%)_5.2%,#0e152e_14%,#0e152e_16%),radial-gradient(farthest-corner_circle_at_var(--pointer-x)_var(--pointer-y),hsla(0,_0%,_0%,_0.1)_12%,hsla(0,_0%,_0%,_0.15)_20%,hsla(0,_0%,_0%,_0.25)_120%)]",

          "after:absolute",
          "after:inset-0",
          "after:backface-hidden",
          "after:mask-luminance",
          "after:mask-center",
          "after:mask-cover",
          "after:mask-[var(--mask)]",
          "after:[background-image:var(--mask),var(--foil),repeating-linear-gradient(0deg,var(--sunpillar-6)_calc(var(--space)*1),var(--sunpillar-1)_calc(var(--space)*2),var(--sunpillar-2)_calc(var(--space)*3),var(--sunpillar-3)_calc(var(--space)*4),var(--sunpillar-4)_calc(var(--space)*5),var(--sunpillar-5)_calc(var(--space)*6),var(--sunpillar-6)_calc(var(--space)*7)),repeating-linear-gradient(var(--angle),#0e152e_0%,hsl(180,_10%,_60%)_3.8%,hsl(180,_29%,_66%)_4.5%,hsl(180,_10%,_60%)_5.2%,#0e152e_14%,#0e152e_16%),radial-gradient(farthest-corner_circle_at_var(--pointer-x)_var(--pointer-y),hsla(0,_0%,_0%,_0.1)_12%,hsla(0,_0%,_0%,_0.15)_20%,hsla(0,_0%,_0%,_0.25)_120%)]",
          "after:[background-blend-mode:soft-light,soft-light,hue,hard-light]",
          "after:mix-blend-exclusion",
          "after:filter-[brightness(calc((var(--pointer-from-center)*.4)_+_.5))_contrast(1.66)_saturate(1)]",
          "after:bg-size-[var(--imgsize),var(--imgsize),200%_400%,195%_100%,200%_100%]",
          "after:bg-position-[center_center,center_center,0%_var(--background-y),calc((var(--background-x)_+_(var(--background-y)*0.2))_*_-1)_calc(var(--background-y)_*_-1),var(--background-x)_var(--background-y)]"
        )}
      ></div>
      <Glare />
    </>
  );
};

export default HolofoilUltraRare;
