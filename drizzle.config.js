import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './models/index.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://postgres:admin@localhost:5433/postgres",
  },
});
