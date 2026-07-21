import Link from "next/link";

export const metadata = { title: "Booking terms | Bali Closer" };

export default function TermsLanguagePage() {
  return <main className="legal-page"><p className="eyebrow">Bali Closer</p><h1>Booking terms</h1><p><Link className="button primary" href="/ru/terms">Русская версия</Link> <Link className="button" href="/en/terms">English version</Link></p></main>;
}
