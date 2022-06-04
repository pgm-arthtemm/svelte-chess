export const timeConvert = (minutes: number): string => {
	// convert minutes to hh:mm:ss
	const hours = Math.floor(minutes / 60);
	const minutesLeft = minutes % 60;
	const seconds = Math.floor((minutesLeft % 1) * 60);

	if (hours === 0) {
		return `${minutesLeft < 10 ? '0' : ''}${minutesLeft}:${seconds < 10 ? '0' : ''}${seconds}`;
	}

	return `${hours}:${minutesLeft < 10 ? '0' : ''}${minutesLeft}:${
		seconds < 10 ? '0' : ''
	}${seconds}`;
};
