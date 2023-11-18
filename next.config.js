/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{
    serverActions: true
  },
  reactStrictMode: true,
  images:{
    domains:['fakestoreapi.com', 'i.ibb.co']
  },
}

module.exports = nextConfig