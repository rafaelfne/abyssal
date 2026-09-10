import { describe, expect, it } from 'vitest';
import { createApp } from './app.js';

describe('GET /health', () => {
  it('returns the public health contract', async () => {
    const app = createApp();
    const response = await app.inject({ method: 'GET', url: '/health' });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      service: 'abyssal-api',
      status: 'ok',
      version: '0.1.0',
    });
    await app.close();
  });
});
