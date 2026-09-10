"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

interface ClientNavigationProps {
  href: string;
  className?: string;
  children: ReactNode;
  ariaCurrent?: "page";
}

export function ClientNavigation({
  href,
  className,
  children,
  ariaCurrent,
}: ClientNavigationProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(href)}
      className={className}
      aria-current={ariaCurrent}
    >
      {children}
    </button>
  );
}
