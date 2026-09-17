import type { NextConfig } from "next";

// Set only once the intended GitHub Pages URL is confirmed.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
if (basePath && (!basePath.startsWith("/") || basePath.endsWith("/"))) {
  throw new Error(
    "NEXT_PUBLIC_BASE_PATH must begin with / and have no trailing slash.",
  );
}
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  poweredByHeader: false,
};
export default config;
