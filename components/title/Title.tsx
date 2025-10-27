import { cn } from "@/lib/utils";

export const Title = {
  H1: function H1({
    children,
    className,
    ...props
  }: { children: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) {
    return (
      <h1
        className={cn(
          "text-4xl font-semibold leading-10 tracking-tight text-foreground pb-5 last:pb-0",
          className
        )}
        {...props}
      >
        {children}
      </h1>
    );
  },
  H2: function H2({
    children,
    className,
    ...props
  }: { children: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) {
    return (
      <h2
        className={cn(
          "text-2xl font-semibold leading-9 tracking-tight text-foreground pb-4 last:pb-0",
          className
        )}
        {...props}
      >
        {children}
      </h2>
    );
  },
  H3: function H3({
    children,
    className,
    ...props
  }: { children: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) {
    return (
      <h3
        className={cn(
          "text-xl font-semibold leading-8 tracking-tight text-foreground pb-3 last:pb-0",
          className
        )}
        {...props}
      >
        {children}
      </h3>
    );
  },
};
