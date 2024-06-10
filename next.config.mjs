/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.graphassets.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ca-central-1.graphassets.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flowbite.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
