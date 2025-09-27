
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Game from './Game';
import GameLobby from './GameLobby';
import { useState } from 'react';

const queryClient = new QueryClient();

function TicTacToe() {


  const [gameId, setGameId] = useState<string | undefined>(undefined)


  return (
    <QueryClientProvider client={queryClient}>
      {gameId ? <Game id={gameId} /> : <GameLobby setGameId={setGameId} />}
    </QueryClientProvider>
  )
}

export default TicTacToe
