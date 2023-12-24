import { siteConfig } from "@/config/site";
import { ThemeToggle } from "./theme-toggle";

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-1 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          cubd © 2023. The source code is available on{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
        <ThemeToggle />
      </div>
    </footer>
  );
}
