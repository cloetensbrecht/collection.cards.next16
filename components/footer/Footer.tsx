import { Discord } from "@/icons/Discord";
import { GitHub } from "@/icons/GitHub";
import { Logo } from "@/icons/Logo";
import { Reddit } from "@/icons/Reddit";
import Link from "next/link";
import ComingSoon from "../comingsoon/ComingSoon";
import Container from "../container/Container";

const Footer: React.FC = () => (
  <footer
    className="bg-background text-sm pb-8 pt-32"
    role="contentinfo"
    aria-label="Site footer"
  >
    <Container className="flex flex-col gap-8 items-center md:items-start">
      <div className="grid grid-cols-1 items-center gap-12 text-center lg:grid-cols-3 lg:items-start lg:gap-6 lg:text-left w-full justify-items-center lg:justify-items-stretch">
        <Logo width="50" className="self-end" />
        <div className="flex flex-col gap-4 h-full justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="text-foreground text-base font-medium">
              Contribute
            </h2>
            <nav
              className="flex gap-4 justify-center lg:justify-start content-center"
              aria-label="Contribution links"
            >
              <Link
                href="https://github.com/collection-cards/collection.cards"
                target="_blank"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <GitHub width={24} />
              </Link>
            </nav>
          </div>
        </div>
        <div className="flex flex-col gap-4 h-full justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="text-foreground text-base font-medium">
              Join our community
            </h2>
            <nav
              className="flex gap-4 justify-center lg:justify-start content-center"
              aria-label="Community links"
            >
              <Link
                href="https://discord.gg/NSjyKFHRaf"
                target="_blank"
                aria-label="Discord"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Discord width={24} />
              </Link>
              <Link
                href="https://www.reddit.com/r/collectioncards/"
                target="_blank"
                aria-label="Reddit"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Reddit width={24} />
              </Link>
            </nav>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with{" "}
            <Link
              href="https://alineacms.com"
              target="_blank"
              className="font-medium text-foreground hover:underline"
            >
              Alinea
            </Link>
          </p>
        </div>
      </div>
      <div
        data-orientation="horizontal"
        role="presentation"
        data-slot="separator"
        className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
      ></div>
      <div className="flex flex-col gap-12 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left w-full">
        <p className="text-muted-foreground text-center lg:text-left leading-relaxed order-2 lg:order-1">
          <span>&copy; 2025</span> All rights reserved.
          <br />
          This website is not produced, endorsed, supported, or affiliated with
          Nintendo or The Pok&eacute;mon Company.
        </p>
        <nav
          className="order-1 flex flex-col items-center gap-2 text-center lg:order-2 lg:flex-row lg:items-start lg:gap-8 lg:text-left"
          aria-label="Legal links"
        >
          <ComingSoon>
            <Link
              className="text-muted-foreground hover:text-foreground text-center transition-colors md:text-left"
              href="#"
            >
              Privacy Policy
            </Link>
          </ComingSoon>
          <ComingSoon>
            <Link
              className="text-muted-foreground hover:text-foreground text-center transition-colors md:text-left"
              href="#"
            >
              Terms of Service
            </Link>
          </ComingSoon>
          <ComingSoon>
            <Link
              className="text-muted-foreground hover:text-foreground text-center transition-colors md:text-left"
              href="#"
            >
              Cookies Settings
            </Link>
          </ComingSoon>
        </nav>
      </div>
    </Container>
  </footer>
);

export default Footer;
