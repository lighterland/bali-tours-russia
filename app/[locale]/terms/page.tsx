import Link from "next/link";
import { notFound } from "next/navigation";
import { termsCopy } from "@/lib/legal-copy";

export const dynamicParams = false;
export function generateStaticParams() { return [{ locale: "ru" }, { locale: "en" }]; }

export default async function LocalizedTermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "ru" && locale !== "en") notFound();
  const copy = termsCopy[locale];
  return <main className="legal-page"><Link href={`/${locale}`} className="text-link">← {copy.back}</Link><p className="eyebrow">Bali Closer</p><h1>{copy.title}</h1><p>{copy.effective}</p>{copy.sections.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}</main>;
}
