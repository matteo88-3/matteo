/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Keep if you want unoptimized images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "alhea-2.vercel.app",
      },
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
      },
      {
        protocol: "https",
        hostname: "bk.rw",
      },
    ],
  },
};

export default nextConfig;
