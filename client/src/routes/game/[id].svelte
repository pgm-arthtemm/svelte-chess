<script lang="ts">
	import { page } from '$app/stores';
	import { chat, usernameStore, selectedColor, moves } from '../../stores';
	import { io } from 'socket.io-client';
	import Box from '$lib/components/box/Box.svelte';
	import Board from '$lib/components/game/board/Board.svelte';

	const socket = io();

	let usernameValue: string = '';
	let userMove: boolean = false;
	let accepted: boolean = false;

	let startColor: string = $selectedColor;

	/**
	 * @TODO:
	 * CHANGE THIS TO FALSE BEFORE DEPLOYMENT
	 * READY = TRUE IS ONLY FOR TESTING
	 */
	let ready: boolean = false;

	const joinRoom = (): void => {
		socket.emit('joinRoom', $page.params.id);
		if ($usernameStore === '') {
			$usernameStore = usernameValue;
		}
		console.log('joinRoom');
	};

	socket.on('startGame', () => {
		socket.emit('chosenColor', { color: $selectedColor, gameId: $page.params.id });

		socket.on('getColor', (color: string) => {
			if (color !== null) {
				color === 'white' ? (startColor = 'black') : (startColor = 'white');
			}
			ready = true;
		});
		accepted = true;
	});

	socket.on('roomFull', () => {
		// @TODO: Show error message
		console.log('room full');
	});

	socket.on('getMessage', (data) => {
		$chat = [...$chat, data];
	});

	socket.on('getMove', (data) => {
		console.log('THIS IS THE DATA', data);
		$moves = [...$moves, data];
	});

	const changeTitle = (userMove: boolean): string => {
		if (userMove) {
			return 'Your turn';
		}
		return `Opponent's turn`;
	};
</script>

<svelte:head>
	<title>{changeTitle(userMove)} - Svelte Chess</title>
</svelte:head>

{#if !accepted}
	<div>
		{#if $usernameStore === ''}
			<div>
				<input bind:value={usernameValue} type="text" placeholder="username" />
			</div>
		{/if}

		<p class="text-white">{`http://localhost:3000/game/${$page.params.id}`}</p>
		<button class="text-white font-bold" on:click={joinRoom}>READY</button>
	</div>
{/if}

{#if accepted && ready}
	<!-- {#if accepted} -->
	<div class="block md:hidden">
		<!-- add time stats components here -->
		<Board color={startColor} />
		<Box style="mt-4" title="Actions" />
		<Box style="mt-4" title="Moves played" />
		<Box style="mt-4" gameId={$page.params.id} title="Chat with your opponent" textInput={true} />
		<!-- add time stats components here -->
	</div>

	<div class="hidden md:block xl:hidden">
		<div class="hidden md:flex justify-between xl:hidden">
			<Box
				style="w-[calc(33% - 1rem)] max-w-[32%]"
				gameId={$page.params.id}
				title="Chat with your opponent"
				textInput={true}
			/>
			<Board color={startColor} />
		</div>
		<div class="md:flex justify-between mt-4">
			<Box style="w-[calc(50%-0.5rem)]" title="Actions" />
			<Box style="w-[calc(50%-0.5rem)]" title="Moves played" />
		</div>
	</div>

	<div class="hidden xl:flex justify-between 2xl:hidden">
		<Box
			style="w-1/6 max-w-1/6"
			gameId={$page.params.id}
			title="Chat with your opponent"
			textInput={true}
		/>
		<Board color={startColor} />
		<div class="w-1/5">
			<Box title="Actions" />
			<Box title="Moves played" />
		</div>
	</div>

	<div class="hidden 2xl:flex justify-between">
		<Box
			style="w-1/5 max-w-1/5"
			gameId={$page.params.id}
			title="Chat with your opponent"
			textInput={true}
		/>
		<Board color={startColor} />
		<div class="w-1/4">
			<Box title="Actions" />
			<Box title="Moves played" />
		</div>
	</div>
{/if}
