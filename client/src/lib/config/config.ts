const environment = process.env.NODE_ENV || 'development';

export const apiBaseUrl =
	environment === 'production'
		? 'https://svelte-chess-server.herokuapp.com'
		: 'http://localhost:4000';

export const timeOptions = {
	1: '1',
	2: '2',
	3: '3',
	4: '5',
	5: '7',
	6: '10',
	7: '12',
	8: '15',
	9: '25',
	10: '30',
	11: '45',
	12: '60',
	13: '90',
	14: '120',
	15: '180'
};
