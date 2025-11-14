import Glare from "@/components/glare/Glare";
import { cn } from "@/lib/utils";

const ReverseHolofoil: React.FC = () => {
  return (
    <>
      <div
        className={cn(
          "reverse-holofoil absolute w-full h-full z-1",
          "[contain:paint]",
          "mask-[var(--mask)] mask-luminance mask-center mask-cover",
          "mix-blend-color-dodge",
          "[background-blend-mode:soft-light,difference] bg-size-[120%_120%,200%_200%,cover] [background-position:50%,calc((100%_*_var(--pointer-from-left)))_calc((100%_*_var(--pointer-from-top))),50%] [background-image:radial-gradient(circle_at_var(--pointer-x)_var(--pointer-y),#fff_5%,#000_50%,#fff_80%),linear-gradient(-45deg,#000_15%,#fff,#000_85%),var(--foil)]",
          "filter-[brightness(0.55)_contrast(1.5)_saturate(1)]",
          "opacity-90 group-hover/card:opacity-100",
          "will-change-[opacity,background-image,background-position-x,background-position-y]"
        )}
      />
      <Glare />
    </>
  );
};

export default ReverseHolofoil;
