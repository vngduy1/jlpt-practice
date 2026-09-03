import { Home } from "lucide-react";

export function HomeFooter() {
  return (
    <footer className="mt-8 border-t border-border/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-semibold text-foreground">JLPT Practice</p>
          <p className="mt-1">日本語能力試験の学習をサポートします。</p>
        </div>

        {/* oxlint-disable-next-line next/no-html-link-for-pages -- Full-page navigation is required for Vinext/Cloudflare deployment. */}
        <a
          href="/"
          className="inline-flex min-h-10 w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-secondary hover:text-primary"
        >
          <Home className="size-4" aria-hidden="true" />
          ホームへ戻る
        </a>
      </div>
    </footer>
  );
}
