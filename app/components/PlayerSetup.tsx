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
		<div className='player-setup'>
			<h1>Shut the Box</h1>
			<h2>Player Setup</h2>

			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='numPlayers'>Number of Players:</label>
					<input
						type='number'
						id='numPlayers'
						min='1'
						max='6'
						value={numPlayers}
						onChange={handleNumPlayersChange}
					/>
				</div>

				<div className='player-names'>
					<h3>Enter Player Names</h3>
					{playerNames.map((name, index) => (
						<div
							className='form-group'
							key={index}
						>
							<label htmlFor={`player-${index + 1}`}>
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
							/>
						</div>
					))}
				</div>

				<div className='form-group checkbox'>
					<input
						type='checkbox'
						id='randomizeOrder'
						checked={randomizeOrder}
						onChange={(e) => setRandomizeOrder(e.target.checked)}
					/>
					<label htmlFor='randomizeOrder'>
						Randomize Player Order
					</label>
				</div>

				{error && <div className='error'>{error}</div>}

				<button
					type='submit'
					className='start-game-btn'
				>
					Start Game
				</button>
			</form>
		</div>
	);
}
