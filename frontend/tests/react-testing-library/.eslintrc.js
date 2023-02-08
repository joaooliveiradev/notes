module.exports = {
  extends: ["plugin:testing-library/react", "plugin:jest-dom/recommended"],
  plugins: ["testing-library", "jest-dom"],
  "extends": [
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "airbnb",
    "prettier"
  ],
  rules: {
    "testing-library/await-async-query": "error",
    "testing-library/no-await-sync-query": "error",
    "testing-library/no-debugging-utils": "warn",
    "testing-library/no-dom-import": "off",
    "testing-library/no-render-in-setup": "error",
    "testing-library/no-wait-for-empty-callback": "error",
    "testing-library/prefer-explicit-assert": "error",
    "testing-library/prefer-presence-queries": "error",
    "testing-library/prefer-screen-queries": "error",
    "testing-library/prefer-wait-for": "error",
    "jest-dom/prefer-checked": "error",
    "jest-dom/prefer-enabled-disabled": "error",
    "jest-dom/prefer-required": "error",
    "jest-dom/prefer-to-have-attribute": "error",
    "import/no-extraneous-dependencies": "off",
  },
};
