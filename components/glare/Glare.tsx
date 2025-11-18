import { cn } from "@/lib/utils";

type GlareProps = {
  className?: string;
};

const Glare: React.FC<GlareProps> = ({ className }) => (
  <div
    className={cn(
      "glare w-full h-full mix-blend-overlay will-change-[background-image]",
      "[background-image:radial-gradient(farthest-corner_circle_at_var(--pointer-x)_var(--pointer-y),hsla(0,0%,100%,.8)_10%,hsla(0,0%,100%,.65)_20%,hsla(0,0%,0%,.5)_90%)]",
      className
    )}
  />
);

export default Glare;
