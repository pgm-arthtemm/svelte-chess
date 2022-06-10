import { io } from 'socket.io-client';

const socket = io();

export const confirmDraw = (gameId: string) => {
	socket.emit('confirmDraw', gameId);
};
