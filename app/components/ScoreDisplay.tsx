interface ScoreDisplayProps {
	score: number;
}

export default function ScoreDisplay({ score }: ScoreDisplayProps) {
	return (
		<div className='stats shadow w-full bg-base-300'>
			<div className='stat'>
				<div className='stat-title text-center text-base-content'>
					Score
				</div>
				<div className='stat-value text-center text-4xl font-bold text-accent'>
					{score}
				</div>
				<div className='stat-desc text-center'>
					{score === 0 ? 'Perfect!' : 'Remaining tiles'}
				</div>
			</div>
		</div>
	);
}
