/**
 * Jest configuration for ESM (ECMAScript Modules) support.
 * This allows you to use `import`/`export` syntax in both your source and test files.
 *
 * Requirements:
 * - Node.js 16+
 * - "type": "module" in your package.json
 *
 * Usage:
 *   - Place this file at the root of your project.
 *   - Use `import`/`export` in your JS files and tests.
 */

export default {
  // Treat .js files as ESM
  extensionsToTreatAsEsm: [".js"],

  // No transform needed for pure ESM, unless you use JSX/TypeScript
  transform: {},

  // Node test environment
  testEnvironment: "node",

  // Optional: Recognize .js files as modules for imports
  moduleFileExtensions: ["js", "json", "node"],

  // Optional: If you want to ignore node_modules except for specific ESM packages
  transformIgnorePatterns: [
    "/node_modules/"
  ]
};
