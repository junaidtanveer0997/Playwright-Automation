// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({                        // config is JS object with key-value pairs (for playwright configuration)
  testDir: './tests',         // specify the folder where the test files are located
  timeout: 30 * 1000,
  expect: {
    timeout: 5000                     // maximum time expect should wait for the condition to be met
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',          // specify the browser to run tests on (chromium, firefox, webkit)
    headless: false,                    // run tests in headless mode (without UI)
    screenshot: 'on',                 // take screenshot of every test step
    trace: 'retain-on-failure',       // trace is used for keeping log / trace of actions performed during the test (on, off, retain-on-failure)
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },

});

module.exports = config;     // export the configuration object (so that Playwright can use it)

// https://trace.playwright.dev/ (used for viewing trace files generated during test execution)