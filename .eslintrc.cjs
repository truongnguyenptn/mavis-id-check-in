module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  rules: {
    "@next/next/no-img-element": "off",
    "no-console": "off",
    "prettier/prettier": 0,
  },
  ignorePatterns: [".swc", ".next", "out", "node_modules", "contracts"],
}
