<script lang="ts">
	import { page } from '$app/stores';
	import { io } from 'socket.io-client';

	const socket = io();

	const joinRoom = (): void => {
		const gameId = $page.params.id;
		socket.emit('getRoom', { gameId });
	};
</script>

<div>
	<button on:click={joinRoom}>JOIN ROOM</button>
</div>
