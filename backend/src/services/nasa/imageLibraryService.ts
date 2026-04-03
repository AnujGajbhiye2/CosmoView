import type { AxiosInstance } from 'axios';
import { MemoryCache } from '../../lib/cache/memoryCache.js';
import { imageSearchSchema } from '../../lib/validation/nasaSchemas.js';
import type { ImageSearchDto, ImageSearchItemDto } from '../../types/nasa.js';

interface CachedServiceResult<TData> {
  data: TData;
  cached: boolean;
}

export class ImageLibraryService {
  public constructor(
    private readonly client: AxiosInstance,
    private readonly cache: MemoryCache,
    private readonly ttlMs: number
  ) {}

  public async search(query: string, page: number, mediaType: 'image'): Promise<CachedServiceResult<ImageSearchDto>> {
    const cacheKey = `images:${mediaType}:${query}:${page}`;
    const cached = this.cache.get<ImageSearchDto>(cacheKey);

    if (cached) {
      return { data: cached, cached: true };
    }

    const response = await this.client.get('/search', {
      params: {
        q: query,
        page,
        media_type: mediaType
      }
    });

    const payload = imageSearchSchema.parse(response.data);
    const items: ImageSearchItemDto[] = payload.collection.items.map((item) => {
      const primary = item.data[0];
      const imageLinks = item.links?.filter((link) => link.render === 'image') ?? [];
      const previewImageUrl = imageLinks[0]?.href ?? item.links?.[0]?.href ?? null;
      const originalImageUrl = imageLinks[imageLinks.length - 1]?.href ?? previewImageUrl;

      return {
        nasaId: primary.nasa_id,
        title: primary.title,
        description: primary.description ?? null,
        mediaType: primary.media_type,
        dateCreated: primary.date_created,
        previewImageUrl,
        originalImageUrl
      };
    });

    const dto: ImageSearchDto = {
      items,
      page,
      pageSize: items.length,
      totalHits: payload.collection.metadata?.total_hits ?? items.length,
      hasNextPage: Boolean(payload.collection.links?.some((link) => link.rel === 'next'))
    };

    this.cache.set(cacheKey, dto, this.ttlMs);

    return { data: dto, cached: false };
  }
}
