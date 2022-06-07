import { io } from 'socket.io-client';

const socket = io();

export const move = (gameId: string, move: string, initPos: string, take: boolean): void => {
	socket.emit('move', {
		gameId,
		move,
		initPos,
		take
	});
};
