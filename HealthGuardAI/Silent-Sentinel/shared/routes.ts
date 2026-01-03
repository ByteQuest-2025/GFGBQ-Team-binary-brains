import { z } from 'zod';
import { predictionInputSchema, predictionResponseSchema, predictions } from './schema';

export * from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  predict: {
    method: 'POST' as const,
    path: '/api/predict',
    input: predictionInputSchema,
    responses: {
      200: predictionResponseSchema,
      400: errorSchemas.validation,
    },
  },
  status: {
    method: 'GET' as const,
    path: '/api/status',
    responses: {
      200: z.object({ message: z.string() }),
    },
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
