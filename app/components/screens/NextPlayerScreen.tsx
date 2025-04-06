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
			<div className='card w-full max-w-xs sm:max-w-sm md:max-w-md bg-base-200 shadow-xl'>
				<div className='card-body p-4 sm:p-6'>
					<h2 className='card-title text-xl sm:text-2xl md:text-3xl text-primary justify-center'>
						Next Player
					</h2>
					<div className='py-3 sm:py-6'>
						<h3 className='text-lg sm:text-xl md:text-2xl text-secondary mb-1 sm:mb-2'>
							{player.name}&apos;s Turn
						</h3>
						<p className='text-accent text-sm sm:text-base'>
							Get ready to shut the box!
						</p>
					</div>
					<div className='card-actions justify-center'>
						<button
							onClick={onStartTurn}
							className='btn w-full sm:w-auto btn-primary sm:btn-lg neon-flicker'
						>
							Start Turn
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
