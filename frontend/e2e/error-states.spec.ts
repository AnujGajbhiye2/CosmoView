import { test, expect } from '@playwright/test';

/**
 * Intercepts all requests matching the pattern and returns a 500 response.
 * React Query will retry once (retry: 1 in QueryClient config) before
 * surfacing the error to the ErrorBoundary — allow up to 20s for this.
 */
async function rejectRoute(page: import('@playwright/test').Page, pattern: string) {
  await page.route(pattern, (route) =>
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: { code: 'UPSTREAM_ERROR', message: 'Simulated failure' } }),
    })
  );
}

const ERROR_TIMEOUT = 20_000;

test.describe('Error states — data-fetching pages', () => {
  test('APOD shows error message and Retry button when API fails', async ({ page }) => {
    await rejectRoute(page, '**/api/v1/apod**');
    await page.goto('/apod');

    await expect(page.getByText('APOD unavailable')).toBeVisible({ timeout: ERROR_TIMEOUT });
    await expect(page.getByText(/could not be loaded/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible();
  });

  test('Asteroids shows error message and Retry button when API fails', async ({ page }) => {
    await rejectRoute(page, '**/api/v1/asteroids**');
    await page.goto('/asteroids');

    await expect(page.getByText('Asteroid feed unavailable')).toBeVisible({
      timeout: ERROR_TIMEOUT,
    });
    await expect(page.getByText(/could not be loaded/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible();
  });

  test('Earth shows error message and Retry button when EPIC API fails', async ({ page }) => {
    await rejectRoute(page, '**/api/v1/epic**');
    await page.goto('/earth');

    await expect(page.getByText('EPIC unavailable')).toBeVisible({ timeout: ERROR_TIMEOUT });
    await expect(page.getByText(/EPIC feed could not be loaded/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible();
  });

  test('Library shows error message and Retry button when images API fails', async ({ page }) => {
    await rejectRoute(page, '**/api/v1/images**');
    await page.goto('/library');

    // Trigger a search so the error boundary activates
    await page.getByRole('searchbox').fill('nebula');
    await page.getByRole('button', { name: 'Search archive' }).click();

    await expect(page.getByText('Archive unavailable')).toBeVisible({ timeout: ERROR_TIMEOUT });
    await expect(page.getByText(/library request failed/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible();
  });

  test('APOD Retry button re-triggers the query', async ({ page }) => {
    let callCount = 0;
    await page.route('**/api/v1/apod**', (route) => {
      callCount++;
      // Fail on the first two sets of attempts (initial + retry), succeed on retry click
      if (callCount <= 2) {
        return route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: { code: 'UPSTREAM_ERROR', message: 'Simulated' } }),
        });
      }
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            title: 'Recovered APOD',
            date: '2024-01-15',
            mediaType: 'image',
            explanation: 'Recovered after retry.',
            imageUrl: 'https://apod.nasa.gov/apod/image/recovered.jpg',
            hdImageUrl: null,
            copyright: null,
          },
          meta: { requestId: 'retry', cached: false },
        }),
      });
    });

    await page.goto('/apod');

    // Wait for error state
    await expect(page.getByText('APOD unavailable')).toBeVisible({ timeout: ERROR_TIMEOUT });

    // Click Retry — should recover
    await page.getByRole('button', { name: 'Retry' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Recovered APOD' })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('error panels do not show skeleton loaders', async ({ page }) => {
    await rejectRoute(page, '**/api/v1/apod**');
    await page.goto('/apod');

    await expect(page.getByText('APOD unavailable')).toBeVisible({ timeout: ERROR_TIMEOUT });

    // Skeleton should not be visible once the error state is shown
    await expect(page.getByText('Loading transmission')).not.toBeVisible();
  });
});
