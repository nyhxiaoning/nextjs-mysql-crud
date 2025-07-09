// next.config.js
const nextConfig = {
  webpack(config, options) {
    config.externals.push("supports-color"); // 避免打包 ESM-only 模块
    return config;
  },
};

module.exports = nextConfig;
