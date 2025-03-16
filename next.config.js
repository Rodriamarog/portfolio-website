/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Since GitHub Pages will serve from /portfolio-website
  basePath: '/portfolio-website',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 