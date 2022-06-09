<script lang="ts">
	import { selectedColor, usernameStore, timeSettings, gameStarter } from '../../../../stores';
	import { checkLogin } from '$lib/utils/checkLogin';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { io } from 'socket.io-client';
	import { v4 as uuidv4 } from 'uuid';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { timeOptions } from '$lib/config/config';

	const socket = io();
	const gameRoomId: string = uuidv4();

	export let newGameVisible: boolean;
	export let handleToggleNewGame: () => void;

	let minutesPerPlayer: number = 8;

	$: selectedTime = timeOptions[minutesPerPlayer];

	const borderClasses = ['border-2', 'border-blue-300', 'border-solid', 'rounded-lg', 'selected'];

	onMount(() => {
		document.querySelector(`[data-color="random"]`).classList.add(...borderClasses);
	});

	const selectColor = (color: string): any => {
		const listElements = document.querySelectorAll('[data-color]');
		const colorElement = document.querySelector(`[data-color="${color}"]`);

		listElements.forEach((item) => {
			item.classList.remove(...borderClasses);
		});
		colorElement.classList.add(...borderClasses);
	};

	const startGame = (): void => {
		$gameStarter = true;

		socket.emit('createGame', gameRoomId);

		$timeSettings = {
			time: selectedTime
		};

		const selectedElement: any = document.querySelector('.selected');
		const color = selectedElement.dataset.color;

		if (color === 'random') {
			const randomColor = Math.floor(Math.random() * 2) === 0 ? 'white' : 'black';
			$selectedColor = randomColor;
		} else {
			$selectedColor = color;
		}

		newGameVisible = false;
		goto(`game/${gameRoomId}`);
	};
</script>

{#if newGameVisible}
	<Modal title="Start a new game" open={newGameVisible} on:close={() => handleToggleNewGame()}>
		<svelte:fragment slot="modal-body">
			{#if !checkLogin()}
				<div class="flex flex-col">
					<label class="font-bold text-xl pb-2" for="username">Username</label>
					<input
						class="text-input"
						bind:value={$usernameStore}
						type="text"
						placeholder="username"
					/>
				</div>
			{/if}

			<section>
				<label class="font-bold text-xl pb-2" for="username"
					>Minutes per player: {selectedTime}</label
				>
				<input
					id="minmax-range"
					type="range"
					min="1"
					max="15"
					bind:value={minutesPerPlayer}
					class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
				/>
			</section>

			<section>
				<p class="font-bold text-xl mt-8" for="username">Choose your start color</p>
				<ul class="flex w-4/6 m-auto h-32 justify-between items-center">
					<li data-color="white">
						<button on:click={() => selectColor('white')}>
							<img src="/pieces/w-king.png" alt="white king" />
						</button>
					</li>
					<li data-color="random">
						<button on:click={() => selectColor('random')}>
							<img class="w-20" src="/pieces/random.png" alt="random" />
						</button>
					</li>
					<li data-color="black">
						<button on:click={() => selectColor('black')}>
							<img src="/pieces/b-king.png" alt="black king" />
						</button>
					</li>
				</ul>
			</section>

			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
				on:click={startGame}
				disabled={$usernameStore === undefined || $usernameStore === ''}>Start Game</button
			>
		</svelte:fragment>
	</Modal>
{/if}

<style>
	.text-input {
		border: 1px solid #ccc;
		padding: 10px;
		margin-bottom: 10px;
	}
</style>
