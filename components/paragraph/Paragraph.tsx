import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type ParagraphProps = PropsWithChildren &
  React.HTMLAttributes<HTMLParagraphElement>;

const Paragraph: React.FC<ParagraphProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      className={cn(
        "text-foreground/80 [&_b]:text-foreground/90 [&_strong]:text-foreground/90 text-base pb-3 last:pb-0",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

export default Paragraph;
