"use client";

import { Square, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";

import type { FeLanguageMode } from "@/types/fe";

interface FeSpeechButtonProps {
  textJa: string;
  textVi: string;
  mode: FeLanguageMode;
}

export function FeSpeechButton({ textJa, textVi, mode }: FeSpeechButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const createUtterance = (text: string, lang: "ja-JP" | "vi-VN") => {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1;

    return utterance;
  };

  const speak = () => {
    if (!("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterances: SpeechSynthesisUtterance[] = [];

    if (mode === "ja" || mode === "bilingual") {
      if (textJa.trim()) {
        utterances.push(createUtterance(textJa, "ja-JP"));
      }
    }

    if (mode === "vi" || mode === "bilingual") {
      if (textVi.trim()) {
        utterances.push(createUtterance(textVi, "vi-VN"));
      }
    }

    if (utterances.length === 0) {
      return;
    }

    setIsSpeaking(true);

    const last = utterances[utterances.length - 1];

    last.onend = () => {
      setIsSpeaking(false);
    };

    last.onerror = () => {
      setIsSpeaking(false);
    };

    utterances.forEach((utterance) => {
      window.speechSynthesis.speak(utterance);
    });
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return isSpeaking ? (
    <button
      type="button"
      onClick={stop}
      className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
    >
      <Square className="size-4" aria-hidden="true" />
      停止
    </button>
  ) : (
    <button
      type="button"
      onClick={speak}
      className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
    >
      <Volume2 className="size-4" aria-hidden="true" />
      読み上げ
    </button>
  );
}
