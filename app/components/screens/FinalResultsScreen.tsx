import { Player, getWinner } from '../GameUtils';

interface FinalResultsScreenProps {
	players: Player[];
	onNewGame: () => void;
}

export default function FinalResultsScreen({
	players,
	onNewGame,
}: FinalResultsScreenProps) {
	const winner = getWinner(players);

	return (
		<div className='min-h-screen flex items-center justify-center p-4'>
			<div className='card w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-base-200 shadow-xl'>
				<div className='card-body p-4 sm:p-6'>
					<h2 className='card-title text-primary text-center text-2xl sm:text-3xl md:text-4xl justify-center mb-4 sm:mb-6'>
						Game Results
					</h2>

					<div className='card bg-base-300 mb-4 sm:mb-6'>
						<div className='card-body p-3 sm:p-4 text-center'>
							<h3 className='card-title text-xl sm:text-2xl text-secondary m-0 justify-center'>
								🏆 Winner: {winner?.name} 🏆
							</h3>
							<p className='text-accent text-lg'>
								Score: {winner?.score}
							</p>
						</div>
					</div>

					<div className='overflow-x-auto'>
						<table className='table table-zebra w-full'>
							<thead>
								<tr>
									<th className='text-center text-base-content'>
										Player
									</th>
									<th className='text-center text-base-content'>
										Score
									</th>
								</tr>
							</thead>
							<tbody>
								{players
									.sort((a, b) => a.score - b.score)
									.map((player, index) => (
										<tr
											key={index}
											className={
												player === winner
													? 'font-bold bg-primary/10'
													: ''
											}
										>
											<td className='text-center'>
												{player.name}
											</td>
											<td className='text-center'>
												{player.score}
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>

					<div className='card-actions justify-center mt-4 sm:mt-6'>
						<button
							onClick={onNewGame}
							className='btn btn-primary btn-lg'
						>
							New Game
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
