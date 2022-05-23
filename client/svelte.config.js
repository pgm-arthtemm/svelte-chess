import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import { Server } from 'socket.io';

export const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server) {
		const io = new Server(server.httpServer);

		io.on('connection', (socket) => {
			socket.on('createGame', function (gameId) {
				socket.join(gameId);
				console.log(io.sockets.adapter.rooms);
			});

			socket.on('joinRoom', function (gameId) {
				const room = io.sockets.adapter.rooms.get(gameId);
				socket.join(room);
				console.log(io.sockets.adapter.rooms.get(gameId).size);
			});

			socket.on('getRoomSize', function (gameId) {
				const roomSize = io.sockets.adapter.rooms.get(gameId).size;
				console.log(roomSize);
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
