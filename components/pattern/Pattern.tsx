import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type PatternProps = { className?: string };

const Pattern: React.FC<PropsWithChildren<PatternProps>> = ({
  className,
  children,
}) => {
  return <div className={cn(`w-full bg-repeat`, className)}>{children}</div>;
};

export default Pattern;
