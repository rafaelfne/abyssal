import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  out: './drizzle',
  schema: './src/adapters/database/schema.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '',
  },
});
