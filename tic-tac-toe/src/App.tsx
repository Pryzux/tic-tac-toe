
import ticTacToeLogo from './assets/tic-tac-toe-icon.svg'
import './App.css'
import Board from './tic-tac-toe-board'

function App() {

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={ticTacToeLogo} className="logo" alt="Tic Tac Toe logo" />
        </a>
      
      </div>

      <h1>Tic Tac Toe</h1>

      <div className="card">
        
        <Board />

      </div>
      
      <p className="read-the-docs">
        Click a square to play
      </p>
    </>
  )
}

export default App
