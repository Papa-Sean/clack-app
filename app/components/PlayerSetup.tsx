import { useState } from 'react';
import GameRules from './GameRules';

interface PlayerSetupProps {
	onSubmit: (playerNames: string[], randomizeOrder: boolean) => void;
}

export default function PlayerSetup({ onSubmit }: PlayerSetupProps) {
	const [numPlayers, setNumPlayers] = useState<number | ''>(2);
	const [playerNames, setPlayerNames] = useState<string[]>([
		'',
		'',
	]);
	const [randomizeOrder, setRandomizeOrder] = useState(false);
	const [error, setError] = useState('');
	const [showRules, setShowRules] = useState(false);

	// Update number of players
	const handleNumPlayersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value =
			e.target.value === ''
				? ''
				: Math.max(1, Math.min(6, parseInt(e.target.value)));
		setNumPlayers(value);

		if (typeof value === 'number') {
			// Resize player names array
			const newNames = [...playerNames];
			if (value > playerNames.length) {
				// Add more players
				for (let i = playerNames.length + 1; i <= value; i++) {
					newNames.push(`Player ${i}`);
				}
			} else {
				// Remove excess players
				newNames.length = value;
			}
			setPlayerNames(newNames);
		}
	};

	// Update player name
	const handlePlayerNameChange = (index: number, name: string) => {
		const newNames = [...playerNames];
		newNames[index] = name;
		setPlayerNames(newNames);
	};

	// Handle form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Validate inputs
		if (playerNames.some((name) => name.trim() === '')) {
			setError('Player names cannot be empty');
			return;
		}

		onSubmit(playerNames, randomizeOrder);
	};

	return (
		<div className='min-h-screen flex flex-col items-center justify-center p-4'>
			<div className='card w-full max-w-xs sm:max-w-sm md:max-w-md bg-base-200 shadow-xl'>
				<div className='card-body p-4 sm:p-6'>
					<h1 className='card-title text-primary text-center text-2xl sm:text-3xl md:text-4xl neon-flicker justify-center mb-1'>
						Shut the Box / Clack
					</h1>
					<h2 className='text-center text-base-content text-lg sm:text-xl mb-4'>
						Player Setup
					</h2>

					<form
						onSubmit={handleSubmit}
						className='w-full flex flex-col gap-4 sm:gap-6'
					>
						<div className='form-control'>
							<label className='label'>
								<span className='label-text text-base-content font-bold'>
									Number of Players:
								</span>
							</label>
							<input
								type='number'
								min='1'
								max='6'
								value={numPlayers}
								onChange={handleNumPlayersChange}
								className='input input-bordered w-full bg-base-300 text-base-content'
							/>
						</div>

						<div className='divider divider-primary'>
							Enter Player Names
						</div>

						{playerNames.map((name, index) => (
							<div
								className='form-control'
								key={index}
							>
								<label className='label'>
									<span className='label-text text-base-content font-bold'>
										Player {index + 1}:
									</span>
								</label>
								<input
									type='text'
									value={name}
                                    placeholder = "Enter Name"
									onChange={(e) =>
										handlePlayerNameChange(
											index,
											e.target.value
										)
									}
									maxLength={20}
									className='input input-bordered w-full bg-base-300 text-base-content'
								/>
							</div>
						))}

						<div className='form-control'>
							<label className='label cursor-pointer justify-start gap-3'>
								<input
									type='checkbox'
									checked={randomizeOrder}
									onChange={(e) =>
										setRandomizeOrder(e.target.checked)
									}
									className='checkbox checkbox-primary'
								/>
								<span className='label-text text-primary font-bold'>
									Randomize Player Order
								</span>
							</label>
						</div>

						{error && (
							<div className='alert alert-error text-sm py-2'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='stroke-current shrink-0 h-5 w-5'
									fill='none'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
									/>
								</svg>
								<span>{error}</span>
							</div>
						)}

						<div className='flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2'>
							<button
								type='submit'
								className='btn btn-primary w-full sm:flex-1 sm:btn-lg neon-flicker'
							>
								Start Game
							</button>

							<button
								type='button'
								className='btn btn-secondary w-full sm:w-auto'
								onClick={() => setShowRules(true)}
							>
								House Rules
							</button>
						</div>
					</form>
				</div>
			</div>

			<GameRules
				isOpen={showRules}
				onClose={() => setShowRules(false)}
			/>
		</div>
	);
}
