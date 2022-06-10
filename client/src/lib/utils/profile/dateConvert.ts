export const dateConvert = (date: string) => {
	const year = date.split('-')[0];
	let month = date.split('-')[1];
	let day = date.split('-')[2].substring(0, 2);

	if (month.charAt(0) === '0') {
		month = month.substring(1);
	}
	if (day.charAt(0) === '0') {
		day = day.substring(1);
	}

	return `${day}/${month}/${year}`;
};
