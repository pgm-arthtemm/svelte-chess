import { io } from 'socket.io-client';

const socket = io();

export const draw = (gameId: string, username: string) => {
	socket.emit('draw', { gameId, username });
};
