import express from "express";
import type { Response } from "express";
import ViteExpress from "vite-express";
import { make_move, initialGameState, createGame } from "./tictactoe";
import type { GameState } from "./tictactoe";
import { db } from "../db/index";
import { gamesTable } from "../db/schema";
import { eq } from 'drizzle-orm';


const app = express();
app.use(express.json());

// -- Database Operations -- 

// 
async function get_all_games() {
  const allGames = await db.query.gamesTable.findMany();
  return allGames
}

// Push Game to DB
async function push_game(game: GameState): Promise<GameState> {
  await db.insert(gamesTable).values({
    id: game.id,
    board: game.board,
    winner: game.winner || null,
    player: game.player || null,
    feedback: game.feedback || '',
    gameStatus: game.gameStatus,
  }).execute();

  console.log("pushed to db");
  return game;
}

// Get One Game with ID from 
async function get_a_game(id: string): Promise<GameState> {
  const game = await db.select().from(gamesTable).where(eq(gamesTable.id,id)).limit(1)
  return game[0] as GameState
}

// Update Game in DB
async function update_game(game: GameState): Promise<GameState> {
  const updated = await db.update(gamesTable).set(game).where(eq(gamesTable.id, game.id)); 
  return game
}


type MoveRequestBody = {
  id: string,
  row: number;
  col: number;
};

// -- Endpoints --


app.post("/create", async (_, res) => {
    const newGame = createGame()
    const game = await push_game(newGame)
    console.log("Game Pushed")

    const id = await res.json(game.id)
    return id
})


app.get("/games", (_, res) => {
 get_all_games().then(games => {
  const ids = games.map(game => game.id);
  res.json(ids)
  })
})


app.post("/makemove/:id", (req, res) => {
    const {row, col } = req.body as MoveRequestBody; // normally i don't typecast, but i can't guarantee what this will be anyway, so I might as well. If I wanted to improve it, I could do STRICT validation that guarantees these are numbers from 0-2, but I don't feel like it.
    
    get_a_game(req.params.id).then(game => {

        if (!game) {
          res.status(404)
          return
        }

        let newGameState = make_move(game, row, col); // Calculate next GameState
        console.log("New Game State: " + newGameState)

        update_game(newGameState).then(newGameState => {
          res.json(newGameState)
        }) 

    })
      
  }
);

// return game - for specific game - changed to post
app.get("/game/:id", async (req, res) => {
  
  const game = await get_a_game(req.params.id)

  if (!game) {
    return res.status(404)
  }

  console.log("Got game: ", game)
  return res.json(game); 

});

//reset a game given id
app.post("/resetgame/:id", (req, res) => {

    let game_id = req.params.id

    get_a_game(req.body.id).then(game => {

      if (!game) {
        res.status(404)
        return
      }

      const fresh_game = structuredClone(initialGameState)
      fresh_game.id = game_id

      update_game(fresh_game).then(() => {
        console.log("Reset Game:" + fresh_game.id)
        res.json(fresh_game.id); 
      })
    
    })

  }
);



ViteExpress.listen(app, 5001, () => console.log("Server is listening..."));
