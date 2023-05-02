import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "xp9jdr",

  component: {
    setupNodeEvents(on, config) {},
    specPattern: "src/**/*.cypress.{ts,tsx}",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
