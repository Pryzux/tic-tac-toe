import './App.css'
import { useState } from 'react'
import { initialGameState } from './tictactoe.ts'
import { makeMove} from './tictactoe.ts'

function Board() {
  const [gameState, setGameState] = useState(initialGameState)

  const handleClick = (row:number, col:number) => {
    const newState = makeMove(gameState,row,col)
    //console.log(newState)
    setGameState(newState)
  }

  return (
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
  )
}

export default Board