import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import { Server } from 'socket.io';

export const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server) {
		const io = new Server(server.httpServer);

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
		});
	}
};

const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			plugins: [webSocketServer]
		}
	}
};

export default config;
