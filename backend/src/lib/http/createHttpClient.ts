import axios, { type AxiosError, type AxiosInstance } from 'axios';
import { AppError } from '../errors/AppError.js';

interface CreateHttpClientOptions {
  apiKey?: string;
  baseURL: string;
  timeoutMs: number;
}

export const createHttpClient = ({
  apiKey,
  baseURL,
  timeoutMs
}: CreateHttpClientOptions): AxiosInstance => {
  const client = axios.create({
    baseURL,
    timeout: timeoutMs
  });

  client.interceptors.request.use((config) => {
    if (apiKey) {
      config.params = {
        ...config.params,
        api_key: apiKey
      };
    }

    return config;
  });

  client.interceptors.response.use(undefined, (error: AxiosError) => {
    if (error.code === 'ECONNABORTED') {
      throw new AppError('Upstream NASA request timed out.', {
        code: 'NASA_TIMEOUT',
        statusCode: 504,
        details: {
          url: error.config?.url
        },
        cause: error
      });
    }

    if (error.response) {
      throw new AppError('NASA API request failed.', {
        code: 'NASA_REQUEST_FAILED',
        statusCode: 502,
        details: {
          url: error.config?.url,
          status: error.response.status,
          data: error.response.data
        },
        cause: error
      });
    }

    throw new AppError('Failed to reach NASA services.', {
      code: 'NASA_NETWORK_ERROR',
      statusCode: 502,
      details: {
        url: error.config?.url,
        message: error.message
      },
      cause: error
    });
  });

  return client;
};
