/** @type {import('next').NextConfig} */
const NextConfig = {
  images: {
    domains: ["media.valorant-api.com"],
  },
  env: {
    API_KEY_ENV: process.env.API_KEY, 
  },
}

export default NextConfig
