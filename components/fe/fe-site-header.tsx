import { BookOpenText } from "lucide-react";

import { ClientNavigation } from "@/components/navigation/client-navigation";

interface FeSiteHeaderProps {
  active?: "fe";
}

export function FeSiteHeader({ active = "fe" }: FeSiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4 px-5 py-2 sm:px-8">
        <ClientNavigation
          href="/fe"
          className="flex min-w-0 items-center gap-3 text-left"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
            <BookOpenText className="size-5" aria-hidden="true" />
          </span>

          <span className="min-w-0 leading-tight">
            <span className="block truncate font-semibold tracking-tight">
              FE Theory
            </span>

            <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
              基本情報技術者試験
            </span>
          </span>
        </ClientNavigation>

        <nav className="flex items-center gap-1" aria-label="Learning sections">
          <ClientNavigation
            href="/"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            JLPT
          </ClientNavigation>

          <ClientNavigation
            href="/fe"
            ariaCurrent={active === "fe" ? "page" : undefined}
            className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
          >
            基本情報
          </ClientNavigation>
        </nav>
      </div>
    </header>
  );
}
