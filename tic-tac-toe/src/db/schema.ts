import { pgTable, varchar, jsonb } from "drizzle-orm/pg-core";

     export const games = pgTable("games", {
       id: varchar("id", { length: 255 }).primaryKey(), 
       board: jsonb("board").notNull(), 
       winner: varchar("winner", { length: 50 }), 
       player: varchar("player", { length: 50 }), 
       feedback: varchar("feedback", { length: 255 }).notNull(), 
       gameStatus: varchar("game_status", { length: 255 }).notNull(), 
     });