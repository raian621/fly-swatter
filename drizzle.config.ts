import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "src/server/schema.ts",
  out: "src/server/drizzle",
  driver: "pg",
  dbCredentials: {
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    port: parseInt(process.env.DB_PORT as string),
  },
} satisfies Config;