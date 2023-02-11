module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  collectCoverage: true,
  maxWorkers: "50%",
  transform: {
    "^.+\\.(ts|tsx)$": [
      "@swc/jest",
      {
        jsc: {
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
  // this config is to swc jest can parse path alias in tsconfig
  // $1 means = the first capturing group
  // $2 means = the second, etc
  // so basically we match to any path after @/, put in a group and we will refeer to the root/$1, this $1 it's the path that we catch in the group (.*)
  // good to know this, i need to study more regular expressions hehe.
  moduleNameMapper: {
    "@/(.*)": ["<rootDir>/src/$1"],
  },
};
