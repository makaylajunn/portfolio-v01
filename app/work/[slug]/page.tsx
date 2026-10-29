import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/case-study/CaseStudy";
import { CASE_STUDY_CONTENT, getCaseStudy } from "@/lib/case-studies/data";

export function generateStaticParams() {
  return CASE_STUDY_CONTENT.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.hero.title} · Makayla Jun`,
    description: study.hero.summary,
  };
}

export default async function WorkPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const next = study.next ? getCaseStudy(study.next) : undefined;
  return <CaseStudy content={study} next={next} />;
}
