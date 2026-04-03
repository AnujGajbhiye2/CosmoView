export interface ApiSuccessResponse<TData, TMeta = Record<string, unknown>> {
  data: TData;
  meta: TMeta;
}

export interface ApiErrorPayload {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiErrorResponse {
  error: ApiErrorPayload;
}

export interface ResponseMeta {
  requestId: string;
  cached?: boolean;
  source?: string;
  [key: string]: unknown;
}
