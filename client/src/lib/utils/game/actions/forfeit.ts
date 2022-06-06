import { io } from 'socket.io-client';

const socket = io();

export const forfeit = (gameId: string, username: string, color: string) => {
	socket.emit('forfeit', { gameId, username, color });
};
