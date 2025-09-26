import './App.css'
import { useQuery } from '@tanstack/react-query';



function Game({ id }: { id: string }) {

  // Fetch state
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['game', id],
    queryFn: () =>
      fetch(`http://localhost:5001/game${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json())
  });

  const game = data

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // send move to backend, return new data to render and update data (refetch)
  async function handleClick(id: string, row: number, col: number) {
    const res = await fetch(`/makemove${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ row, col })
    });
    await res.json();
    refetch();
  }

  async function reset_game(id: string) {
    const res = await fetch(`/resetgame${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    await res.json();
    refetch();
  }

  return (

    <div className="flex flex-col items-center gap-4">
      <div> {game.feedback}</div>
      <table className="border border-gray-300 rounded-lg w-64 mx-auto shadow-md">
        <tbody>
          <tr>
            <td
              className="border-b border-r border-gray-300 px-4 py-4 text-center text-xl font-medium text-amber-300 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => handleClick(id, 0, 0)}
            >
              {game.board[0][0]}
            </td>
            <td
              className="border-b border-r border-gray-300 px-4 py-4 text-center text-xl font-medium text-amber-300 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => handleClick(id, 0, 1)}
            >
              {game.board[0][1]}
            </td>
            <td
              className="border-b border-gray-300 px-4 py-4 text-center text-xl font-medium text-amber-300 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => handleClick(id, 0, 2)}
            >
              {game.board[0][2]}
            </td>
          </tr>
          <tr>
            <td
              className="border-b border-r border-gray-300 px-4 py-4 text-center text-xl font-medium text-amber-300 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => handleClick(id, 1, 0)}
            >
              {game.board[1][0]}
            </td>
            <td
              className="border-b border-r border-gray-300 px-4 py-4 text-center text-xl font-medium text-amber-300 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => handleClick(id, 1, 1)}
            >
              {game.board[1][1]}
            </td>
            <td
              className="border-b border-gray-300 px-4 py-4 text-center text-xl font-medium text-amber-300 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => handleClick(id, 1, 2)}
            >
              {game.board[1][2]}
            </td>
          </tr>
          <tr>
            <td
              className="border-r border-gray-300 px-4 py-4 text-center text-xl font-medium text-amber-300 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => handleClick(id, 2, 0)}
            >
              {game.board[2][0]}
            </td>
            <td
              className="border-r border-gray-300 px-4 py-4 text-center text-xl font-medium text-amber-300 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => handleClick(id, 2, 1)}
            >
              {game.board[2][1]}
            </td>
            <td
              className="px-4 py-4 text-center text-xl font-medium text-amber-300 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => handleClick(id, 2, 2)}
            >
              {game.board[2][2]}
            </td>
          </tr>
        </tbody>
      </table>
      <button
        className="mt-4 px-4 py-2 bg-amber-300 text-gray-800 rounded-lg hover:bg-amber-400 transition-colors"
        onClick={() => reset_game(id)}>
        Reset Game
      </button>
    </div>
  )
}

export default Game