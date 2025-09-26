import { db } from "./index";
     import { games } from "./schema";

     async function testConnection() {
       console.log("Connecting to Supabase...");
       // Test query to fetch all games
       const allGames = await db.query.games.findMany();
       console.log("Games in DB:", allGames);
     }

     testConnection().catch((err) => console.error("Error:", err));