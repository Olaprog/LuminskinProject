const { defineConfig } = require("cypress");
const webpack = require("@cypress/webpack-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    webpack({
      webpackOptions: {
        resolve: {
          extensions: [".ts", ".js"],
        },
        module: {
          rules: [
            {
              test: /\.feature$/,
              use: [
                {
                  loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                  options: config,
                },
              ],
            },
          ],
        },
      },
    })
  );

  return config;
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://shop.luminskin.com/products?category=hair-and-body',
    "viewportWidth": 1360,
    "viewportHeight": 790,
    "video": true,
    "pageLoadTimeout": 1000000,
    "theme": "halloween",
    "darkMediaQuery": false,
    "projectId": "6b42c7",
    "chromeWebSecurity": false,
    specPattern: "**/*.feature",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents,
  },
});