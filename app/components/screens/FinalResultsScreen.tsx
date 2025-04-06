import { Player, getWinner } from '../GameUtils';

interface FinalResultsScreenProps {
  players: Player[];
  onNewGame: () => void;
}

export default function FinalResultsScreen({ players, onNewGame }: FinalResultsScreenProps) {
  const winner = getWinner(players);

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 rounded-lg shadow-xl max-w-[600px] mx-auto my-8">
      <h2 className="text-4xl text-gray-800 mb-8">Game Results</h2>
      
      <div className="bg-amber-50 p-6 rounded-lg mb-8 text-center w-full shadow-sm">
        <h3 className="text-2xl text-orange-500 m-0 mb-2">🏆 Winner: {winner?.name} 🏆</h3>
        <p className="text-lg">Score: {winner?.score}</p>
      </div>
      
      <div className="w-full bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-center m-0 text-gray-600">All Scores</h3>
        <ul className="list-none p-0">
          {players
            .sort((a, b) => a.score - b.score)
            .map((player, index) => (
              <li
                key={index}
                className={`py-3 px-3 border-b border-gray-100 text-lg
                          ${player === winner ? 'font-bold text-orange-500 bg-amber-50/50' : ''}`}
              >
                {player.name}: {player.score}
              </li>
            ))}
        </ul>
      </div>
      
      <button 
        onClick={onNewGame}
        className="bg-green-500 text-white text-xl py-3 px-8 border-none rounded 
                  cursor-pointer mt-8 transition-colors hover:bg-green-700"
      >
        New Game
      </button>
    </div>
  );
}
