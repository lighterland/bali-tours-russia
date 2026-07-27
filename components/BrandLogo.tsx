type BrandLogoProps = {
  locale: "ru" | "en";
  layout?: "horizontal" | "stacked" | "symbol";
  className?: string;
};

function SunriseMark() {
  return (
    <svg className="brand-logo-mark" viewBox="6 7 60 31" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 36a16 16 0 0 1 32 0" strokeWidth="2.2" />
        <path d="M8 36h56" strokeWidth="2" />
        <path d="M19.58 31.6 9.92 29.01M21.28 27.5 12.62 22.5M23.98 23.98 16.91 16.91M27.5 21.28 22.5 12.62M31.6 19.58 29.01 9.92M36 19V9M40.4 19.58 42.99 9.92M44.5 21.28 49.5 12.62M48.02 23.98 55.09 16.91M50.72 27.5 59.38 22.5M52.42 31.6 62.08 29.01" strokeWidth="1.65" />
      </g>
    </svg>
  );
}

export function BrandLogo({ locale, layout = "horizontal", className = "" }: BrandLogoProps) {
  const wordmark = locale === "ru" ? "BALI · БЛИЖЕ" : "BALI · CLOSER";
  const classes = ["brand-logo", `brand-logo-${layout}`, className].filter(Boolean).join(" ");

  return (
    <span className={classes} aria-hidden="true">
      <SunriseMark />
      {layout === "symbol" ? null : <span className="brand-logo-wordmark">{wordmark}</span>}
    </span>
  );
}
