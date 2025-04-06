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
	return (
		<div className='fixed inset-0 bg-success/70 backdrop-blur-sm flex flex-col items-center justify-center text-center z-50'>
			<div className='card w-full max-w-md bg-base-300 shadow-xl animate-bounce-in'>
				<div className='card-body items-center'>
					<div className='badge badge-success gap-2 p-4 mb-4'>
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
								d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
							></path>
						</svg>
						<span className='text-xl'>PERFECT GAME!</span>
					</div>

					<h2 className='card-title text-3xl mb-2'>
						You shut the box!
					</h2>
					<p className='text-5xl font-bold text-success mb-6'>
						Score: 0
					</p>

					<div className='card-actions justify-center'>
						{isMultiplayer ? (
							<button
								onClick={onContinue}
								className='btn btn-primary btn-lg'
							>
								Continue
							</button>
						) : (
							<button
								onClick={onNewGame}
								className='btn btn-primary btn-lg'
							>
								Play Again
							</button>
						)}
					</div>

					<div className='mt-4'>
						<div className='confetti-container'>
							{/* CSS-powered confetti animation */}
							{Array.from({ length: 20 }).map((_, i) => (
								<div
									key={i}
									className={`confetti-piece bg-${
										[
											'primary',
											'secondary',
											'accent',
											'success',
										][i % 4]
									}`}
									style={{
										left: `${Math.random() * 100}%`,
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
		</div>
	);
}
