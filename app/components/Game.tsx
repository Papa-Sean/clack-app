import { useState, useEffect, useCallback } from 'react';
import PlayerSetup from './PlayerSetup';
import GameBoard from './screens/GameBoard';
import NextPlayerScreen from './screens/NextPlayerScreen';
import FinalResultsScreen from './screens/FinalResultsScreen';
import GameOverScreen from './screens/GameOverScreen';
import CelebrationScreen from './screens/CelebrationScreen';
import CountdownOverlay from './overlays/CountdownOverlay';
import {
	Player,
	Tile,
	findNextPlayerIndex,
	hasValidMove,
	shuffleArray,
} from './GameUtils';

export default function Game() {
	// Game state
	const [tiles, setTiles] = useState<Tile[]>(
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

	// Handle game end (when countdown reaches 0) - MOVED THIS UP
	const handleGameEnd = useCallback(() => {
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
	}, [
		players,
		currentPlayerIndex,
		score,
		setPlayers,
		setCurrentPlayerIndex,
		setGameState,
	]);

	// Calculate score whenever tiles change
	useEffect(() => {
		if (gameState === 'setup' || gameState === 'nextPlayer') return;

		const newScore = tiles.reduce(
			(sum, tile) => (tile.active ? sum + tile.value : sum),
			0
		);
		setScore(newScore);

		// Check if game is over (no valid moves)
		if (gameState === 'selecting' && !hasValidMove(tiles, diceValues)) {
			setGameState('countdown'); // Start countdown instead of going straight to game over
			setCountdown(5); // Reset countdown to 5
		}

		// Check for perfect game
		if (newScore === 0) {
			setGameState('celebration');
		}
	}, [tiles, gameState, diceValues]);

	// Handle countdown timer
	useEffect(() => {
		let timer: NodeJS.Timeout;

		if (gameState === 'countdown' && countdown > 0) {
			timer = setTimeout(() => {
				setCountdown(countdown - 1);
			}, 1000);
		} else if (gameState === 'countdown' && countdown === 0) {
			handleGameEnd();
		}

		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [gameState, countdown, handleGameEnd]);

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

	// Handle celebration continue
	const handleCelebrationContinue = () => {
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
	};

	// Render different game states with a smooth transition
	const renderGameState = () => {
		switch (gameState) {
			case 'setup':
				return (
					<div className='transition-all duration-500 animate-fade-in'>
						<PlayerSetup onSubmit={handlePlayerSetup} />
					</div>
				);

			case 'nextPlayer':
				return (
					<div className='transition-all duration-500 animate-slide-up'>
						<NextPlayerScreen
							player={players[currentPlayerIndex]}
							onStartTurn={startNextPlayerTurn}
						/>
					</div>
				);

			case 'finalResults':
				return (
					<div className='transition-all duration-500 animate-slide-up'>
						<FinalResultsScreen
							players={players}
							onNewGame={newGame}
						/>
					</div>
				);

			default:
				return (
					<div className='transition-all duration-300'>
						<GameBoard
							tiles={tiles}
							diceValues={diceValues}
							score={score}
							selectedTiles={selectedTiles}
							players={players}
							currentPlayerIndex={currentPlayerIndex}
							gameState={gameState}
							onTileClick={handleTileClick}
							onRoll={rollDice}
							onNewGame={newGame}
						/>

						{gameState === 'countdown' && (
							<CountdownOverlay countdown={countdown} />
						)}

						{gameState === 'gameOver' && (
							<GameOverScreen
								score={score}
								onNewGame={newGame}
							/>
						)}

						{gameState === 'celebration' && (
							<CelebrationScreen
								isMultiplayer={players.length > 0}
								onContinue={handleCelebrationContinue}
								onNewGame={newGame}
							/>
						)}
					</div>
				);
		}
	};

	return (
		<div className='min-h-screen bg-base-100 flex flex-col justify-center items-center p-4'>
			{renderGameState()}
		</div>
	);
}
