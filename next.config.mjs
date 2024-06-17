/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'media.valorant-api.com',
            port: '',
            pathname: '/weaponskins/**',
          },
        ],
      },
};


export default nextConfig;
