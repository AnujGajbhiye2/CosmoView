import type { AxiosInstance } from 'axios';
import { MemoryCache } from '../../lib/cache/memoryCache.js';
import { epicCollectionSchema } from '../../lib/validation/nasaSchemas.js';
import type { EpicImageDto } from '../../types/nasa.js';

interface CachedServiceResult<TData> {
  data: TData;
  cached: boolean;
}

const createArchiveUrl = (date: string, image: string): string => {
  const [year, month, day] = date.slice(0, 10).split('-');
  return `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${image}.png`;
};

export class EpicService {
  public constructor(
    private readonly client: AxiosInstance,
    private readonly cache: MemoryCache,
    private readonly ttlMs: number
  ) {}

  public async getNaturalImages(date: string): Promise<CachedServiceResult<EpicImageDto[]>> {
    const cacheKey = `epic:${date}`;
    const cached = this.cache.get<EpicImageDto[]>(cacheKey);

    if (cached) {
      return { data: cached, cached: true };
    }

    const response = await this.client.get(`/api/natural/date/${date}`);
    const payload = epicCollectionSchema.parse(response.data);
    const dto: EpicImageDto[] = payload.map((item) => ({
      identifier: item.identifier,
      caption: item.caption,
      image: item.image,
      date: item.date,
      centroidCoordinates: item.centroid_coordinates ?? null,
      archiveUrl: createArchiveUrl(item.date, item.image)
    }));

    this.cache.set(cacheKey, dto, this.ttlMs);

    return { data: dto, cached: false };
  }
}
