import { test, expect } from '@playwright/test';
import type { ApiSuccessResponse, AsteroidFeedDto } from '../src/types/api';

const mockAsteroidFeed: ApiSuccessResponse<AsteroidFeedDto> = {
  data: {
    range: { startDate: '2026-04-03', endDate: '2026-04-05' },
    counts: { total: 3 },
    asteroids: [
      {
        id: '54321',
        name: '(2010 XK1)',
        hazardous: false,
        diameterKmMin: 0.09,
        diameterKmMax: 0.21,
        closeApproachDate: '2026-04-03',
        missDistanceKm: 4_800_000,
        velocityKph: 48_000,
      },
      {
        id: '12345',
        name: '(2021 RG5)',
        hazardous: true,
        diameterKmMin: 0.18,
        diameterKmMax: 0.41,
        closeApproachDate: '2026-04-04',
        missDistanceKm: 1_200_000,
        velocityKph: 72_000,
      },
      {
        id: '99999',
        name: '(2023 AZ)',
        hazardous: false,
        diameterKmMin: 0.05,
        diameterKmMax: 0.11,
        closeApproachDate: '2026-04-05',
        missDistanceKm: 7_500_000,
        velocityKph: 35_000,
      },
    ],
  },
  meta: { requestId: 'test-asteroids', cached: false },
};

test.describe('Asteroids page', () => {
  test('page loads with correct header title', async ({ page }) => {
    await page.goto('/asteroids');
    await expect(page.getByRole('heading', { level: 1, name: 'Asteroids' })).toBeVisible();
  });

  test('section heading and description are visible', async ({ page }) => {
    await page.goto('/asteroids');
    await expect(page.getByText('Asteroid Analytics')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: /Inspect velocity, scale, and risk/ })
    ).toBeVisible();
  });

  test('start and end date navigation controls are present', async ({ page }) => {
    await page.goto('/asteroids');

    await expect(page.getByText('Start date')).toBeVisible();
    await expect(page.getByText('End date')).toBeVisible();
    await expect(page.getByRole('button', { name: /Start date:/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /End date:/ })).toBeVisible();
  });

  test('informs user of the 7-day range constraint', async ({ page }) => {
    await page.goto('/asteroids');
    await expect(
      page.getByText("Range is clamped to NASA's 7-day feed limit.")
    ).toBeVisible();
  });

  test('date range is automatically clamped to 7 days', async ({ page }) => {
    await page.goto('/asteroids');

    // The end date button displays in DD-MM-YYYY format
    const startBtn = page.getByRole('button', { name: /Start date:/ });
    const endBtn = page.getByRole('button', { name: /End date:/ });

    const startAriaLabel = await startBtn.getAttribute('aria-label');
    const endAriaLabel = await endBtn.getAttribute('aria-label');

    // Extract ISO dates from "Start date: YYYY-MM-DD"
    const startIso = startAriaLabel?.replace('Start date: ', '') ?? '';
    const endIso = endAriaLabel?.replace('End date: ', '') ?? '';

    const startMs = new Date(`${startIso}T00:00:00Z`).getTime();
    const endMs = new Date(`${endIso}T00:00:00Z`).getTime();
    const diffDays = Math.floor((endMs - startMs) / 86_400_000);

    expect(diffDays).toBeLessThanOrEqual(6);
  });

  test('velocity bar chart renders after data loads', async ({ page }) => {
    await page.route('**/api/v1/asteroids**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockAsteroidFeed),
      })
    );

    await page.goto('/asteroids');

    // Chart section heading
    await expect(page.getByText('Velocity profile')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 3, name: 'Relative speed across the watch window' })
    ).toBeVisible();

    // Recharts renders an SVG
    await expect(page.locator('.recharts-wrapper').first()).toBeVisible();
  });

  test('risk matrix scatter chart renders', async ({ page }) => {
    await page.route('**/api/v1/asteroids**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockAsteroidFeed),
      })
    );

    await page.goto('/asteroids');

    await expect(page.getByText('Risk matrix')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 3, name: 'Size vs. miss distance' })
    ).toBeVisible();

    await expect(page.locator('.recharts-wrapper').nth(1)).toBeVisible();
  });

  test('inspection table renders asteroid rows', async ({ page }) => {
    await page.route('**/api/v1/asteroids**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockAsteroidFeed),
      })
    );

    await page.goto('/asteroids');

    await expect(page.getByText('Inspection table')).toBeVisible();

    // Table rows — asteroid names
    await expect(page.getByRole('cell', { name: '(2010 XK1)' })).toBeVisible();
    await expect(page.getByRole('cell', { name: '(2021 RG5)' })).toBeVisible();
    await expect(page.getByRole('cell', { name: '(2023 AZ)' })).toBeVisible();
  });

  test('summary metric cards render tracked and hazardous counts', async ({ page }) => {
    await page.route('**/api/v1/asteroids**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockAsteroidFeed),
      })
    );

    await page.goto('/asteroids');

    await expect(page.getByText('Tracked objects')).toBeVisible();
    await expect(page.getByText('Hazardous objects', { exact: true }).first()).toBeVisible();

    // Total count from mock
    await expect(page.getByText('3', { exact: true }).first()).toBeVisible();
    // Hazardous count (1 in mock)
    await expect(page.getByText('1', { exact: true }).first()).toBeVisible();
  });
});
