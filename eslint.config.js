import js from "@eslint/js";

export default [
  {
    ignores: ["node_modules/**"],
  },

  js.configs.recommended,

  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      // 👉 ГЛАВНОЕ: включаем браузерную среду
      globals: {
        document: "readonly",
        window: "readonly",
        console: "readonly",
        alert: "readonly",
      },
    },

    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
];
