import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.api-sports.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media-1.api-sports.io",
        port: "",
        pathname: "/formula-1/**",
      },
    ],
  },
};

export default nextConfig;
