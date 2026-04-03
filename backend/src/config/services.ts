import { env } from './env.js';
import { MemoryCache } from '../lib/cache/memoryCache.js';
import { createHttpClient } from '../lib/http/createHttpClient.js';
import { ApodService } from '../services/nasa/apodService.js';
import { AsteroidsService } from '../services/nasa/asteroidsService.js';
import { EpicService } from '../services/nasa/epicService.js';
import { ImageLibraryService } from '../services/nasa/imageLibraryService.js';

const cache = new MemoryCache();

const nasaApiClient = createHttpClient({
  baseURL: 'https://api.nasa.gov',
  apiKey: env.NASA_API_KEY,
  timeoutMs: env.NASA_API_TIMEOUT_MS
});

const nasaImageClient = createHttpClient({
  baseURL: 'https://images-api.nasa.gov',
  timeoutMs: env.NASA_API_TIMEOUT_MS
});

const epicClient = createHttpClient({
  baseURL: 'https://epic.gsfc.nasa.gov',
  apiKey: env.NASA_API_KEY,
  timeoutMs: env.NASA_API_TIMEOUT_MS
});

export const services = {
  apod: new ApodService(nasaApiClient, cache, env.NASA_CACHE_TTL_APOD_MS),
  asteroids: new AsteroidsService(nasaApiClient, cache, env.NASA_CACHE_TTL_ASTEROIDS_MS),
  images: new ImageLibraryService(nasaImageClient, cache, env.NASA_CACHE_TTL_IMAGES_MS),
  epic: new EpicService(epicClient, cache, env.NASA_CACHE_TTL_EPIC_MS)
};
