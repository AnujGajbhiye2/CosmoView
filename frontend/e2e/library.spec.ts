import { test, expect } from '@playwright/test';
import type { ApiSuccessResponse, ImageSearchDto } from '../src/types/api';

const mockSearchResults: ApiSuccessResponse<ImageSearchDto> = {
  data: {
    items: [
      {
        nasaId: 'GSFC_20171208_Archive_e000699',
        title: 'Orion Nebula',
        description: 'A stunning view of the Orion Nebula captured by the Hubble Space Telescope.',
        mediaType: 'image',
        dateCreated: '2017-12-08T00:00:00Z',
        previewImageUrl:
          'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000699/GSFC_20171208_Archive_e000699~thumb.jpg',
        originalImageUrl:
          'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000699/GSFC_20171208_Archive_e000699~orig.jpg',
      },
      {
        nasaId: 'GSFC_20171208_Archive_e000700',
        title: 'Orion Nebula Wide Field',
        description: 'Wide field view showing the full extent of the Orion Molecular Cloud.',
        mediaType: 'image',
        dateCreated: '2017-12-08T00:00:00Z',
        previewImageUrl:
          'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000700/GSFC_20171208_Archive_e000700~thumb.jpg',
        originalImageUrl: null,
      },
    ],
    page: 1,
    pageSize: 20,
    totalHits: 1247,
    hasNextPage: true,
  },
  meta: { requestId: 'test-library', cached: false },
};

const mockNoResults: ApiSuccessResponse<ImageSearchDto> = {
  data: {
    items: [],
    page: 1,
    pageSize: 0,
    totalHits: 0,
    hasNextPage: false,
  },
  meta: { requestId: 'test-library-empty', cached: false },
};

test.describe('Library page', () => {
  test('page loads with correct header title', async ({ page }) => {
    await page.goto('/library');
    await expect(page.getByRole('heading', { level: 1, name: 'Library' })).toBeVisible();
  });

  test('section heading and description are visible', async ({ page }) => {
    await page.goto('/library');
    await expect(page.getByText('Image Library')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: /Search NASA.s archive/ })
    ).toBeVisible();
  });

  test('search input and button are present', async ({ page }) => {
    await page.goto('/library');

    const searchInput = page.getByRole('searchbox');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('placeholder', 'nebula, moon, saturn, hubble...');

    await expect(page.getByRole('button', { name: 'Search archive' })).toBeVisible();
  });

  test('shows archive standby message before a search is entered', async ({ page }) => {
    await page.goto('/library');
    await expect(page.getByText('Archive standby')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 3, name: 'Start with a search term to explore NASA imagery.' })
    ).toBeVisible();
  });

  test('typing a query and clicking Search archive returns image cards with titles', async ({
    page,
  }) => {
    await page.route('**/api/v1/images**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockSearchResults),
      })
    );

    await page.goto('/library');

    const searchInput = page.getByRole('searchbox');
    await searchInput.fill('nebula');
    await page.getByRole('button', { name: 'Search archive' }).click();

    // Result count heading
    await expect(page.getByRole('heading', { level: 3, name: /images for "nebula"/ })).toBeVisible();

    // Image card titles
    await expect(page.getByRole('heading', { level: 4, name: 'Orion Nebula' })).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 4, name: 'Orion Nebula Wide Field' })
    ).toBeVisible();
  });

  test('debounced search triggers query after typing', async ({ page }) => {
    await page.route('**/api/v1/images**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockSearchResults),
      })
    );

    await page.goto('/library');

    await page.getByRole('searchbox').fill('nebula');

    // Wait for debounce (350 ms) to fire
    await expect(
      page.getByRole('heading', { level: 3, name: /images for "nebula"/ })
    ).toBeVisible({ timeout: 5_000 });
  });

  test('pressing Enter commits the search immediately', async ({ page }) => {
    await page.route('**/api/v1/images**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockSearchResults),
      })
    );

    await page.goto('/library');

    const searchInput = page.getByRole('searchbox');
    await searchInput.fill('nebula');
    await searchInput.press('Enter');

    await expect(
      page.getByRole('heading', { level: 3, name: /images for "nebula"/ })
    ).toBeVisible();
  });

  test('clicking a result card shows selected image detail', async ({ page }) => {
    await page.route('**/api/v1/images**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockSearchResults),
      })
    );

    await page.goto('/library');
    await page.getByRole('searchbox').fill('nebula');
    await page.getByRole('button', { name: 'Search archive' }).click();

    // Click the second card
    await page.getByRole('heading', { level: 4, name: 'Orion Nebula Wide Field' }).click();

    // The detail panel on the right should show the selected image title
    await expect(
      page.getByRole('heading', { level: 3, name: 'Orion Nebula Wide Field' })
    ).toBeVisible();
  });

  test('shows no-results state for an unmatched query', async ({ page }) => {
    await page.route('**/api/v1/images**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockNoResults),
      })
    );

    await page.goto('/library');

    const searchInput = page.getByRole('searchbox');
    await searchInput.fill('xyzzy12345');
    await page.getByRole('button', { name: 'Search archive' }).click();

    await expect(page.getByText('No matching images')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 3, name: /The archive did not return results for "xyzzy12345"/ })
    ).toBeVisible();
  });

  test('queries shorter than 2 characters do not trigger a search', async ({ page }) => {
    await page.goto('/library');

    // Type a single character — standby state should persist
    await page.getByRole('searchbox').fill('n');
    await page.getByRole('button', { name: 'Search archive' }).click();

    await expect(page.getByText('Archive standby')).toBeVisible();
  });
});
