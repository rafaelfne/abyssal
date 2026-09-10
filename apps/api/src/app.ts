import { healthResponseSchema } from '@abyssal/contracts';
import Fastify, { type FastifyInstance } from 'fastify';

export function createApp(): FastifyInstance {
  const app = Fastify({ logger: false });

  app.get('/health', () =>
    healthResponseSchema.parse({
      service: 'abyssal-api',
      status: 'ok',
      version: '0.1.0',
    }),
  );

  return app;
}
