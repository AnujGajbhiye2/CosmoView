import type { AxiosInstance } from 'axios';
import { MemoryCache } from '../../lib/cache/memoryCache.js';
import { apodResponseSchema } from '../../lib/validation/nasaSchemas.js';
import type { ApodDto } from '../../types/nasa.js';

interface CachedServiceResult<TData> {
  data: TData;
  cached: boolean;
}

export class ApodService {
  public constructor(
    private readonly client: AxiosInstance,
    private readonly cache: MemoryCache,
    private readonly ttlMs: number
  ) {}

  public async getApod(date?: string): Promise<CachedServiceResult<ApodDto>> {
    const cacheKey = `apod:${date ?? 'today'}`;
    const cached = this.cache.get<ApodDto>(cacheKey);

    if (cached) {
      return { data: cached, cached: true };
    }

    const response = await this.client.get('/planetary/apod', {
      params: {
        date
      }
    });

    const payload = apodResponseSchema.parse(response.data);
    const dto: ApodDto = {
      title: payload.title,
      date: payload.date,
      mediaType: payload.media_type,
      explanation: payload.explanation,
      imageUrl: payload.url ?? null,
      hdImageUrl: payload.hdurl ?? null,
      copyright: payload.copyright ?? null
    };

    this.cache.set(cacheKey, dto, this.ttlMs);

    return { data: dto, cached: false };
  }
}
