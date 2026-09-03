"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="ページ上部へ戻る"
      title="ページ上部へ戻る"
      className="fixed bottom-6 right-6 z-50 grid size-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-200 hover:-translate-y-1 hover:bg-primary/90 hover:shadow-xl active:translate-y-0"
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  );
}
