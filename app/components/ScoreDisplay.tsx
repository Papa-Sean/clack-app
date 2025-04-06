interface ScoreDisplayProps {
	score: number;
}

export default function ScoreDisplay({ score }: ScoreDisplayProps) {
	return (
		<div className='stats shadow w-full bg-base-300 transition-all duration-300 hover:shadow-lg'>
			<div className='stat'>
				<div className='stat-title text-center text-base-content'>
					Score
				</div>
				<div
					className={`
          stat-value text-center text-4xl font-bold
          ${score === 0 ? 'text-success animate-pulse' : 'text-accent'} 
          transition-colors duration-300
        `}
				>
					{score}
				</div>
				<div className='stat-desc text-center'>
					{score === 0
						? '🎉 Perfect! 🎉'
						: score < 10
						? 'Almost there!'
						: 'Remaining tiles'}
				</div>

				{/* Add a progress bar to make it more visual */}
				<progress
					className={`progress w-full mt-2 ${
						score === 0 ? 'progress-success' : 'progress-accent'
					}`}
					value={45 - score}
					max='45'
				></progress>
			</div>
		</div>
	);
}
