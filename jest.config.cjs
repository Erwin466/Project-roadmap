module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "json", "node"],
  transformIgnorePatterns: ["/node_modules/"],
};
