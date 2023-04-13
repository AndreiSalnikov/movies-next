/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.nomoreparties.co',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.nomoreparties.co',
        port: '',
        pathname: '//uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
