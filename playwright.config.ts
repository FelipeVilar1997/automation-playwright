import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  globalSetup: './tests/setup/global.setup.ts',

  fullyParallel: true,

  forbidOnly: !! process.env.CI,
 
  retries: process.env.CI ? 2 : 0,
  
  workers: process.env.CI ? 1 : undefined,
  
  reporter: process.env.CI
    ? [
      ['github'],
      ['list', { printSteps: true }],
      ['html', { open: 'never '}]
    ]
    : [
      ['list', { printSteps: true }],
      ['html', { open: 'never' }],
    ],
  
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',

    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
             storageState: 'playwright/.auth/admin.json',
       },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
