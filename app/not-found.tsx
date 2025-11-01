import { Title } from "@/components/title/Title";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <section aria-labelledby="error-title" className="pt-12 md:pt-18 lg:pt-24">
      <div className="px-6 relative z-10 container mx-auto flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
        <div className="m-auto flex max-w-xl flex-1 flex-col items-center gap-6 text-center lg:gap-8">
          <div className="gap-6 flex flex-col items-center text-center">
            <div className="text-sm font-medium text-muted-foreground">404</div>
            <Title.H1 id="error-title">Page not found</Title.H1>
            <p className="text-muted-foreground text-base lg:text-lg">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
              Please check the URL or navigate back home.
            </p>
          </div>
          <Button asChild className="cursor-pointer">
            <Link href="/">Go to homepage</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
