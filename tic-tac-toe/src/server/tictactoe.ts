//Structure
export type GameState = {
  board: ('X' | 'O' | null)[][]
  winner: 'X' | 'O' | 'Draw' | null
  player: 'X' | 'O' | null
  feedback: string
  gameStatus: string

}

//Default
export const initialGameState: GameState = {
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ],
  winner: null,
  player: 'X',
  feedback: 'Select a tile to play',
  gameStatus: 'Not Started'
  }


//---Helpers---

function winner(currentGame: GameState): Boolean {

  const board = currentGame.board;

  if (board[0][0] !== null && board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
    return true;
  }
  if (board[1][0] !== null && board[1][0] === board[1][1] && board[1][1] === board[1][2]) {
    return true;
  }
  if (board[2][0] !== null && board[2][0] === board[2][1] && board[2][1] === board[2][2]) {
    return true;
  }
  if (board[0][0] !== null && board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
    return true;
  }
  if (board[0][1] !== null && board[0][1] === board[1][1] && board[1][1] === board[2][1]) {
    return true;
  }
  if (board[0][2] !== null && board[0][2] === board[1][2] && board[1][2] === board[2][2]) {
    return true;
  }
  if (board[0][0] !== null && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return true;
  }
  if (board[0][2] !== null && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return true;
  }
  return false

}

function draw(currentGame: GameState): Boolean {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j<3; j++) {
      if (currentGame.board[i][j] === null){
        return false
      }
    }  
}
return true
}

function valid_move(currentGame: GameState,row:number,col:number): Boolean {

  if (currentGame.gameStatus == 'Ended') {
    return false
  }

  if (currentGame.board[row][col] != null) {
    console.log("Invalid Move")
    return false
  }

  return true

}

//---Exposed---

export function make_move(currentGame: GameState, row: number, col: number): GameState {

  const newGameState = structuredClone(currentGame);

  if (valid_move(newGameState, row, col)) {
   
    newGameState.board[row][col] = currentGame.player;

    
    if (winner(newGameState)) {
      newGameState.feedback = newGameState.player + ' has won!';
      newGameState.gameStatus = 'Ended'
    } else if (draw(newGameState)) {
      newGameState.feedback = 'The game is a draw';
      newGameState.gameStatus = 'Ended'
    } else {
      change_player(newGameState);
    }
  }

  return newGameState;
}

export function reset_game():GameState {
  return initialGameState
}

export function change_player(GameState:GameState):GameState {

  if (GameState.player === 'X') {
      GameState.player = 'O'
      if (GameState.gameStatus === 'Ended') {
        return GameState
      }
      GameState.feedback = "It is 0's Turn, Please Select a Box"
      return GameState
    }
    else if (GameState.player === 'O') {
      GameState.player = 'X'
      if (GameState.gameStatus === 'Ended') {
        return GameState
      }
      GameState.feedback = "It is X's Turn, Please Select a Box"
      return GameState
    }
    //idk how to write this without needing a pointless return
    return GameState
}
