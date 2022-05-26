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
	<div class="block md:hidden">
		<!-- add time stats components here -->
		<Board />
		<Box style="mt-4" title="Actions" />
		<Box style="mt-4" title="Moves played" />
		<Box style="mt-4" gameId={$page.params.id} title="Chat with your opponent" textInput={true} />
		<!-- add time stats components here -->
	</div>

	<div class="hidden md:block xl:hidden">
		<div class="hidden md:flex justify-between xl:hidden">
			<Box
				style="w-[calc(33% - 1rem)] w-max-[calc(33% - 1rem)]"
				gameId={$page.params.id}
				title="Chat with your opponent"
				textInput={true}
			/>
			<Board />
		</div>
		<div class="md:flex justify-between mt-4">
			<Box style="w-[calc(50%-0.5rem)]" title="Actions" />
			<Box style="w-[calc(50%-0.5rem)]" title="Moves played" />
		</div>
	</div>

	<div class="hidden xl:flex justify-between 2xl:hidden">
		<Box
			style="w-1/6 w-max-1-6"
			gameId={$page.params.id}
			title="Chat with your opponent"
			textInput={true}
		/>
		<Board />
		<div class="w-1/5">
			<Box title="Actions" />
			<Box title="Moves played" />
		</div>
	</div>

	<div class="hidden 2xl:flex justify-between">
		<Box
			style="w-1/5 w-max-1/5"
			gameId={$page.params.id}
			title="Chat with your opponent"
			textInput={true}
		/>
		<Board />
		<div class="w-1/4">
			<Box title="Actions" />
			<Box title="Moves played" />
		</div>
	</div>
{/if}
