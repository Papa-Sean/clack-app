interface CelebrationScreenProps {
	isMultiplayer: boolean;
	onContinue: () => void;
	onNewGame: () => void;
}

export default function CelebrationScreen({
	isMultiplayer,
	onContinue,
	onNewGame,
}: CelebrationScreenProps) {
	// Define confetti colors directly to avoid dynamic class names
	const confettiColors = [
		'bg-primary',
		'bg-secondary',
		'bg-accent',
		'bg-success',
	];

	return (
		<div className='fixed inset-0 bg-success/70 backdrop-blur-sm flex flex-col items-center justify-center text-center z-50 p-4'>
			<div className='card w-full max-w-xs sm:max-w-sm md:max-w-md bg-base-300 shadow-xl animate-bounce-in overflow-hidden'>
				<div className='card-body items-center p-4 sm:p-6'>
					<div className='badge badge-success gap-2 p-2 sm:p-4 mb-2 sm:mb-4'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							className='inline-block w-4 h-4 sm:w-6 sm:h-6 stroke-current'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
							></path>
						</svg>
						<span className='text-sm sm:text-xl'>
							PERFECT GAME!
						</span>
					</div>

					<h2 className='card-title text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2'>
						You shut the box!
					</h2>
					<p className='text-3xl sm:text-4xl md:text-5xl font-bold text-success mb-4 sm:mb-6'>
						Score: 0
					</p>

					<div className='card-actions justify-center'>
						{isMultiplayer ? (
							<button
								onClick={onContinue}
								className='btn btn-primary sm:btn-lg'
							>
								Continue
							</button>
						) : (
							<button
								onClick={onNewGame}
								className='btn btn-primary sm:btn-lg'
							>
								Play Again
							</button>
						)}
					</div>

					<div className='mt-4 relative w-full h-0 overflow-visible'>
						{/* CSS-powered confetti animation */}
						{Array.from({ length: 12 }).map((_, i) => (
							<div
								key={i}
								className={`absolute top-0 w-2 h-3 sm:w-3 sm:h-5 ${
									confettiColors[i % 4]
								} confetti-piece`}
								style={{
									left: `${i * 8 + Math.random() * 5}%`,
									animationDelay: `${Math.random() * 2}s`,
									animationDuration: `${
										3 + Math.random() * 3
									}s`,
								}}
							></div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
