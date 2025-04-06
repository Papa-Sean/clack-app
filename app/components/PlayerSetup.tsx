import { useState } from 'react';

interface PlayerSetupProps {
	onSubmit: (playerNames: string[], randomizeOrder: boolean) => void;
}

export default function PlayerSetup({ onSubmit }: PlayerSetupProps) {
	const [numPlayers, setNumPlayers] = useState<number | ''>(2);
	const [playerNames, setPlayerNames] = useState<string[]>([
		'Player 1',
		'Player 2',
	]);
	const [randomizeOrder, setRandomizeOrder] = useState(false);
	const [error, setError] = useState('');

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
		<div className='flex flex-col items-center gap-6 max-w-[500px] mx-auto p-8 bg-white rounded-lg shadow-lg'>
			<h1 className='text-gray-800 mb-0'>Shut the Box</h1>
			<h2 className='text-gray-600 mt-0'>Player Setup</h2>

			<form
				onSubmit={handleSubmit}
				className='w-full flex flex-col gap-6'
			>
				<div className='flex flex-col gap-2'>
					<label
						htmlFor='numPlayers'
						className='font-bold text-gray-600'
					>
						Number of Players:
					</label>
					<input
						type='number'
						id='numPlayers'
						min='1'
						max='6'
						value={numPlayers}
						onChange={handleNumPlayersChange}
						className='p-3 border border-gray-300 rounded-md text-base'
					/>
				</div>

				<div className='flex flex-col gap-4 w-full'>
					<h3 className='m-0 text-gray-600'>Enter Player Names</h3>
					{playerNames.map((name, index) => (
						<div
							className='flex flex-col gap-2'
							key={index}
						>
							<label
								htmlFor={`player-${index + 1}`}
								className='font-bold text-gray-600'
							>
								Player {index + 1}:
							</label>
							<input
								type='text'
								id={`player-${index + 1}`}
								value={name}
								onChange={(e) =>
									handlePlayerNameChange(
										index,
										e.target.value
									)
								}
								maxLength={20}
								className='p-3 border border-gray-300 rounded-md text-base'
							/>
						</div>
					))}
				</div>

				<div className='flex flex-row items-center gap-3'>
					<input
						type='checkbox'
						id='randomizeOrder'
						checked={randomizeOrder}
						onChange={(e) => setRandomizeOrder(e.target.checked)}
						className='w-5 h-5'
					/>
					<label
						htmlFor='randomizeOrder'
						className='font-bold text-primary'
					>
						Randomize Player Order
					</label>
				</div>

				{error && <div className='text-red-600 font-bold'>{error}</div>}

				<button
					type='submit'
					className='bg-green-500 text-white text-lg font-bold py-3 border-none rounded 
								cursor-pointer mt-4 transition-colors hover:bg-green-700'
				>
					Start Game
				</button>
			</form>
		</div>
	);
}
