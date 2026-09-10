import { describe, expect, it } from 'vitest';
import { healthResponseSchema } from './health.js';

describe('health response contract', () => {
  it('accepts the public health response', () => {
    expect(
      healthResponseSchema.parse({
        service: 'abyssal-api',
        status: 'ok',
        version: '0.1.0',
      }),
    ).toEqual({ service: 'abyssal-api', status: 'ok', version: '0.1.0' });
  });
});
