module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  setupFiles: ["<rootDir>/setupTests.js"],
  testMatch: ["**/*.spec.[jt]s?(x)"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{js,ts,vue}",
    "!<rootDit>/src/**/*.{snap}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/*.mock.js",
    "!<rootDir>/src/mock.js",
    "!<rootDir>/src/main.ts",
    "!<rootDir>/src/App.vue",
    "!<rootDir>/src/plugins/**"
  ],
  resetMocks: true
}
