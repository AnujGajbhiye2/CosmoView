import { test, expect, type Route } from '@playwright/test';
import type { ApiSuccessResponse, ApodDto, AsteroidFeedDto, EpicImageDto, ImageSearchDto } from '../src/types/api';

/**
 * Holds a route handler until `release()` is called, then fulfills with the
 * provided body. Use this to test skeleton/loading states before data arrives.
 */
function makeHeldRoute(body: unknown): {
  handler: (route: Route) => Promise<void>;
  release: () => void;
} {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });

  return {
    handler: async (route) => {
      await gate;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(body),
      });
    },
    release,
  };
}

// ---------------------------------------------------------------------------
// Minimal stub responses used to resolve held requests
// ---------------------------------------------------------------------------
const stubApod: ApiSuccessResponse<ApodDto> = {
  data: {
    title: 'Stub APOD',
    date: '2024-01-15',
    mediaType: 'image',
    explanation: 'Stub explanation.',
    imageUrl: 'https://apod.nasa.gov/apod/image/stub.jpg',
    hdImageUrl: null,
    copyright: null,
  },
  meta: { requestId: 'stub', cached: false },
};

const stubAsteroids: ApiSuccessResponse<AsteroidFeedDto> = {
  data: {
    range: { startDate: '2026-04-03', endDate: '2026-04-05' },
    counts: { total: 1 },
    asteroids: [
      {
        id: '1',
        name: '(2010 XK1)',
        hazardous: false,
        diameterKmMin: 0.1,
        diameterKmMax: 0.2,
        closeApproachDate: '2026-04-03',
        missDistanceKm: 5_000_000,
        velocityKph: 50_000,
      },
    ],
  },
  meta: { requestId: 'stub', cached: false },
};

const stubEpic: ApiSuccessResponse<EpicImageDto[]> = {
  data: [
    {
      identifier: 'epic_1b_stub',
      caption: 'Stub EPIC image',
      image: 'epic_1b_stub',
      date: '2024-01-15 00:00:00',
      centroidCoordinates: { lat: 0, lon: 0 },
      archiveUrl: 'https://epic.gsfc.nasa.gov/archive/natural/stub.png',
    },
  ],
  meta: { requestId: 'stub', cached: false },
};

const stubImages: ApiSuccessResponse<ImageSearchDto> = {
  data: {
    items: [
      {
        nasaId: 'stub-id',
        title: 'Stub Nebula',
        description: null,
        mediaType: 'image',
        dateCreated: '2024-01-15T00:00:00Z',
        previewImageUrl: null,
        originalImageUrl: null,
      },
    ],
    page: 1,
    pageSize: 1,
    totalHits: 1,
    hasNextPage: false,
  },
  meta: { requestId: 'stub', cached: false },
};

// ---------------------------------------------------------------------------
// Selector used to detect the SpaceLoader / PanelSkeleton component
// ---------------------------------------------------------------------------
const SKELETON_SELECTOR = 'text=Loading transmission';

test.describe('Loading states — skeleton loaders', () => {
  test('APOD shows skeleton before data arrives', async ({ page }) => {
    const { handler, release } = makeHeldRoute(stubApod);
    await page.route('**/api/v1/apod**', handler);

    await page.goto('/apod');

    // Skeleton must appear while the request is in-flight
    await expect(page.locator(SKELETON_SELECTOR)).toBeVisible();

    // Release the blocked request
    release();

    // Content must load after the request resolves
    await expect(page.getByRole('heading', { level: 2, name: 'Stub APOD' })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('Asteroids shows skeleton before data arrives', async ({ page }) => {
    const { handler, release } = makeHeldRoute(stubAsteroids);
    await page.route('**/api/v1/asteroids**', handler);

    await page.goto('/asteroids');

    await expect(page.locator(SKELETON_SELECTOR)).toBeVisible();
    release();

    await expect(page.getByText('Tracked objects')).toBeVisible({ timeout: 10_000 });
  });

  test('Earth shows skeleton before data arrives', async ({ page }) => {
    const { handler, release } = makeHeldRoute(stubEpic);
    await page.route('**/api/v1/epic**', handler);

    await page.goto('/earth');

    await expect(page.locator(SKELETON_SELECTOR)).toBeVisible();
    release();

    await expect(page.getByText('EPIC natural imagery')).toBeVisible({ timeout: 10_000 });
  });

  test('Library shows skeleton while searching', async ({ page }) => {
    const { handler, release } = makeHeldRoute(stubImages);
    await page.route('**/api/v1/images**', handler);

    await page.goto('/library');

    // Trigger a search to start the suspense boundary
    const searchInput = page.getByRole('searchbox');
    await searchInput.fill('nebula');
    await page.getByRole('button', { name: 'Search archive' }).click();

    // Skeleton should appear while the library request is held
    await expect(page.locator(SKELETON_SELECTOR)).toBeVisible();
    release();

    await expect(
      page.getByRole('heading', { level: 3, name: /images for "nebula"/ })
    ).toBeVisible({ timeout: 10_000 });
  });

  test('skeleton does not contain a spinner element', async ({ page }) => {
    const { handler, release } = makeHeldRoute(stubApod);
    await page.route('**/api/v1/apod**', handler);

    await page.goto('/apod');

    await expect(page.locator(SKELETON_SELECTOR)).toBeVisible();

    // There should be no role="progressbar" (spinner) — only the custom skeleton
    await expect(page.getByRole('progressbar')).not.toBeVisible();

    release();
  });
});
