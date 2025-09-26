
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Game from './Game';
import GameLobby from './GameLobby';
import { useState } from 'react';

const queryClient = new QueryClient();

function TicTacToe() {

  // The state of this component depends on gameID, not sure what it is yet, could be string or nothing
  const [gameId, setGameId] = useState<string | undefined>(undefined)

  // if the gameID is set, render the game component, else render the lobby
  return (
    <QueryClientProvider client={queryClient}>
      {gameId ? <Game id={gameId} /> : <GameLobby setGameId={setGameId} />}
    </QueryClientProvider>
  )
}

export default TicTacToe
