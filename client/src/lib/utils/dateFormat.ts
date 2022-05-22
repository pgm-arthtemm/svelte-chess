export const dateFormat = (date: Date): string => {
	const month = date.toLocaleString('default', { month: 'long' });
	const monthName = month.charAt(0).toUpperCase() + month.slice(1);
	const day = date.getDate();
	const year = date.getFullYear();
	const yearStr = year.toString().substring(2, 4);
	return `${monthName} ${day}, '${yearStr}`;
};
