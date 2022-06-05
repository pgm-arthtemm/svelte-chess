export const timeConvert = (timeInSeconds: number): string => {
	const hours = Math.floor(timeInSeconds / 3600);
	const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
	const seconds = timeInSeconds - hours * 3600 - minutes * 60;

	if (hours === 0) {
		return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	}

	return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
