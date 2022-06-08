export const movesConvert = (moves: string) => {
	const movesArray = moves.split(',');

	const movesArrayFixed = movesArray.map((move) => {
		if (move.length > 2) {
			return move.substring(1);
		} else {
			return move;
		}
	});

	const pairs = [];
	for (let i = 0; i < movesArrayFixed.length; i += 2) {
		pairs.push({
			from: movesArrayFixed[i],
			to: movesArrayFixed[i + 1]
		});
	}

	return pairs;
};
