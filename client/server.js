import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { handler } from './build/handler.js';

const app = express();
const port = process.env.PORT || 3000;
const server = createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
	socket.on('createGame', (gameId) => {
		socket.join(gameId);
	});

	socket.on('joinRoom', (gameId) => {
		const room = io.sockets.adapter.rooms.get(gameId);
		if (room) {
			socket.join(gameId);
			const roomSize = io.sockets.adapter.rooms.get(gameId).size;
			if (roomSize === 3) {
				io.in(gameId).emit('startGame');
			}
		} else {
			socket.emit('gameNotFound');
		}
	});

	socket.on('sendMessage', (data) => {
		io.in(data.gameId).emit('getMessage', data);
	});

	socket.on('chosenColor', (data) => {
		socket.broadcast.to(data.gameId).emit('getColor', data.color);
	});

	socket.on('chosenTimeSettings', (data) => {
		socket.broadcast.to(data.gameId).emit('getTimeSettings', data);
	});

	socket.on('move', (data) => {
		io.in(data.gameId).emit('getMove', data);
	});

	socket.on('getStarter', (data) => {
		io.in(data.gameId).emit('getStaringPlayer', data.playerMove);
	});

	socket.on('opponentName', (data) => {
		io.in(data.gameId).emit('getOpponentName', data.name);
	});

	socket.on('clockSwitch', (data) => {
		io.in(data.gameId).emit('getClockSwitch', data.username);
	});

	socket.on('forfeit', (data) => {
		socket.broadcast.to(data.gameId).emit('getForfeit', data);
	});
});

app.use(handler);

server.listen(port);
