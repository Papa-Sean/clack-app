import { Player } from '../GameUtils';

interface NextPlayerScreenProps {
	player: Player;
	onStartTurn: () => void;
}

export default function NextPlayerScreen({
	player,
	onStartTurn,
}: NextPlayerScreenProps) {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center text-center p-4'>
			<div className='card w-96 bg-base-200 shadow-xl'>
				<div className='card-body'>
					<h2 className='card-title text-3xl text-primary justify-center'>
						Next Player
					</h2>
					<div className='py-6'>
						<h3 className='text-2xl text-secondary mb-2'>
							{player.name}'s Turn
						</h3>
						<p className='text-accent'>
							Get ready to shut the box!
						</p>
					</div>
					<div className='card-actions justify-center'>
						<button
							onClick={onStartTurn}
							className='btn btn-primary btn-lg neon-flicker'
						>
							Start Turn
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
