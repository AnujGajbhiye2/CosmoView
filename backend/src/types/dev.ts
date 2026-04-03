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
