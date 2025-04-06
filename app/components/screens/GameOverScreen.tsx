interface GameOverScreenProps {
	score: number;
	onNewGame: () => void;
}

export default function GameOverScreen({
	score,
	onNewGame,
}: GameOverScreenProps) {
	return (
		<div className='fixed inset-0 bg-base-100/90 backdrop-blur-sm flex flex-col items-center justify-center text-center z-50'>
			<div className='card w-full max-w-md bg-base-300 shadow-xl animate-bounce-in'>
				<div className='card-body items-center'>
					<div className='badge badge-error gap-2 p-4 mb-4'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							className='inline-block w-6 h-6 stroke-current'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
							></path>
						</svg>
						<span className='text-xl'>GAME OVER</span>
					</div>

					<h2 className='card-title text-3xl mb-2'>Final Score</h2>
					<p className='text-5xl font-bold text-accent mb-6'>
						{score}
					</p>

					<div className='card-actions justify-center'>
						<button
							onClick={onNewGame}
							className='btn btn-primary btn-lg'
						>
							Play Again
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
