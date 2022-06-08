export const movesConvert = (moves: string) => {
	const movesArray = moves.split(',');

	const pairs = [];
	for (let i = 0; i < movesArray.length; i += 2) {
		pairs.push({
			from: movesArray[i],
			to: movesArray[i + 1]
		});
	}

	return pairs;
};
