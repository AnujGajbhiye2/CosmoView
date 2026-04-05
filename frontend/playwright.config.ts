import { defineConfig, devices } from '@playwright/test';

/**
 * Base URL can be overridden at runtime:
 *   PLAYWRIGHT_BASE_URL=http://localhost:5173 npx playwright test
 *
 * Default targets the deployed Vercel app.
 *
 * For local testing, also set PLAYWRIGHT_API_URL=http://localhost:3001
 * so the frontend dev server points at your local backend (avoids CORS):
 *   npm run test:e2e:local   (sets both vars automatically)
 */
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'https://cosmo-view.vercel.app';
const API_URL = process.env.PLAYWRIGHT_API_URL ?? 'https://cosmoview.onrender.com';
const isLocal = BASE_URL.includes('localhost');

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  timeout: 40_000,

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  // When testing locally, spin up the Vite dev server pointed at the local
  // backend so CORS headers match. reuseExistingServer lets you keep your
  // own `npm run dev` running and playwright will reuse it if already up.
  webServer: isLocal
    ? {
        command: `cross-env VITE_API_BASE_URL=${API_URL} npx vite --port 5173`,
        url: BASE_URL,
        reuseExistingServer: true,
        timeout: 30_000,
      }
    : undefined,

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
