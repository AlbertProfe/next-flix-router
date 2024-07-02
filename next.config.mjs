/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["m.media-amazon.com", "via.placeholder.com"],
  },
  experimental: {
    serverComponentsExternalPackages: ["jsonwebtoken"],
  },
};

export default nextConfig;
