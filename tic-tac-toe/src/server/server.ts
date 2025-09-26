import express from "express";
import type { Response } from "express";
import ViteExpress from "vite-express";
import { make_move, initialGameState, createGame } from "./tictactoe";
import type { GameState } from "./tictactoe";

const app = express();
app.use(express.json());

//paris/game/id returns a list of all the game ids
//create .set = create geame button

//list games
//create games
//retrieve game available
//move for a game

// where were storing the games {id:gameState,...}
let games = new Map<string,GameState>()


type MoveRequestBody = {
  id: string,
  row: number;
  col: number;
};

// -- New Endpoints --

// create a new game and return the state - for Create Game Button
app.post("/create", (_, res) => {
    const newGame = createGame()
    games.set(newGame.id, newGame)
    console.log("New Game Created: " + newGame.id)
    res.json(newGame.id)
})

// return list of games - for displaying available games to frontend
app.get("/games", (_, res) => {res.json([...games.keys()])})

// Make a move for a game with id
app.post("/makemove:id", (req, res) => {
    const { row, col } = req.body as MoveRequestBody; // normally i don't typecast, but i can't guarantee what this will be anyway, so I might as well. If I wanted to improve it, I could do STRICT validation that guarantees these are numbers from 0-2, but I don't feel like it.
    const game_we_want = games.get(req.params.id)
    if (!game_we_want) {
      res.status(404)
      return
    }
    let newGameState = make_move(game_we_want, row, col); // Calculate next GameState
    console.log(newGameState)
    games.set(game_we_want.id,newGameState) //Update stored game
    res.json(newGameState); 
  }
);

// return game - for specific game - changed to post
app.post("/game:id", (req, res) => {

    const game_we_want = games.get(req.params.id)

    if (!game_we_want) {
      res.status(404)
      return
    }
    
    console.log(game_we_want)
    res.json(game_we_want); 

  }
);

//reset a game given id
app.post("/resetgame:id", (req, res) => {

    let game_id = req.params.id
    const game_we_want = games.get(game_id)

    if (!game_we_want) {
      res.status(404)
      return
    }

    //create modifiable new game
    const fresh_game = structuredClone(initialGameState)
    // set new game to have id of game were resetting
    fresh_game.id = game_id
    // update old game with new state
    games.set(game_id, fresh_game)
    
    console.log("Reset Game:" + games.get(game_id))

    res.json(games.get(game_id)); 

  }
);





ViteExpress.listen(app, 5001, () => console.log("Server is listening..."));
