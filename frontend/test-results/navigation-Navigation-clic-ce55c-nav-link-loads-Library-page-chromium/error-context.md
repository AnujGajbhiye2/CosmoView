# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Navigation >> clicking "Library" nav link loads Library page
- Location: e2e\navigation.spec.ts:18:5

# Error details

```
Error: Console errors on /library: Access to XMLHttpRequest at 'https://cosmoview.onrender.com/api/v1/apod' from origin 'http://localhost:5173' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'https://cosmo-view.vercel.app' that is not equal to the supplied origin.
Failed to load resource: net::ERR_FAILED
Access to XMLHttpRequest at 'https://cosmoview.onrender.com/api/v1/epic/natural/latest' from origin 'http://localhost:5173' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'https://cosmo-view.vercel.app' that is not equal to the supplied origin.
Failed to load resource: net::ERR_FAILED
Access to XMLHttpRequest at 'https://cosmoview.onrender.com/api/v1/asteroids/feed?startDate=2026-04-05&endDate=2026-04-07' from origin 'http://localhost:5173' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'https://cosmo-view.vercel.app' that is not equal to the supplied origin.
Failed to load resource: net::ERR_FAILED
Access to XMLHttpRequest at 'https://cosmoview.onrender.com/api/v1/images/search?q=nebula&page=1&mediaType=image' from origin 'http://localhost:5173' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'https://cosmo-view.vercel.app' that is not equal to the supplied origin.
Failed to load resource: net::ERR_FAILED

expect(received).toHaveLength(expected)

Expected length: 0
Received length: 8
Received array:  ["Access to XMLHttpRequest at 'https://cosmoview.onrender.com/api/v1/apod' from origin 'http://localhost:5173' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'https://cosmo-view.vercel.app' that is not equal to the supplied origin.", "Failed to load resource: net::ERR_FAILED", "Access to XMLHttpRequest at 'https://cosmoview.onrender.com/api/v1/epic/natural/latest' from origin 'http://localhost:5173' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'https://cosmo-view.vercel.app' that is not equal to the supplied origin.", "Failed to load resource: net::ERR_FAILED", "Access to XMLHttpRequest at 'https://cosmoview.onrender.com/api/v1/asteroids/feed?startDate=2026-04-05&endDate=2026-04-07' from origin 'http://localhost:5173' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'https://cosmo-view.vercel.app' that is not equal to the supplied origin.", "Failed to load resource: net::ERR_FAILED", "Access to XMLHttpRequest at 'https://cosmoview.onrender.com/api/v1/images/search?q=nebula&page=1&mediaType=image' from origin 'http://localhost:5173' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'https://cosmo-view.vercel.app' that is not equal to the supplied origin.", "Failed to load resource: net::ERR_FAILED"]
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e4]:
    - banner [ref=e5]:
      - generic [ref=e7]:
        - paragraph [ref=e8]: CosmoView
        - heading "Library" [level=1] [ref=e9]
      - generic [ref=e10]:
        - button "Switch to dark mode" [ref=e12]:
          - generic [ref=e13]: Light
        - navigation [ref=e16]:
          - link "Mission Control" [ref=e17] [cursor=pointer]:
            - /url: /
            - img [ref=e18]
            - text: Mission Control
          - link "APOD" [ref=e23] [cursor=pointer]:
            - /url: /apod
            - img [ref=e24]
            - text: APOD
          - link "Asteroids" [ref=e32] [cursor=pointer]:
            - /url: /asteroids
            - img [ref=e33]
            - text: Asteroids
          - link "Earth" [ref=e39] [cursor=pointer]:
            - /url: /earth
            - img [ref=e40]
            - text: Earth
          - link "Library" [active] [ref=e43] [cursor=pointer]:
            - /url: /library
            - img [ref=e44]
            - text: Library
          - link "Lab" [ref=e46] [cursor=pointer]:
            - /url: /lab
            - img [ref=e47]
            - text: Lab
    - main [ref=e49]:
      - generic [ref=e50]:
        - generic [ref=e51]:
          - paragraph [ref=e52]: Image Library
          - heading "Search NASA's archive and turn image discovery into a guided exploration workflow." [level=2] [ref=e53]
          - paragraph [ref=e54]: This route combines free-form search, archive browsing, result inspection, and a lightweight copilot panel that synthesizes the current search into practical next steps.
        - generic [ref=e56]:
          - generic [ref=e57]:
            - text: Search NASA imagery
            - searchbox "Search NASA imagery" [ref=e58]
          - button "Search archive" [ref=e59]
        - generic [ref=e60]:
          - generic [ref=e61]:
            - img [ref=e62]
            - paragraph [ref=e65]: Archive standby
          - heading "Start with a search term to explore NASA imagery." [level=3] [ref=e66]
          - paragraph [ref=e67]: Search for topics like nebula, moon, saturn, hubble, mars, or apollo to load the archive explorer and inspect matching imagery in detail.
    - contentinfo [ref=e68]:
      - generic [ref=e69]:
        - paragraph [ref=e70]: CosmoView
        - paragraph [ref=e71]:
          - text: Powered by the
          - link "NASA Open APIs" [ref=e72] [cursor=pointer]:
            - /url: https://api.nasa.gov
      - paragraph [ref=e73]: © 2026 CosmoView — built for exploration
  - generic:
    - contentinfo:
      - button "Open TanStack Router Devtools" [ref=e74] [cursor=pointer]:
        - generic [ref=e75]:
          - img [ref=e77]
          - img [ref=e112]
        - generic [ref=e146]: "-"
        - generic [ref=e147]: TanStack Router
  - generic [ref=e148]:
    - img [ref=e150]
    - button "Open Tanstack query devtools" [ref=e198] [cursor=pointer]:
      - img [ref=e199]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const routes = [
  4  |   { path: '/', title: 'Mission Control', navLabel: 'Mission Control' },
  5  |   { path: '/apod', title: 'APOD', navLabel: 'APOD' },
  6  |   { path: '/asteroids', title: 'Asteroids', navLabel: 'Asteroids' },
  7  |   { path: '/earth', title: 'Earth', navLabel: 'Earth' },
  8  |   { path: '/library', title: 'Library', navLabel: 'Library' },
  9  |   { path: '/lab', title: 'Lab', navLabel: 'Lab' },
  10 | ] as const;
  11 | 
  12 | test.describe('Navigation', () => {
  13 |   test.beforeEach(async ({ page }) => {
  14 |     await page.goto('/');
  15 |   });
  16 | 
  17 |   for (const { path, title, navLabel } of routes) {
  18 |     test(`clicking "${navLabel}" nav link loads ${title} page`, async ({ page }) => {
  19 |       const consoleErrors: string[] = [];
  20 |       page.on('console', (msg) => {
  21 |         if (msg.type() === 'error') consoleErrors.push(msg.text());
  22 |       });
  23 | 
  24 |       await page.getByRole('navigation').getByRole('link', { name: navLabel }).click();
  25 | 
  26 |       await expect(page).toHaveURL(path);
  27 |       await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();
  28 | 
  29 |       // CosmoView wordmark is always present
  30 |       await expect(page.getByText('CosmoView').first()).toBeVisible();
  31 | 
  32 |       // Filter out known non-critical noise (React DevTools, 3rd-party extensions)
  33 |       const appErrors = consoleErrors.filter(
  34 |         (e) =>
  35 |           !e.includes('Download the React DevTools') &&
  36 |           !e.includes('chrome-extension') &&
  37 |           !e.includes('favicon')
  38 |       );
> 39 |       expect(appErrors, `Console errors on ${path}: ${appErrors.join('\n')}`).toHaveLength(0);
     |                                                                               ^ Error: Console errors on /library: Access to XMLHttpRequest at 'https://cosmoview.onrender.com/api/v1/apod' from origin 'http://localhost:5173' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'https://cosmo-view.vercel.app' that is not equal to the supplied origin.
  40 |     });
  41 |   }
  42 | 
  43 |   test('navigating directly to each route via URL shows correct title', async ({ page }) => {
  44 |     for (const { path, title } of routes) {
  45 |       await page.goto(path);
  46 |       await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();
  47 |     }
  48 |   });
  49 | 
  50 |   test('all nav links are visible in the header', async ({ page }) => {
  51 |     const nav = page.getByRole('navigation');
  52 |     for (const { navLabel } of routes) {
  53 |       await expect(nav.getByRole('link', { name: navLabel })).toBeVisible();
  54 |     }
  55 |   });
  56 | });
  57 | 
```