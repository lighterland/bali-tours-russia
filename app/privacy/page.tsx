import Link from "next/link";

export const metadata = { title: "Privacy | Bali Closer" };

export default function PrivacyLanguagePage() {
  return <main className="legal-page"><p className="eyebrow">Bali Closer</p><h1>Privacy policy</h1><p><Link className="button primary" href="/ru/privacy">Русская версия</Link> <Link className="button" href="/en/privacy">English version</Link></p></main>;
}
