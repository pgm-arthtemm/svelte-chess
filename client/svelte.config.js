import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import { Server } from 'socket.io';

export const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server) {
		const io = new Server(server.httpServer);

		io.on('connect', (socket) => {
			socket.on('createGame', (status) => {
				console.log('Created game', status);
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
