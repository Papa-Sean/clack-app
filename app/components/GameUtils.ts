// Helper functions for the game

export interface Player {
	name: string;
	score: number;
	hasPlayed: boolean;
}

export interface Tile {
	value: number;
	active: boolean;
}

// Find the next player who hasn't played yet
export const findNextPlayerIndex = (
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
export const hasValidMove = (tiles: Tile[], diceValues: number[]) => {
	const activeTileValues = tiles
		.filter((tile) => tile.active)
		.map((tile) => tile.value);

	const diceSum = diceValues[0] + (diceValues[1] || 0);

	// Check if any combination of active tiles sums to the dice total
	return (
		activeTileValues.some((value) => value === diceSum) ||
		activeTileValues.some((v1, i) =>
			activeTileValues.some((v2, j) => i !== j && v1 + v2 === diceSum)
		)
	);
};

// Fisher-Yates shuffle algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
};

// Get winner information
export const getWinner = (players: Player[]) => {
	if (players.length === 0) return null;

	return players.reduce((prev, current) =>
		current.score < prev.score ? current : prev
	);
};
