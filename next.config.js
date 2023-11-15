module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DATABASE_CLUSTER: process.env.DATABASE_CLUSTER,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  },
};
