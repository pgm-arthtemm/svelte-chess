<script lang="ts">
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
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
		yourTimeSpent,
		winnerNameStore,
		gameStarter
	} from '../../stores';
	import { io } from 'socket.io-client';
	import Box from '$lib/components/box/Box.svelte';
	import Board from '$lib/components/game/board/Board.svelte';
	import Clock from '$lib/components/game/time/Clock.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import { ButtonEnum } from '$lib/constants/button-enum';
	import FaRegCopy from 'svelte-icons/fa/FaRegCopy.svelte';
	import FaCheck from 'svelte-icons/fa/FaCheck.svelte';
	import FaSpinner from 'svelte-icons/fa/FaSpinner.svelte';
	import Result from '$lib/components/game/modal/Result.svelte';
	import jwt_decode from 'jwt-decode';
	import Cookies from 'js-cookie';
	import { ColorEnum } from '$lib/constants/color-enum';
	import { ResultTypeEnum } from '$lib/constants/result-type.enum';
	import { gameDataToServer } from '$lib/utils/game';
	import { checkLogin } from '$lib/utils/checkLogin';
	import { onMount } from 'svelte';
	import DrawOffer from '$lib/components/game/actions/DrawOffer.svelte';
	import { frontendBaseUrl } from '$lib/config/config';

	const socket = io();

	let usernameValue: string = '';
	let userMove: boolean = false;
	let accepted: boolean = false;

	let startColor: string = $selectedColor;
	let startTime: number = $timeSettings.time;

	let countingOpponent: boolean;
	let countingYou: boolean;

	let copied: boolean = false;

	let gameDone: boolean = false;
	let showResult: boolean = false;
	let resultType: ResultTypeEnum = ResultTypeEnum.forfeit;
	let result: ColorEnum;
	let won: boolean;
	let draw: boolean = false;
	let winnerName: string;
	let drawOfferVisible: boolean = false;
	let drawName: string = '';

	onMount(() => {
		if (checkLogin()) {
			const { username }: any = jwt_decode(Cookies.get('access_token'));
			$usernameStore = username;
		}
	});

	const toggleDrawOffer = () => {
		drawOfferVisible = !drawOfferVisible;
	};

	const toggleResult = () => {
		showResult = !showResult;
	};

	let ready: boolean = false;
	let timeReady: boolean = false;
	let joined: boolean = false;

	const joinRoom = (): void => {
		socket.emit('joinRoom', $page.params.id);
		if ($usernameStore === '') {
			$usernameStore = usernameValue;
		}

		joined = true;
	};

	const copyLink = (link: string): any => {
		navigator.clipboard.writeText(link);

		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2500);
	};

	socket.on('startGame', () => {
		joined = false;
		socket.emit('chosenColor', { color: $selectedColor, gameId: $page.params.id });
		socket.emit('chosenTimeSettings', { timeSettings: $timeSettings, gameId: $page.params.id });

		socket.on('getColor', (color: string) => {
			if (color !== null) {
				color === 'white'
					? ((startColor = 'black'), ($selectedColor = 'black'))
					: ((startColor = 'white'), ($selectedColor = 'white'));
			}
			ready = true;
		});

		socket.on('getTimeSettings', (data) => {
			if ($timeSettings.time === 0) {
				startTime = data.timeSettings.time;
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
		$moves = [...$moves, { initial: data.initPos, new: data.move }];
		$moveMade = {
			initPosition: data.initPos,
			newPosition: data.move,
			take: data.take
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

	socket.on('getDraw', (user) => {
		if (user !== $usernameStore) {
			drawOfferVisible = true;
			drawName = user;
		}
	});

	socket.on('getGameOver', (data) => {
		gameDone = true;
		showResult = true;
		resultType = ResultTypeEnum.checkmate;

		clearInterval(oppInt);
		clearInterval(youInt);

		if (data.color === 'white') {
			result = ColorEnum.white;
		} else {
			result = ColorEnum.black;
		}

		if (data.username === $usernameStore) {
			won = true;
			winnerName = $usernameStore;
			$winnerNameStore = $usernameStore;
		} else {
			won = false;
			winnerName = $opponentName;
			$winnerNameStore = $opponentName;
		}

		console.log($winnerNameStore);

		if (checkLogin()) {
			const { sub }: any = jwt_decode(Cookies.get('access_token'));

			let whitePlayer: string = $selectedColor === 'white' ? $usernameStore : $opponentName;
			let blackPlayer: string = $selectedColor === 'black' ? $usernameStore : $opponentName;
			let movesString: string = '';
			for (let i = 0; i < $moves.length; i++) {
				movesString += $moves[i].initial + ',' + $moves[i].new + ',';
			}

			let gameData = {
				winner: $winnerNameStore,
				whitePlayer,
				blackPlayer,
				date: new Date(),
				moves: movesString,
				userId: sub
			};

			gameDataToServer(gameData);
		}
	});

	socket.on('getConfirmDraw', () => {
		console.log('draw accepted');

		gameDone = true;
		showResult = true;
		draw = true;
		resultType = ResultTypeEnum.draw;

		clearInterval(oppInt);
		clearInterval(youInt);

		if (checkLogin()) {
			const { sub }: any = jwt_decode(Cookies.get('access_token'));

			let whitePlayer: string = $selectedColor === 'white' ? $usernameStore : $opponentName;
			let blackPlayer: string = $selectedColor === 'black' ? $usernameStore : $opponentName;
			let movesString: string = '';
			for (let i = 0; i < $moves.length; i++) {
				movesString += $moves[i].initial + ',' + $moves[i].new + ',';
			}

			let gameData = {
				winner: 'draw',
				whitePlayer,
				blackPlayer,
				date: new Date(),
				moves: movesString,
				userId: sub
			};

			gameDataToServer(gameData);
		}
	});

	socket.on('getForfeit', (user) => {
		gameDone = true;
		showResult = true;
		resultType = ResultTypeEnum.forfeit;

		if (user.color === 'white') {
			result = ColorEnum.white;
		} else {
			result = ColorEnum.black;
		}

		clearInterval(oppInt);
		clearInterval(youInt);

		if (user.username === $usernameStore) {
			won = false;
			winnerName = $opponentName;
			$winnerNameStore = $opponentName;
		} else {
			won = true;
			winnerName = $usernameStore;
			$winnerNameStore = $usernameStore;
		}

		if (checkLogin()) {
			const { sub }: any = jwt_decode(Cookies.get('access_token'));

			let whitePlayer: string = $selectedColor === 'white' ? $usernameStore : $opponentName;
			let blackPlayer: string = $selectedColor === 'black' ? $usernameStore : $opponentName;
			let movesString: string = '';
			for (let i = 0; i < $moves.length; i++) {
				movesString += $moves[i].initial + ',' + $moves[i].new + ',';
			}

			let gameData = {
				winner: $winnerNameStore,
				whitePlayer,
				blackPlayer,
				date: new Date(),
				moves: movesString,
				userId: sub
			};

			gameDataToServer(gameData);
		}
	});

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
</script>

<svelte:head>
	<title>New Game - Svelte Chess</title>
</svelte:head>

{#if !accepted}
	<div>
		<div class="text-center text-white text-lg md:text-xl leading-8">
			{#if $usernameStore === ''}
				<div>
					<label class="block mb-2" for="username"
						>You don't have a username yet... Pick one before joining the game:</label
					>
					<input
						class="p-4 pt-3 text-white mb-3 bg-gray-800 rounded-xl inline-block w-1/2 font-semibold"
						bind:value={usernameValue}
						type="text"
						name="username"
						placeholder="Username"
					/>
				</div>
			{/if}

			{#if $usernameStore !== ''}
				<h1>Hey <span class="font-bold">{$usernameStore}</span> !</h1>
			{/if}

			{#if $gameStarter}
				<p>Copy the link below and send it to your friend.</p>
				<p>When you are ready, click the button. If you both are ready, the game will start!</p>

				<div class="text-white mb-6 bg-gray-800 inline-block my-4 p-4 pt-3 rounded-xl relative">
					<div class="flex items-center">
						<p class="mr-4">
							{`${frontendBaseUrl}/game/${$page.params.id}`}
						</p>
						<div
							class="w-7 h-7 cursor-pointer"
							on:click={copyLink(`${frontendBaseUrl}/game/${$page.params.id}`)}
						>
							<FaRegCopy />
						</div>
					</div>

					{#if copied}
						<div
							in:fade
							out:fade
							class="p-2 px-3 -right-10 -bottom-14 inline-block rounded-lg bg-gray-900 text-white font-semibold absolute"
						>
							<div class="flex items-center">
								<p class="mr-2">Copied link</p>
								<div class="text-green-500 w-4 h-4">
									<FaCheck />
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/if}

			{#if !joined}
				<Button text="READY" onClick={joinRoom} type={ButtonEnum.success} />
			{/if}
		</div>
	</div>
{/if}

{#if joined}
	<div class="text-center text-white text-xl leading-8 pt-6">
		<p>Waiting for the other player...</p>
		<div class="text-white w-10 h-10 m-auto mt-4 animate-spin">
			<FaSpinner />
		</div>
	</div>
{/if}

{#if accepted && ready && timeReady}
	<div class="xl:flex justify-between">
		<Clock
			style="md:m-auto xl:hidden"
			time={startTime}
			timeSpent={$opponentTimeSpent}
			name={$opponentName}
		/>
		<Box
			style="hidden xl:block w-1/6 max-w-1/6 2xl:w-1/5 2xl:max-w-1/5"
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
			<Clock name="You" style="md:hidden" time={startTime} timeSpent={$yourTimeSpent} />
		</div>
		<Clock
			name="You"
			style="hidden md:block xl:hidden"
			time={startTime}
			timeSpent={$yourTimeSpent}
		/>
		<div class="md:flex justify-between md:mt-4 xl:mt-0 xl:block xl:w-1/5 2xl:w-1/4">
			<Clock
				name={$opponentName}
				style="hidden xl:block"
				time={startTime}
				timeSpent={$opponentTimeSpent}
			/>
			<Box style="mt-4 md:mt-0 md:w-[calc(50%-0.5rem)] xl:w-auto" title="Actions" />
			<Box style="mt-4 md:mt-0 md:w-[calc(50%-0.5rem)] xl:w-auto" title="Moves played" />
			<Clock name="You" style="hidden xl:block" time={startTime} timeSpent={$yourTimeSpent} />
		</div>
		<div class="md:hidden">
			<Box style="mt-4" gameId={$page.params.id} title="Chat with your opponent" textInput={true} />
		</div>
	</div>
{/if}

{#if gameDone}
	<Result {draw} {winnerName} {resultType} {result} {won} {showResult} {toggleResult} />
{/if}

{#if drawOfferVisible}
	<DrawOffer {drawName} {drawOfferVisible} {toggleDrawOffer} />
{/if}
