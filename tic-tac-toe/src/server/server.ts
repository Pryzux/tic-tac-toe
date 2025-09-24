import express from "express";
import type { Response } from "express";
import ViteExpress from "vite-express";
import { make_move, initialGameState } from "./tictactoe";
import type { GameState } from "./tictactoe";

const app = express();
app.use(express.json());

type MoveRequestBody = {
  row: number;
  col: number;
};

// THIS GAME IS MEANT TO BE STATEFUL. I AM MEANT TO MODIFY IT :)
let currentGame = structuredClone(initialGameState)

app.post("/makemove", (req, res) => {
    const { row, col } = req.body as MoveRequestBody; // normally i don't typecast, but i can't guarantee what this will be anyway, so I might as well. If I wanted to improve it, I could do STRICT validation that guarantees these are numbers from 0-2, but I don't feel like it.
    const newGameState = make_move(currentGame, row, col); // Calculate next GameState
    console.log(newGameState)
    currentGame = newGameState
    res.json(newGameState); 
  }
);

app.get("/game",
  (_, res: Response<GameState>) => {res.json(currentGame);});

app.get("/resetgame",
  (_, res: Response<GameState>) => {
    const newGameState = initialGameState; 
    console.log(newGameState)
    currentGame = newGameState
    res.json(newGameState); 
});



ViteExpress.listen(app, 5001, () => console.log("Server is listening..."));
