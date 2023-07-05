const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    baseUrl: "https://www.saucedemo.com/",
    viewportWidth: 1366,
    viewportHeight: 768,
    chromeWebSecurity: false,
    testIsolation: false,
    video: true,
    videosFolder: "cypress/videos",
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      charts: true,
      reportPageTitle: "Saucedemo Cypress Tests",
      inlineAssets: true,
      saveAllAttempts: false,
      ignoreVideos: true,
    },
  },
});
