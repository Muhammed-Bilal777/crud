"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  clearMocks: true,
};

exports.default = config;
