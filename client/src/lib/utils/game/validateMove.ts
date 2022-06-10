export const validateMove = (
	startPos: string,
	newPos: string,
	piece: string,
	color: string,
	take = false
): boolean => {
	const startRank = parseInt(startPos.charAt(1), 10);
	const startFile = startPos.charAt(0);
	const startFileN = startFile.charCodeAt(0) - 97;

	const newRank = parseInt(newPos.charAt(1), 10);
	const newFile = newPos.charAt(0);
	const newFileN = newFile.charCodeAt(0) - 97;

	switch (piece) {
		case 'pawn':
			if (color === 'white') {
				if (take) {
					if (newFileN === startFileN + 1 || newFileN === startFileN - 1) {
						if (newRank === startRank + 1) {
							return true;
						}
					}
				} else {
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
				}
			} else if (color === 'black') {
				if (take) {
					if (newFileN === startFileN + 1 || newFileN === startFileN - 1) {
						if (newRank === startRank - 1) {
							return true;
						}
					}
				} else {
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
			}
			break;
		case 'knight':
			if (
				(newRank === startRank + 2 && newFileN === startFileN + 1) ||
				(newRank === startRank + 2 && newFileN === startFileN - 1) ||
				(newRank === startRank - 2 && newFileN === startFileN + 1) ||
				(newRank === startRank - 2 && newFileN === startFileN - 1) ||
				(newRank === startRank + 1 && newFileN === startFileN + 2) ||
				(newRank === startRank + 1 && newFileN === startFileN - 2) ||
				(newRank === startRank - 1 && newFileN === startFileN + 2) ||
				(newRank === startRank - 1 && newFileN === startFileN - 2)
			) {
				return true;
			}
			break;
		case 'king':
			if (
				(newRank === startRank + 1 && newFileN === startFileN) ||
				(newRank === startRank - 1 && newFileN === startFileN) ||
				(newRank === startRank && newFileN === startFileN + 1) ||
				(newRank === startRank && newFileN === startFileN - 1) ||
				(newRank === startRank + 1 && newFileN === startFileN + 1) ||
				(newRank === startRank + 1 && newFileN === startFileN - 1) ||
				(newRank === startRank - 1 && newFileN === startFileN + 1) ||
				(newRank === startRank - 1 && newFileN === startFileN - 1)
			) {
				return true;
			}
			break;
		case 'rook':
			if ((newRank <= 8 && newFileN === startFileN) || (newFileN <= 8 && newRank === startRank)) {
				return true;
			}
			break;
		case 'bishop':
			if (
				(newFileN - startFileN) / (newRank - startRank) === 1 ||
				(newFileN - startFileN) / (newRank - startRank) === -1
			) {
				return true;
			}
			break;
		case 'queen':
			if (
				(newFileN - startFileN) / (newRank - startRank) === 1 ||
				(newFileN - startFileN) / (newRank - startRank) === -1 ||
				(newRank <= 8 && newFileN === startFileN) ||
				(newFileN <= 8 && newRank === startRank)
			) {
				return true;
			}
	}
};
