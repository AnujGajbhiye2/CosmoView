import type { AxiosInstance } from 'axios';
import { MemoryCache } from '../../lib/cache/memoryCache.js';
import { asteroidFeedSchema } from '../../lib/validation/nasaSchemas.js';
import type { AsteroidDto, AsteroidFeedDto } from '../../types/nasa.js';

interface CachedServiceResult<TData> {
  data: TData;
  cached: boolean;
}

export class AsteroidsService {
  public constructor(
    private readonly client: AxiosInstance,
    private readonly cache: MemoryCache,
    private readonly ttlMs: number
  ) {}

  public async getFeed(startDate: string, endDate: string): Promise<CachedServiceResult<AsteroidFeedDto>> {
    const cacheKey = `asteroids:${startDate}:${endDate}`;
    const cached = this.cache.get<AsteroidFeedDto>(cacheKey);

    if (cached) {
      return { data: cached, cached: true };
    }

    const response = await this.client.get('/neo/rest/v1/feed', {
      params: {
        start_date: startDate,
        end_date: endDate
      }
    });

    const payload = asteroidFeedSchema.parse(response.data);
    const asteroids: AsteroidDto[] = Object.values(payload.near_earth_objects)
      .flat()
      .map((asteroid) => {
        const firstApproach = asteroid.close_approach_data[0];

        return {
          id: asteroid.id,
          name: asteroid.name,
          hazardous: asteroid.is_potentially_hazardous_asteroid,
          diameterKmMin: asteroid.estimated_diameter.kilometers.estimated_diameter_min,
          diameterKmMax: asteroid.estimated_diameter.kilometers.estimated_diameter_max,
          closeApproachDate: firstApproach?.close_approach_date ?? '',
          missDistanceKm: Number(firstApproach?.miss_distance.kilometers ?? 0),
          velocityKph: Number(firstApproach?.relative_velocity.kilometers_per_hour ?? 0)
        };
      })
      .sort((left, right) => left.closeApproachDate.localeCompare(right.closeApproachDate));

    const dto: AsteroidFeedDto = {
      range: {
        startDate,
        endDate
      },
      counts: {
        total: asteroids.length
      },
      asteroids
    };

    this.cache.set(cacheKey, dto, this.ttlMs);

    return { data: dto, cached: false };
  }
}
