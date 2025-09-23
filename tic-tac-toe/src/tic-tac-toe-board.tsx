import './App.css'
import { useState } from 'react'
import { initialGameState, reset_game } from './tictactoe.ts'
import { make_move } from './tictactoe.ts'

function Board() {
  const [gameState, setGameState] = useState(initialGameState)

  const handleClick = (row: number, col: number) => {
    const newState = make_move(gameState, row, col)
    setGameState(newState)
  }

  const reset_button_click = () => {
    const newState = reset_game()
    setGameState(newState)
  }


  return (
    <div className="flex flex-col items-center gap-4">
      <div> {gameState.feedback}</div>
      <table className="border border-gray-300 rounded-lg w-64 mx-auto shadow-md">
        <tbody>
          <tr>
            <td 
              className="border-b border-r border-gray-300 px-4 py-4 text-center text-xl font-medium text-amber-300 hover:bg-gray-100 cursor-pointer transition-colors" 
              onClick={() => handleClick(0, 0)}
            >
              {gameState.board[0][0]}
            </td>
            <td 
              className="border-b border-r border-gray-300 px-4 py-4 text-center text-xl font-medium text-amber-300 hover:bg-gray-100 cursor-pointer transition-colors" 
              onClick={() => handleClick(0, 1)}
            >
              {gameState.board[0][1]}
            </td>
            <td 
              className="border-b border-gray-300 px-4 py-4 text-center text-xl font-medium text-amber-300 hover:bg-gray-100 cursor-pointer transition-colors" 
              onClick={() => handleClick(0, 2)}
            >
              {gameState.board[0][2]}
            </td>
          </tr>
          <tr>
            <td 
              className="border-b border-r border-gray-300 px-4 py-4 text-center text-xl font-medium text-amber-300 hover:bg-gray-100 cursor-pointer transition-colors" 
              onClick={() => handleClick(1, 0)}
            >
              {gameState.board[1][0]}
            </td>
            <td 
              className="border-b border-r border-gray-300 px-4 py-4 text-center text-xl font-medium text-amber-300 hover:bg-gray-100 cursor-pointer transition-colors" 
              onClick={() => handleClick(1, 1)}
            >
              {gameState.board[1][1]}
            </td>
            <td 
              className="border-b border-gray-300 px-4 py-4 text-center text-xl font-medium text-amber-300 hover:bg-gray-100 cursor-pointer transition-colors" 
              onClick={() => handleClick(1, 2)}
            >
              {gameState.board[1][2]}
            </td>
          </tr>
          <tr>
            <td 
              className="border-r border-gray-300 px-4 py-4 text-center text-xl font-medium text-amber-300 hover:bg-gray-100 cursor-pointer transition-colors" 
              onClick={() => handleClick(2, 0)}
            >
              {gameState.board[2][0]}
            </td>
            <td 
              className="border-r border-gray-300 px-4 py-4 text-center text-xl font-medium text-amber-300 hover:bg-gray-100 cursor-pointer transition-colors" 
              onClick={() => handleClick(2, 1)}
            >
              {gameState.board[2][1]}
            </td>
            <td 
              className="px-4 py-4 text-center text-xl font-medium text-amber-300 hover:bg-gray-100 cursor-pointer transition-colors" 
              onClick={() => handleClick(2, 2)}
            >
              {gameState.board[2][2]}
            </td>
          </tr>
        </tbody>
      </table>
      <button 
        className="mt-4 px-4 py-2 bg-amber-300 text-gray-800 rounded-lg hover:bg-amber-400 transition-colors"
        onClick={reset_button_click}
      >
        Reset Game
      </button>
    </div>
  )
}

export default Board