
import ticTacToeLogo from './assets/tic-tac-toe-icon.svg'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Board from './tic-tac-toe-board'

const queryClient = new QueryClient();

function App() {

  const gameId = "123"

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={ticTacToeLogo} className="logo" alt="Tic Tac Toe logo" />
        </a>

      </div>

      <h1>Tic Tac Toe</h1>

      <div className="card">

        <QueryClientProvider client={queryClient}><Board id={gameId} /></QueryClientProvider>

      </div>

      <p className="read-the-docs">
        Click a square to play
      </p>
    </>
  )
}

export default App
