<script lang="ts">
	import { page } from '$app/stores';
	import {
		chat,
		opponentName,
		usernameStore,
		selectedColor,
		moves,
		playerMoveStore,
		moveMade,
		timeSettings,
		opponentTimeSpent,
		yourTimeSpent
	} from '../../stores';
	import { io } from 'socket.io-client';
	import Box from '$lib/components/box/Box.svelte';
	import Board from '$lib/components/game/board/Board.svelte';
	import Clock from '$lib/components/game/time/Clock.svelte';

	const socket = io();

	let usernameValue: string = '';
	let userMove: boolean = false;
	let accepted: boolean = false;

	let startColor: string = $selectedColor;
	let startTime: number = $timeSettings.time;
	let startIncrement: number = $timeSettings.increment;

	let countingOpponent: boolean;
	let countingYou: boolean;

	/**
	 * @TODO:
	 * CHANGE THIS TO FALSE BEFORE DEPLOYMENT
	 * READY = TRUE IS ONLY FOR TESTING
	 */
	let ready: boolean = false;
	let timeReady: boolean = false;

	const joinRoom = (): void => {
		socket.emit('joinRoom', $page.params.id);
		if ($usernameStore === '') {
			$usernameStore = usernameValue;
		}
	};

	socket.on('startGame', () => {
		socket.emit('chosenColor', { color: $selectedColor, gameId: $page.params.id });
		socket.emit('chosenTimeSettings', { timeSettings: $timeSettings, gameId: $page.params.id });

		socket.on('getColor', (color: string) => {
			if (color !== null) {
				color === 'white' ? (startColor = 'black') : (startColor = 'white');
			}
			ready = true;
		});

		socket.on('getTimeSettings', (data) => {
			if ($timeSettings.time === 0) {
				startTime = data.timeSettings.time;
				startIncrement = data.timeSettings.increment;
			}
			timeReady = true;
		});

		accepted = true;
	});

	socket.on('getStaringPlayer', (name) => {
		$playerMoveStore = name;

		if (name !== $usernameStore) {
			$opponentName = name;
			socket.emit('opponentName', { name: $usernameStore, gameId: $page.params.id });
		}
	});

	socket.on('getMove', (data) => {
		$moves = [...$moves, data.move];
		$moveMade = {
			initPosition: data.initPos,
			newPosition: data.move
		};

		if ($playerMoveStore === $usernameStore) {
			$playerMoveStore = $opponentName;
		} else {
			$playerMoveStore = $usernameStore;
		}
	});

	socket.on('getOpponentName', (name) => {
		if (name !== $usernameStore) {
			$opponentName = name;
		}
	});

	let oppInt = setInterval(() => {
		if (countingOpponent) {
			$opponentTimeSpent++;
		}
	}, 1000);

	let youInt = setInterval(() => {
		if (countingYou) {
			$yourTimeSpent++;
		}
	}, 1000);

	socket.on('getClockSwitch', (name) => {
		if (name === $usernameStore) {
			countingYou = false;
			countingOpponent = true;
		} else {
			countingYou = true;
			countingOpponent = false;
		}
	});

	socket.on('roomFull', () => {
		// @TODO: Show error message
		console.log('room full');
	});

	socket.on('getMessage', (data) => {
		$chat = [...$chat, data];
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

{#if accepted && ready && timeReady}
	<div class="xl:flex justify-between">
		<Clock time={startTime} timeSpent={$opponentTimeSpent} />
		<Box
			style="hidden xl:block w-1/6 max-w-1/6 2xl:max-w-1/5"
			gameId={$page.params.id}
			title="Chat with your opponent"
			textInput={true}
		/>
		<div class="md:flex justify-between">
			<Box
				style="hidden md:block md:w-[calc(33% - 1rem)] md:max-w-[32%] xl:hidden"
				gameId={$page.params.id}
				title="Chat with your opponent"
				textInput={true}
			/>
			<Board color={startColor} />
			<Clock time={startTime} timeSpent={$yourTimeSpent} />
		</div>
		<div class="md:flex justify-between md:mt-4 xl:mt-0 xl:block xl:w-1/5 2xl:w-1/4">
			<Box style="mt-4 md:mt-0 md:w-[calc(50%-0.5rem)] xl:w-auto" title="Actions" />
			<Box style="mt-4 md:mt-0 md:w-[calc(50%-0.5rem)] xl:w-auto" title="Moves played" />
		</div>
		<div class="md:hidden">
			<Box style="mt-4" gameId={$page.params.id} title="Chat with your opponent" textInput={true} />
		</div>
	</div>
{/if}
