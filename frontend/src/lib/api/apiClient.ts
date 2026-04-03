import axios from 'axios';
import { frontendEnv } from '@/lib/env';

export const apiClient = axios.create({
  baseURL: frontendEnv.VITE_API_BASE_URL,
  timeout: 10_000
});
