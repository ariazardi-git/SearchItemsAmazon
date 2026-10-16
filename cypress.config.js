const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
    videosFolder: "cypress/videos",
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true
    },
    // Pindahkan baseUrl ke sini (bawaan standar Cypress)
    baseUrl: "https://amazon.com",
    setupNodeEvents(on, config) {
      // node event listeners
    },
  },
  // Hapus blok env jika kosong
});
