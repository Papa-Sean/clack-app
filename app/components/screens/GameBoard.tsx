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
		<div className='card w-full max-w-md bg-base-200 shadow-xl mx-auto p-6'>
			<div className='card-body p-0'>
				<h1 className='card-title text-primary text-center text-3xl md:text-4xl font-bold neon-flicker mb-4 justify-center'>
					Shut the Box
				</h1>

				{players.length > 0 && (
					<div className='badge badge-lg badge-secondary w-full justify-center mb-6 py-3'>
						<span className='text-lg font-bold'>
							Player: {players[currentPlayerIndex].name}
						</span>
					</div>
				)}

				<div className='flex flex-wrap justify-center gap-2 mb-6'>
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

				<div className='card-actions justify-center mt-6'>
					<ActionButtons
						onRoll={(rollDice) => {
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
