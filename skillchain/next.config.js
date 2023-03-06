/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  env: {
      INFURA_ID: process.env.INFURA_ID,
      IPFS_ID: process.env.IPFS_ID,
      IPFS_KEY: process.env.IPFS_KEY,
      MUMBAI_INFURA: process.env.MUMBAI_INFURA,
  },
}