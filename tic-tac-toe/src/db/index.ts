import { drizzle } from "drizzle-orm/postgres-js";
     import postgres from "postgres";
     import * as schema from "./schema";
     import "dotenv/config";

     const connectionString = process.env.DATABASE_URL!;
     const client = postgres(connectionString, { max: 1, prepare: false }); // prepare: false for Supabase pooler
     export const db = drizzle(client, { schema });