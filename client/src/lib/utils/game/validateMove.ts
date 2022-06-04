export const validateMove = (
	startPos: string,
	newPos: string,
	piece: string,
	color: string
): boolean => {
	const startRank = parseInt(startPos.charAt(1), 10);
	const startFile = startPos.charAt(0);

	const newRank = parseInt(newPos.charAt(1), 10);
	const newFile = newPos.charAt(0);

	switch (piece) {
		case 'pawn':
			if (color === 'white') {
				if (startRank === 2) {
					if (
						(newRank === 4 && startFile === newFile) ||
						(newRank === 3 && startFile === newFile)
					) {
						return true;
					}
				} else if (newRank === startRank + 1 && startFile === newFile) {
					return true;
				}
			} else if (color === 'black') {
				if (startRank === 7) {
					if (
						(newRank === 5 && startFile === newFile) ||
						(newRank === 6 && startFile === newFile)
					) {
						return true;
					}
				} else if (newRank === startRank - 1 && newFile === startFile) {
					return true;
				}
			}
			break;
	}
};
