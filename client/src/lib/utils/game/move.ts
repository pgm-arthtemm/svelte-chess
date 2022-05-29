import { io } from 'socket.io-client';

const socket = io();

export const move = (gameId: string, move: string, initPos: string): void => {
	socket.emit('move', {
		gameId,
		move,
		initPos
	});
};
