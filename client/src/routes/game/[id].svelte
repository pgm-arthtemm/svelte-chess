<script lang="ts">
	import { page } from '$app/stores';
	import { chat, username } from '../../stores';
	import { io } from 'socket.io-client';
	import Box from '$lib/components/box/Box.svelte';
	import Board from '$lib/components/game/board/Board.svelte';

	const socket = io();

	let usernameValue: string = '';

	let accepted: boolean = false;

	const joinRoom = (): void => {
		socket.emit('joinRoom', $page.params.id);
		if ($username === '') {
			$username = usernameValue;
		}
		console.log('joinRoom');
	};

	socket.on('roomFull', () => {
		// @TODO: Show error message
		console.log('room full');
	});

	socket.on('startGame', () => {
		console.log('START GAME');
		accepted = true;
	});

	socket.on('getMessage', (data) => {
		$chat = [...$chat, data];
	});
</script>

{#if !accepted}
	<div>
		{#if $username === ''}
			<div>
				<input bind:value={usernameValue} type="text" placeholder="username" />
			</div>
		{/if}

		<p class="text-white">{`http://localhost:3000/game/${$page.params.id}`}</p>
		<button class="text-white font-bold" on:click={joinRoom}>READY</button>
	</div>
{:else}
	<div class="block md:flex justify-between">
		<Box gameId={$page.params.id} title="Chat with your opponent" textInput={true} />
		<Board />
		<div>
			<Box title="Moves played" />
			<Box title="Actions" />
		</div>
	</div>
{/if}
