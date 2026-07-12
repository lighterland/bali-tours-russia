import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isGitHubPages
    ? {
        output: "export",
        basePath: "/bali-tours-russia",
        assetPrefix: "/bali-tours-russia/",
        trailingSlash: true,
        images: { unoptimized: true },
        env: { NEXT_PUBLIC_STATIC_EXPORT: "true" },
      }
    : {}),
};

export default nextConfig;
