import Image from "next/image";
import sunriseMarkGold from "../public/brand/sunrise-mark-gold.png";

type BrandLogoProps = {
  locale: "ru" | "en";
  layout?: "horizontal" | "stacked" | "symbol";
  className?: string;
};

function SunriseMark() {
  return (
    <Image
      className="brand-logo-mark"
      src={sunriseMarkGold}
      alt=""
      aria-hidden="true"
      unoptimized
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
