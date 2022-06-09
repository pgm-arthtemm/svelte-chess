export const movesConvert = (moves: string) => {
	const movesArray = moves.split(',');

	// const movesArrayFixed = movesArray.map((move) => {
	// 	if (move.length > 2) {
	// 		return move.substring(1);
	// 	} else {
	// 		return move;
	// 	}
	// });

	const pairs = [];
	for (let i = 0; i < movesArray.length; i += 2) {
		if (movesArray[i + 1] !== undefined) {
			pairs.push({
				from: movesArray[i],
				to: movesArray[i + 1]
			});
		}
	}

	return pairs;
};
