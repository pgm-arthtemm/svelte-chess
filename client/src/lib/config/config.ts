export const apiBaseUrl = 'http://localhost:4000';

export const gameModes = [
	{
		name: 'Bullet',
		description: 'Each player can have 1 or 2 minutes',
		times: [1, 2]
	},
	{
		name: 'Blitz',
		description: 'Each player can have between 3 and 14 minutes',
		times: [3, 5, 7, 10, 14]
	},
	{
		name: 'Rapid',
		description: 'Each player can have between 15 and 30 minutes',
		times: [15, 20, 30]
	},
	{
		name: 'Classical',
		description: 'Each player can have between 45 and 60 minutes',
		times: [45, 50, 55, 60, 70, 90]
	}
];
