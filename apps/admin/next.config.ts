import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  transpilePackages: ["@workspace/ui", "@workspace/db"],
  serverExternalPackages: ["@prisma/client"],
}

export default nextConfig
