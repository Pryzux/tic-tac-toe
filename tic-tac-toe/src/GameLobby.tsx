import { useQuery } from '@tanstack/react-query';

type GameLobbyProps = {
    setGameId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

function GameLobby({ setGameId }: GameLobbyProps) {

    const { data: games = [], isPending, error, refetch } = useQuery({
        queryKey: ['games'],
        queryFn: () =>
            fetch(`http://localhost:5001/games`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((res) => res.json()),
    });

    async function createGame() {
        const res = await fetch(`http://localhost:5001/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const gameId = await res.json();
        setGameId(gameId);
        refetch()
    }

    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1 className="text-5xl font-bold text-amber-500 text-center drop-shadow-lg underline decoration-wavy mb-5">
                Tic Tac Toe
            </h1>
            <div>
                <button
                    className="mt-4 px-4 py-2 mb-5 bg-amber-300 text-white rounded-lg hover:bg-amber-400 transition-colors"
                    onClick={createGame}>
                    Create Game
                </button>
                <h2 className="font-bold text-amber-500 text-center drop-shadow-lg underline mb-5">
                    Available Games
                </h2>

                <ul>{games.map((gameId: string, index: number) => (<button className="flex m-4" key={index} onClick={() => setGameId(gameId)}>{gameId}</button>))}</ul>

            </div>
        </div>
    );
}

export default GameLobby;