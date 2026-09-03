import type { Metadata } from "next";

import { ScrollToTop } from "@/components/fe/scroll-to-top";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jlpt-practice-n1.vduy.chatgpt.site"),
  title: "JLPT Practice",
  description:
    "Focused, exam-based practice for the Japanese Language Proficiency Test.",
  openGraph: {
    title: "JLPT Practice",
    description: "Focused exam preparation",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "JLPT Practice — Focused exam preparation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JLPT Practice",
    description: "Focused exam preparation",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="mdl-js">
      <body>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
