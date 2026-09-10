"use client";

import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

export function HomeButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
    >
      <Home className="size-4" />
      ホーム
    </button>
  );
}
