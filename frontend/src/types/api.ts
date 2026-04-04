export interface ApiSuccessResponse<TData, TMeta = Record<string, unknown>> {
  data: TData;
  meta: TMeta;
}

export interface EndpointVariation {
  description: string;
  method: 'GET';
  path: string;
}

export interface EndpointDescriptor {
  name: string;
  description: string;
  method: 'GET';
  path: string;
  query?: Record<string, string>;
  variations: EndpointVariation[];
}

export interface DevEndpointsDto {
  environment: string;
  basePath: string;
  endpoints: EndpointDescriptor[];
}

export interface ApodDto {
  title: string;
  date: string;
  mediaType: string;
  explanation: string;
  imageUrl: string | null;
  hdImageUrl: string | null;
  copyright: string | null;
}

export interface AsteroidDto {
  id: string;
  name: string;
  hazardous: boolean;
  diameterKmMin: number;
  diameterKmMax: number;
  closeApproachDate: string;
  missDistanceKm: number;
  velocityKph: number;
}

export interface AsteroidFeedDto {
  range: {
    startDate: string;
    endDate: string;
  };
  counts: {
    total: number;
  };
  asteroids: AsteroidDto[];
}

export interface ImageSearchItemDto {
  nasaId: string;
  title: string;
  description: string | null;
  mediaType: string;
  dateCreated: string;
  previewImageUrl: string | null;
  originalImageUrl: string | null;
}

export interface ImageSearchDto {
  items: ImageSearchItemDto[];
  page: number;
  pageSize: number;
  totalHits: number;
  hasNextPage: boolean;
}

export interface EpicImageDto {
  identifier: string;
  caption: string;
  image: string;
  date: string;
  centroidCoordinates: {
    lat: number;
    lon: number;
  } | null;
  archiveUrl: string;
}
