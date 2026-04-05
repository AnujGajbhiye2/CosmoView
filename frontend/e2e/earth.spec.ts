import { test, expect } from '@playwright/test';
import type { ApiSuccessResponse, EpicImageDto } from '../src/types/api';

const mockEpicImages: ApiSuccessResponse<EpicImageDto[]> = {
  data: [
    {
      identifier: 'epic_1b_20240115001001',
      caption: 'Earth from L1 natural color frame 1',
      image: 'epic_1b_20240115001001',
      date: '2024-01-15 00:10:01',
      centroidCoordinates: { lat: 1.23, lon: -45.67 },
      archiveUrl:
        'https://epic.gsfc.nasa.gov/archive/natural/2024/01/15/png/epic_1b_20240115001001.png',
    },
    {
      identifier: 'epic_1b_20240115002001',
      caption: 'Earth from L1 natural color frame 2',
      image: 'epic_1b_20240115002001',
      date: '2024-01-15 01:48:01',
      centroidCoordinates: { lat: 1.45, lon: -50.12 },
      archiveUrl:
        'https://epic.gsfc.nasa.gov/archive/natural/2024/01/15/png/epic_1b_20240115002001.png',
    },
  ],
  meta: { requestId: 'test-epic', cached: false },
};

const mockEmptyEpic: ApiSuccessResponse<EpicImageDto[]> = {
  data: [],
  meta: { requestId: 'test-epic-empty', cached: false },
};

test.describe('Earth page', () => {
  test('page loads with correct header title', async ({ page }) => {
    await page.goto('/earth');
    await expect(page.getByRole('heading', { level: 1, name: 'Earth' })).toBeVisible();
  });

  test('section heading and description are visible', async ({ page }) => {
    await page.goto('/earth');
    await expect(page.getByText('Earth Observation')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: /Browse EPIC.s daily record/ })
    ).toBeVisible();
  });

  test('date navigation control is present with Previous and Next buttons', async ({ page }) => {
    await page.goto('/earth');

    await expect(page.getByText('Select EPIC date')).toBeVisible();
    await expect(page.getByRole('button', { name: /Select EPIC date:/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
  });

  test('EPIC imagery loads and displays image list', async ({ page }) => {
    await page.route('**/api/v1/epic**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockEpicImages),
      })
    );

    await page.goto('/earth');

    // Section labels
    await expect(page.getByText('EPIC natural imagery')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: /Earth on / })
    ).toBeVisible();

    // Image identifier buttons in the list panel
    await expect(
      page.getByRole('button', { name: 'epic_1b_20240115001001' })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'epic_1b_20240115002001' })
    ).toBeVisible();
  });

  test('clicking an image identifier updates the selected frame detail', async ({ page }) => {
    await page.route('**/api/v1/epic**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockEpicImages),
      })
    );

    await page.goto('/earth');

    // Wait for both buttons to be visible
    await expect(
      page.getByRole('button', { name: 'epic_1b_20240115001001' })
    ).toBeVisible();

    // Initial selected frame detail shows first identifier
    await expect(
      page.getByRole('heading', { level: 3, name: 'epic_1b_20240115001001' })
    ).toBeVisible();

    // Click the second image in the list
    await page.getByRole('button', { name: 'epic_1b_20240115002001' }).click();

    // Detail panel should now show the second frame
    await expect(
      page.getByRole('heading', { level: 3, name: 'epic_1b_20240115002001' })
    ).toBeVisible();

    // Earth image <img> should be visible
    await expect(page.getByRole('img', { name: /Earth from L1 natural color frame 2/ })).toBeVisible();
  });

  test('selected frame shows centroid coordinates', async ({ page }) => {
    await page.route('**/api/v1/epic**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockEpicImages),
      })
    );

    await page.goto('/earth');

    await expect(page.getByText('Centroid')).toBeVisible();
    await expect(page.getByText('1.23, -45.67')).toBeVisible();
  });

  test('shows empty state message when no imagery is available for the date', async ({
    page,
  }) => {
    await page.route('**/api/v1/epic**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockEmptyEpic),
      })
    );

    await page.goto('/earth');

    await expect(
      page.getByRole('heading', { level: 2, name: /No EPIC imagery is currently available/ })
    ).toBeVisible();
    await expect(page.getByText(/Try a nearby date/)).toBeVisible();
  });
});
