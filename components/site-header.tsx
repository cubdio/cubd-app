import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Above: Header background. Below: header container */}
      <div className="container flex h-14 max-w-screen-2xl items-center py-8">
        <MainNav />

        {/* Outer container set to grow into leftover space and align right */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Inner container holding the elements*/}
          <nav className="flex items-center space-x-4">
            <Button variant="secondary">
              <Link href="/login">Login</Link>
            </Button>
            {/* <Button>
              <Link href="/signup">Sign Up</Link>
            </Button> */}
          </nav>
        </div>
      </div>
    </header>
  );
}
