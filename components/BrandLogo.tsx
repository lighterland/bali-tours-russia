type BrandLogoProps = {
  locale: "ru" | "en";
  layout?: "horizontal" | "stacked" | "symbol";
  className?: string;
};

function SunriseMark() {
  const markUrl = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/brand/sunrise-mark-gold.png`;

  return (
    <span
      className="brand-logo-mark"
      aria-hidden="true"
      style={{ maskImage: `url(${markUrl})`, WebkitMaskImage: `url(${markUrl})` }}
    />
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
