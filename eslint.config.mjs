// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    ignores: ["dist"], // ignore build folder
  },
  {
    files: ["**/*.{js,jsx}"], // lint JS + JSX files
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser, // so window, document etc. are recognized
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules, // base JS rules
      ...react.configs.recommended.rules, // React recommended
      ...reactHooks.configs.recommended.rules, // React hooks rules
      "react/react-in-jsx-scope": "off", // not needed in React 17+
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
    settings: {
      react: {
        version: "detect", // auto-detects your React version
      },
    },
  },
];

