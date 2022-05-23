import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { handler } from '../build/handler.js';

const port = 3000;
const app = express();
const server = createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
	socket.on('createGame', function (gameId) {
		socket.join(gameId);
		console.log(io.sockets.adapter.rooms);
	});

	socket.on('joinRoom', function (gameId) {
		const room = io.sockets.adapter.rooms.get(gameId);
		console.log(room);
		socket.join(room);
		console.log(io.sockets.adapter.rooms.get(gameId).size);
	});
});

app.use(handler);

server.listen(port);
