import type { Metadata } from "next";
import { DM_Mono, Lora, Plus_Jakarta_Sans, Vibur } from "next/font/google";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Logo only. Google Fonts ships Vibur in a single weight (400).
const vibur = Vibur({
  variable: "--font-vibur",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Makayla Jun — Designing for complex care systems",
  description:
    "Systems builder with an M.A. in Psychology and 4+ years as a founding player-coach designer. Design systems, accessibility, and 0→1 SaaS.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${plusJakartaSans.variable} ${dmMono.variable} ${vibur.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col overflow-x-clip"
        suppressHydrationWarning
      >
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
