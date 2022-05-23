<script lang="ts">
	import { page } from '$app/stores';
	import { io } from 'socket.io-client';

	const socket = io();

	const joinRoom = (): void => {
		const gameId = $page.params.id;
		socket.emit('joinRoom', gameId);
	};

	const getRoomSize = (): void => {
		const gameId = $page.params.id;
		socket.emit('getRoomSize', gameId);
	};
</script>

<div>
	<p>{`http://localhost:3000/game/${$page.params.id}`}</p>

	<button on:click={joinRoom}>GET ROOM</button>

	<button on:click={getRoomSize}>GET ROOM SIZE</button>
</div>
