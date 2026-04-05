import { test, expect } from '@playwright/test';

const routes = [
  { path: '/', title: 'Mission Control', navLabel: 'Mission Control' },
  { path: '/apod', title: 'APOD', navLabel: 'APOD' },
  { path: '/asteroids', title: 'Asteroids', navLabel: 'Asteroids' },
  { path: '/earth', title: 'Earth', navLabel: 'Earth' },
  { path: '/library', title: 'Library', navLabel: 'Library' },
  { path: '/lab', title: 'Lab', navLabel: 'Lab' },
] as const;

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Mock all API calls to avoid CORS errors when running against localhost
    await page.route('**/api/v1/**', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: '{"data":null,"meta":{}}' })
    );
    await page.goto('/');
  });

  for (const { path, title, navLabel } of routes) {
    test(`clicking "${navLabel}" nav link loads ${title} page`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      await page.getByRole('navigation').getByRole('link', { name: navLabel }).click();

      await expect(page).toHaveURL(path);
      await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();

      // CosmoView wordmark is always present
      await expect(page.getByText('CosmoView').first()).toBeVisible();

      // Filter out known non-critical noise (React DevTools, 3rd-party extensions)
      const appErrors = consoleErrors.filter(
        (e) =>
          !e.includes('Download the React DevTools') &&
          !e.includes('chrome-extension') &&
          !e.includes('favicon')
      );
      expect(appErrors, `Console errors on ${path}: ${appErrors.join('\n')}`).toHaveLength(0);
    });
  }

  test('navigating directly to each route via URL shows correct title', async ({ page }) => {
    for (const { path, title } of routes) {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();
    }
  });

  test('all nav links are visible in the header', async ({ page }) => {
    const nav = page.getByRole('navigation');
    for (const { navLabel } of routes) {
      await expect(nav.getByRole('link', { name: navLabel })).toBeVisible();
    }
  });
});
