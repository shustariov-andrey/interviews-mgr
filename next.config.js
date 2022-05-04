/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
        'tailwindui.com',
        'images.unsplash.com',
        'avatars.githubusercontent.com',
        'lh3.googleusercontent.com'
    ]
  }
}

module.exports = nextConfig
