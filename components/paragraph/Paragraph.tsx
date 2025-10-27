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
        "text-muted-foreground text-base pb-2 last:pb-0",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

export default Paragraph;
