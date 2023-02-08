module.exports = {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  collectCoverage: true,
  transform: {
    "^.+\\.(ts|tsx)$": [
      "@swc/jest",
      {
        sourceMaps: true,
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
            decorators: false,
            dynamicImport: false,
          },
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
};
