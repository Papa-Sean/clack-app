interface ScoreDisplayProps {
	score: number;
}

export default function ScoreDisplay({ score }: ScoreDisplayProps) {
	return (
		<div className='score-display'>
			<h2>Score: {score}</h2>
		</div>
	);
}
