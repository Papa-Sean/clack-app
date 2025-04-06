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
		<div className='flex flex-col sm:flex-row gap-4 w-full justify-center'>
			<button
				className={`
          btn btn-lg ${
				gameState === 'rolling'
					? 'btn-primary neon-flicker'
					: 'btn-disabled'
			}
        `}
				onClick={onRoll}
				disabled={gameState !== 'rolling'}
			>
				<span className='mr-2'>🎲</span> Roll Dice
			</button>

			<button
				className='btn btn-lg btn-secondary'
				onClick={onNewGame}
			>
				<span className='mr-2'>🔄</span> New Game
			</button>
		</div>
	);
}
