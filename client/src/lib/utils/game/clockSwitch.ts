import { io } from 'socket.io-client';

const socket = io();

export const clockSwitch = (gameId: string, username: string): void => {
	socket.emit('clockSwitch', { gameId, username });
};
