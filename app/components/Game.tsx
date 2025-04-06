import { useState, useEffect } from 'react';
import Tile from './Tile';
import Dice from './Dice';
import ScoreDisplay from './ScoreDisplay';
import ActionButtons from './ActionButtons';
import PlayerSetup from './PlayerSetup';

// Define player interface
interface Player {
	name: string;
	score: number;
	hasPlayed: boolean;
}

export default function Game() {
	// Game state
	const [tiles, setTiles] = useState(
		Array(9)
			.fill(null)
			.map((_, i) => ({
				value: i + 1,
				active: true,
			}))
	);
	const [diceValues, setDiceValues] = useState([0, 0]);
	const [gameState, setGameState] = useState('setup'); // 'setup', 'rolling', 'selecting', 'gameOver', 'countdown', 'celebration', 'nextPlayer'
	const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
	const [score, setScore] = useState(45); // Sum of all active tiles (1+2+3+4+5+6+7+8+9 = 45)
	const [countdown, setCountdown] = useState(5); // Countdown from 5 seconds

	// Player management
	const [players, setPlayers] = useState<Player[]>([]);
	const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

	// Calculate score whenever tiles change
	useEffect(() => {
		if (gameState === 'setup' || gameState === 'nextPlayer') return;

		const newScore = tiles.reduce(
			(sum, tile) => (tile.active ? sum + tile.value : sum),
			0
		);
		setScore(newScore);

		// Check if game is over (no valid moves)
		if (gameState === 'selecting' && !hasValidMove()) {
			setGameState('countdown'); // Start countdown instead of going straight to game over
			setCountdown(5); // Reset countdown to 5
		}

		// Check for perfect game
		if (newScore === 0) {
			setGameState('celebration');
		}
	}, [tiles, gameState]);

	// Handle countdown timer
	useEffect(() => {
		let timer: NodeJS.Timeout;

		if (gameState === 'countdown' && countdown > 0) {
			timer = setTimeout(() => {
				setCountdown(countdown - 1);
			}, 1000);
		} else if (gameState === 'countdown' && countdown === 0) {
			// Save current player's score
			if (players.length > 0) {
				const updatedPlayers = [...players];
				updatedPlayers[currentPlayerIndex] = {
					...updatedPlayers[currentPlayerIndex],
					score: score,
					hasPlayed: true,
				};
				setPlayers(updatedPlayers);

				// Check if all players have played
				const nextPlayerIndex = findNextPlayerIndex(
					currentPlayerIndex,
					updatedPlayers
				);
				if (nextPlayerIndex === -1) {
					setGameState('finalResults');
				} else {
					setCurrentPlayerIndex(nextPlayerIndex);
					setGameState('nextPlayer');
				}
			} else {
				setGameState('gameOver');
			}
		}

		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [gameState, countdown, players, currentPlayerIndex, score]);

	// Find the next player who hasn't played yet
	const findNextPlayerIndex = (
		currentIndex: number,
		playerList: Player[]
	): number => {
		for (let i = 1; i <= playerList.length; i++) {
			const index = (currentIndex + i) % playerList.length;
			if (!playerList[index].hasPlayed) {
				return index;
			}
		}
		return -1; // All players have played
	};

	// Check if there are valid moves available
	const hasValidMove = () => {
		const activeTileValues = tiles
			.filter((tile) => tile.active)
			.map((tile) => tile.value);

		const diceSum = diceValues[0] + (diceValues[1] || 0);

		// Check if any combination of active tiles sums to the dice total
		// This is a simplified check that doesn't handle all combinations
		return (
			activeTileValues.some((value) => value === diceSum) ||
			activeTileValues.some((v1, i) =>
				activeTileValues.some((v2, j) => i !== j && v1 + v2 === diceSum)
			)
		);
	};

	// Roll the dice
	const rollDice = () => {
		// Determine if we need one or two dice
		const useOneDie = tiles
			.filter((tile) => tile.active)
			.every((tile) => tile.value > 6);

		const die1 = Math.floor(Math.random() * 6) + 1;
		const die2 = useOneDie ? 0 : Math.floor(Math.random() * 6) + 1;

		setDiceValues([die1, die2]);
		setGameState('selecting');
		setSelectedTiles([]);
	};

	// Handle tile selection
	const handleTileClick = (index: number) => {
		if (gameState !== 'selecting' || !tiles[index].active) return;

		const newSelectedTiles = selectedTiles.includes(index)
			? selectedTiles.filter((i) => i !== index)
			: [...selectedTiles, index];

		setSelectedTiles(newSelectedTiles);

		// Check if selection is valid
		const sum = newSelectedTiles.reduce(
			(total, i) => total + tiles[i].value,
			0
		);
		const diceSum = diceValues[0] + (diceValues[1] || 0);

		// If sum matches dice, flip tiles
		if (sum === diceSum) {
			const newTiles = [...tiles];
			newSelectedTiles.forEach((i) => {
				newTiles[i] = { ...newTiles[i], active: false };
			});
			setTiles(newTiles);
			setSelectedTiles([]);
			setGameState('rolling');
		}
	};

	// Start a new game
	const newGame = () => {
		setGameState('setup');
		setPlayers([]);
		setCurrentPlayerIndex(0);
	};

	// Start the next player's turn
	const startNextPlayerTurn = () => {
		setTiles(
			Array(9)
				.fill(null)
				.map((_, i) => ({
					value: i + 1,
					active: true,
				}))
		);
		setDiceValues([0, 0]);
		setGameState('rolling');
		setSelectedTiles([]);
		setScore(45);
		setCountdown(5);
	};

	// Handle player setup submission
	const handlePlayerSetup = (
		playerNames: string[],
		randomizeOrder: boolean
	) => {
		let newPlayers = playerNames.map((name) => ({
			name,
			score: 0,
			hasPlayed: false,
		}));

		// Randomize player order if selected
		if (randomizeOrder) {
			newPlayers = shuffleArray(newPlayers);
		}

		setPlayers(newPlayers);
		setCurrentPlayerIndex(0);
		setGameState('rolling');
	};

	// Fisher-Yates shuffle algorithm
	const shuffleArray = <T,>(array: T[]): T[] => {
		const newArray = [...array];
		for (let i = newArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
		}
		return newArray;
	};

	// Get winner information
	const getWinner = () => {
		if (players.length === 0) return null;

		return players.reduce((prev, current) =>
			current.score < prev.score ? current : prev
		);
	};

	// Render different game states
	if (gameState === 'setup') {
		return <PlayerSetup onSubmit={handlePlayerSetup} />;
	}

	if (gameState === 'nextPlayer') {
		return (
			<div className='next-player-screen'>
				<h2>Next Player</h2>
				<div className='player-info'>
					<h3>{players[currentPlayerIndex].name}'s Turn</h3>
					<p>Get ready to shut the box!</p>
				</div>
				<button onClick={startNextPlayerTurn}>Start Turn</button>
			</div>
		);
	}

	if (gameState === 'finalResults') {
		const winner = getWinner();

		return (
			<div className='final-results'>
				<h2>Game Results</h2>
				<div className='winner-info'>
					<h3>🏆 Winner: {winner?.name} 🏆</h3>
					<p>Score: {winner?.score}</p>
				</div>
				<div className='all-scores'>
					<h3>All Scores</h3>
					<ul>
						{players
							.sort((a, b) => a.score - b.score)
							.map((player, index) => (
								<li
									key={index}
									className={
										player === winner ? 'winner' : ''
									}
								>
									{player.name}: {player.score}
								</li>
							))}
					</ul>
				</div>
				<button onClick={newGame}>New Game</button>
			</div>
		);
	}

	return (
		<div className='game-container'>
			<h1>Shut the Box</h1>

			{players.length > 0 && (
				<div className='current-player'>
					<h2>Player: {players[currentPlayerIndex].name}</h2>
				</div>
			)}

			<div className='tiles-container'>
				{tiles.map((tile, index) => (
					<Tile
						key={index}
						value={tile.value}
						active={tile.active}
						selected={selectedTiles.includes(index)}
						onClick={() => handleTileClick(index)}
					/>
				))}
			</div>

			<Dice values={diceValues} />

			<ScoreDisplay score={score} />

			<ActionButtons
				onRoll={rollDice}
				onNewGame={newGame}
				gameState={gameState}
			/>

			{gameState === 'countdown' && (
				<div className='countdown-overlay'>
					<h2>The numbers ain't numbering, Will Hunting...</h2>
					<p>Game ending in: {countdown}</p>
				</div>
			)}

			{gameState === 'gameOver' && (
				<div className='game-over'>
					<h2>Game Over!</h2>
					<p>Your final score: {score}</p>
					<button onClick={newGame}>Play Again</button>
				</div>
			)}

			{gameState === 'celebration' && (
				<div className='celebration'>
					<h2>Perfect Game!</h2>
					<p>You shut the box! Score: 0</p>
					{players.length > 0 ? (
						<button
							onClick={() => {
								// Save current player's score
								const updatedPlayers = [...players];
								updatedPlayers[currentPlayerIndex] = {
									...updatedPlayers[currentPlayerIndex],
									score: 0,
									hasPlayed: true,
								};
								setPlayers(updatedPlayers);

								// Check if all players have played
								const nextPlayerIndex = findNextPlayerIndex(
									currentPlayerIndex,
									updatedPlayers
								);
								if (nextPlayerIndex === -1) {
									setGameState('finalResults');
								} else {
									setCurrentPlayerIndex(nextPlayerIndex);
									setGameState('nextPlayer');
								}
							}}
						>
							Continue
						</button>
					) : (
						<button onClick={newGame}>Play Again</button>
					)}
				</div>
			)}
		</div>
	);
}
