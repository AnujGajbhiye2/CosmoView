import { test, expect } from '@playwright/test';
import type { ApiSuccessResponse, ApodDto } from '../src/types/api';

const mockApodResponse: ApiSuccessResponse<ApodDto> = {
  data: {
    title: 'Orion Nebula Deep Field',
    date: '2024-01-15',
    mediaType: 'image',
    explanation:
      'The Orion Nebula is one of the most scrutinised and photographed objects in the night sky. It is among the closest stellar nurseries to Earth.',
    imageUrl: 'https://apod.nasa.gov/apod/image/2401/orion_mock.jpg',
    hdImageUrl: 'https://apod.nasa.gov/apod/image/2401/orion_mock_hd.jpg',
    copyright: null,
  },
  meta: { requestId: 'test-apod', cached: false },
};

const mockApodResponseAlt: ApiSuccessResponse<ApodDto> = {
  data: {
    title: 'Milky Way Rising',
    date: '2024-01-14',
    mediaType: 'image',
    explanation: 'Our galaxy rises above the horizon in this wide-angle view.',
    imageUrl: 'https://apod.nasa.gov/apod/image/2401/milkyway_mock.jpg',
    hdImageUrl: null,
    copyright: 'Test Photographer',
  },
  meta: { requestId: 'test-apod-alt', cached: false },
};

test.describe('APOD page', () => {
  test('page loads with correct header title', async ({ page }) => {
    await page.goto('/apod');
    await expect(page.getByRole('heading', { level: 1, name: 'APOD' })).toBeVisible();
  });

  test('section heading and description are visible', async ({ page }) => {
    await page.goto('/apod');
    await expect(page.getByText('APOD Explorer')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: /Navigate NASA.s daily astronomy/ })
    ).toBeVisible();
  });

  test('date navigation control is present', async ({ page }) => {
    await page.goto('/apod');
    await expect(page.getByText('Select APOD date')).toBeVisible();
    await expect(page.getByRole('button', { name: /Select APOD date:/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
  });

  test('shows APOD image and metadata after data loads', async ({ page }) => {
    await page.route('**/api/v1/apod**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockApodResponse),
      })
    );

    await page.goto('/apod');

    // Wait for content to render
    await expect(
      page.getByRole('heading', { level: 2, name: 'Orion Nebula Deep Field' })
    ).toBeVisible();

    // Image should be present
    await expect(page.getByRole('img', { name: 'Orion Nebula Deep Field' })).toBeVisible();

    // Explanation text should be visible
    await expect(page.getByText(/stellar nurseries to Earth/)).toBeVisible();

    // Metadata fields
    await expect(page.getByText('2024-01-15')).toBeVisible();
    await expect(page.getByText('image')).toBeVisible();
    await expect(page.getByText('NASA / Public domain')).toBeVisible();
  });

  test('Previous button shifts date back and triggers content reload', async ({ page }) => {
    let callCount = 0;

    await page.route('**/api/v1/apod**', (route) => {
      callCount++;
      const response = callCount === 1 ? mockApodResponse : mockApodResponseAlt;
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(response),
      });
    });

    await page.goto('/apod');

    // Wait for initial content
    await expect(
      page.getByRole('heading', { level: 2, name: 'Orion Nebula Deep Field' })
    ).toBeVisible();

    const dateButton = page.getByRole('button', { name: /Select APOD date:/ });
    const dateBefore = await dateButton.textContent();

    // Click Previous
    await page.getByRole('button', { name: 'Previous' }).click();

    // Date display should change
    await expect(dateButton).not.toHaveText(dateBefore ?? '');

    // New content should load
    await expect(
      page.getByRole('heading', { level: 2, name: 'Milky Way Rising' })
    ).toBeVisible();
  });

  test('date picker calendar opens on button click and closes on day selection', async ({
    page,
  }) => {
    await page.route('**/api/v1/apod**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockApodResponse),
      })
    );

    await page.goto('/apod');

    const dateButton = page.getByRole('button', { name: /Select APOD date:/ });

    // Calendar should be closed initially
    const calendarDialog = page.getByRole('dialog', { name: /Select APOD date calendar/ });
    await expect(calendarDialog).not.toBeVisible();

    // Open calendar
    await dateButton.click();
    await expect(calendarDialog).toBeVisible();

    // Click the first enabled day button inside the calendar
    const enabledDay = calendarDialog
      .locator('td button:not([disabled])')
      .first();
    await enabledDay.click();

    // Calendar should close after selection
    await expect(calendarDialog).not.toBeVisible();
  });

  test('Read more / Show less toggle expands explanation text', async ({ page }) => {
    await page.route('**/api/v1/apod**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockApodResponse),
      })
    );

    await page.goto('/apod');
    await expect(page.getByRole('heading', { level: 2, name: 'Orion Nebula Deep Field' })).toBeVisible();

    const readMoreBtn = page.getByRole('button', { name: 'Read more' });
    await expect(readMoreBtn).toBeVisible();
    await readMoreBtn.click();

    await expect(page.getByRole('button', { name: 'Show less' })).toBeVisible();
  });
});
