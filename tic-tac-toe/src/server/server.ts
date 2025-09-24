import express from "express";
import type { Request, Response } from "express";
import ViteExpress from "vite-express";
import { make_move, reset_game, initialGameState } from "./tictactoe";
import type { GameState } from "./tictactoe";



const app = express();
app.use(express.json());


type MoveRequestBody = {
  currentGame: GameState;
  row: number;
  col: number;
};

app.post("/makemove",
  (req: Request<{}, {}, MoveRequestBody>, res: Response<GameState>) => {
    const { currentGame, row, col } = req.body;
    const newGameState = make_move(currentGame, row, col);
    res.json(newGameState); 
  }
);

app.get("/initialGameState",
  (_, res: Response<GameState>) => {res.json(initialGameState);});



ViteExpress.listen(app, 5001, () => console.log("Server On"));
