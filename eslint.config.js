import custom from "./lint/index.js";

export default [
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      custom,
    },
    rules: {
      "custom/no-console-log": "error",
      "custom/enforce-test-cases": "error",
    },
  },
];
