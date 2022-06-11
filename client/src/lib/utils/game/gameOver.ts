import { io } from 'socket.io-client';

const socket = io();

export const gameOver = (gameId: string, username: string, color: string) => {
	socket.emit('gameOver', {
		gameId,
		username,
		color
	});
};
