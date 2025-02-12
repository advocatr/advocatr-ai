import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@db/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const db = drizzle({
  connection: process.drizzle_knoq_user:adEJwhHs4Qufo8JzBrQbsnTKHHUxbrCl@dpg-cuma6t2n91rc739t9r5g-a/drizzle_knoq,
  schema,
  ws: ws,
});
