const bundleAnalyzer = require("@next/bundle-analyzer")

const withBundleAnalyzer = bundleAnalyzer({
  enabled: false,
})

module.exports = withBundleAnalyzer({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox; style-src 'none",
  },
  transpilePackages: ["@roninnetwork/walletgo"],
})
