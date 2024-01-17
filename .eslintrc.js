module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  overrides: [
    // {
    //     "env": {
    //         "node": true
    //     },
    //     "files": [
    //         ".eslintrc.{js,cjs}"
    //     ],
    //     "parserOptions": {
    //         "sourceType": "script"
    //     }
    // }
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021, // or your desired ECMAScript version
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    // "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { args: "none", ignoreRestSiblings: false }
    ]
    // "json/quote-props": ["error", "always"],
  }
};
