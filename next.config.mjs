/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/to-do-list' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/to-do-list/' : '',
};

export default nextConfig;
