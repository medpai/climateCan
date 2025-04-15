/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/climateCan',
  images: {
    unoptimized: true, // Nécessaire pour l'export statique
  },
};

export default nextConfig;
