interface ActionButtonsProps {
	onRoll: () => void;
	onNewGame: () => void;
	gameState: string;
}

export default function ActionButtons({
	onRoll,
	onNewGame,
	gameState,
}: ActionButtonsProps) {
	return (
		<div className='action-buttons'>
			<button
				className='roll-button'
				onClick={onRoll}
				disabled={gameState !== 'rolling'}
			>
				Roll Dice
			</button>
			<button
				className='new-game-button'
				onClick={onNewGame}
			>
				New Game
			</button>
		</div>
	);
}
