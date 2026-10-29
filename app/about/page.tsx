import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About · Makayla Jun",
  description:
    "Makayla Jun visualizes product stories—from PowerPoint at eight to founding designer and design manager. Career path, skills, and selected work.",
};

export default function About() {
  return <AboutPage />;
}
