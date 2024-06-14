module.exports = {
  root: true,
  extends: "plugin:@next/next/recommended",
  rules: {
    "@next/next/no-img-element": "off",
    "no-console": "off",
    "prettier/prettier": 0,
  },
  ignorePatterns: [".swc", ".next", "out", "node_modules", "contracts"],
}
