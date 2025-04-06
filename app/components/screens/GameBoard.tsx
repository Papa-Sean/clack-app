import Tile from '../Tile';
import Dice from '../Dice';
import ScoreDisplay from '../ScoreDisplay';
import ActionButtons from '../ActionButtons';
import { Player, Tile as TileType } from '../GameUtils';

interface GameBoardProps {
	tiles: TileType[];
	diceValues: number[];
	score: number;
	selectedTiles: number[];
	players: Player[];
	currentPlayerIndex: number;
	gameState: string;
	onTileClick: (index: number) => void;
	onRoll: () => void;
	onNewGame: () => void;
}

export default function GameBoard({
	tiles,
	diceValues,
	score,
	selectedTiles,
	players,
	currentPlayerIndex,
	gameState,
	onTileClick,
	onRoll,
	onNewGame,
}: GameBoardProps) {
	return (
		<div className='card w-full bg-base-200 shadow-xl mx-auto p-2 sm:p-6'>
			<div className='card-body p-0'>
				<h1 className='card-title text-primary text-center text-2xl sm:text-3xl md:text-4xl font-bold neon-flicker mb-2 sm:mb-4 justify-center'>
					Shut the Box
				</h1>

				{players.length > 0 && (
					<div className='badge badge-lg badge-secondary w-full justify-center mb-3 sm:mb-6 py-2 sm:py-3'>
						<span className='text-base sm:text-lg font-bold'>
							Player: {players[currentPlayerIndex].name}
						</span>
					</div>
				)}

				{/* Tile Row - Fully responsive */}
				<div className='flex flex-wrap justify-center gap-1 sm:gap-2 mb-4 sm:mb-6 w-full px-1 sm:px-2'>
					{tiles.map((tile, index) => (
						<Tile
							key={index}
							value={tile.value}
							active={tile.active}
							selected={selectedTiles.includes(index)}
							onClick={() => onTileClick(index)}
						/>
					))}
				</div>

				<Dice values={diceValues} />

				<ScoreDisplay score={score} />

				<div className='card-actions justify-center mt-4 sm:mt-6'>
					<ActionButtons
						onRoll={() => {
							// Add a little shake animation before rolling
							document
								.querySelector('.dice-container')
								?.classList.add('animate-shake');
							setTimeout(() => {
								document
									.querySelector('.dice-container')
									?.classList.remove('animate-shake');
								onRoll();
							}, 500);
						}}
						onNewGame={onNewGame}
						gameState={gameState}
					/>
				</div>
			</div>
		</div>
	);
}
