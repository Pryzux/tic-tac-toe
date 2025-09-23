// Data Structures

export type GameState = {
  board: ('X' | 'O' | null)[][]
  winner: 'X' | 'O' | 'Draw' | null
  player: 'X' | 'O' | null

}


export const initialGameState: GameState = {
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ],
  winner: null,
  player: 'X'
  }


// Helpers

function check_winner(currentGame: GameState): Boolean {

  const board = currentGame.board;

  if (is_draw(currentGame)) {
    console.log("Game is a draw")
    return false
  }

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

function is_valid_move(currentGame: GameState,row:number,col:number): Boolean {

  

  if (currentGame.board[row][col] != null) {
    console.log("Invalid Move")
    return false
  }

  return true

}

function is_draw(currentGame: GameState): Boolean {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; i<3; i++) {
      if (currentGame.board[i][j] == null){
        return false
      }
    }  
}

return true
}


export function makeMove(currentGame: GameState, row:number, col:number): GameState {

  const newGameState = structuredClone(currentGame)

  if (newGameState.player === 'X') {
    newGameState.player = 'O'
  }
  else if (newGameState.player === 'O') {
    newGameState.player = 'X'
  }


  if (is_valid_move(currentGame,row,col)) {
    newGameState.board[row][col] = currentGame.player

  }
  
  if (check_winner(newGameState)) {
      newGameState.winner = newGameState.player
      console.log("Winner is: " + newGameState.winner)
      return initialGameState
  }
  
  return newGameState

}

