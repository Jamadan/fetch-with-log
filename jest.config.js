module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx}", "!**/index.test.{js,jsx}"],
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text-summary"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  setupFilesAfterEnv: ["<rootDir>/test-setup.js"],
  testMatch: ["<rootDir>/packages/**/*.test.*"],
  transformIgnorePatterns: ["/lib/", "/node_modules/"]
};
