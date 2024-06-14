module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  rules: {
    "@next/next/no-img-element": "off",
    "no-console": "off",
    "prettier/prettier": 0,
  },
  ignorePatterns: [".swc", ".next", "out", "node_modules", "contracts"],
}
