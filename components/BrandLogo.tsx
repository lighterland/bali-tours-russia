type BrandLogoProps = {
  locale: "ru" | "en";
  layout?: "horizontal" | "stacked" | "symbol";
  className?: string;
};

function SunriseMark() {
  return (
    <svg className="brand-logo-mark" viewBox="0 0 72 58" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 34a15 15 0 0 1 30 0" strokeWidth="2.2" />
        <path d="M12 38c8-3 16-3 24 0s16 3 24 0" strokeWidth="2" />
        <path d="M15 44c7-3 14-3 21 0s14 3 21 0" strokeWidth="1.65" />
        <path d="M36 5v7M23 9l3.5 6M49 9l-3.5 6M14 18l6 3.5M58 18l-6 3.5M10 30h7M62 30h-7" strokeWidth="1.65" />
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
