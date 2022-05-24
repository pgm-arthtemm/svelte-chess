<script lang="ts">
	import { page } from '$app/stores';
	import { io } from 'socket.io-client';
	import Box from '$lib/components/box/Box.svelte';

	const socket = io();

	let accepted: boolean = false;

	const joinRoom = (): void => {
		socket.emit('joinRoom', $page.params.id);
		console.log('joinRoom');
	};

	const getRoomSize = (): void => {
		const gameId = $page.params.id;
		socket.emit('getRoomSize', gameId);
	};

	socket.on('roomFull', () => {
		// @TODO: Show error message
		console.log('room full');
	});

	socket.on('startGame', (data) => {
		console.log('START GAME');
		accepted = true;
	});

	socket.on('getMessage', (data) => {
		console.log(data);
	});
</script>

<div>
	<p class="text-white">{`http://localhost:3000/game/${$page.params.id}`}</p>
	<button class="text-white font-bold" on:click={joinRoom}>READY</button>
	<button on:click={getRoomSize}>GET ROOM SIZE</button>
</div>

{#if accepted}
	<Box gameId={$page.params.id} title="Chat with your opponent" textInput={true} />
{/if}
