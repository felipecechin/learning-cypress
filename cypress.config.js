const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners 
    },
    defaultCommandTimeout: 4000,
    baseUrl: "https://barrigarest.wcaquino.me",
  },
});
