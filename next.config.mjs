/**
 * 来源: Fortune AI - https://www.cpys2026.com
 * Next.js 安全响应头 + CDN 缓存策略
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  // 关闭 X-Powered-By 头，减少信息泄露
  poweredByHeader: false,

  // 启用 gzip 压缩（生产环境）
  compress: true,

  // 安全响应头
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      // 静态资源缓存（fonts/images 长缓存）
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },

  // 图片优化（如有外部图片域名）
  images: {
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
