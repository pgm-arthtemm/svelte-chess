<script lang="ts">
	import { selectedColor, usernameStore } from '../../../../stores';
	import { checkLogin } from '$lib/utils/checkLogin';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { io } from 'socket.io-client';
	import { v4 as uuidv4 } from 'uuid';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const socket = io();
	const gameRoomId: string = uuidv4();

	export let newGameVisible: boolean;
	export let handleToggleNewGame: () => void;

	onMount(() => {
		document
			.querySelector(`[data-color="random"]`)
			.classList.add('border-2', 'border-red-500', 'p-2', 'selected');
	});

	const selectColor = (color: string): any => {
		const listElements = document.querySelectorAll('[data-color]');
		const colorElement = document.querySelector(`[data-color="${color}"]`);

		listElements.forEach((item) => {
			item.classList.remove('border-2', 'border-red-500', 'p-2', 'selected');
		});
		colorElement.classList.add('border-2', 'border-red-500', 'p-2', 'selected');
	};

	const startGame = (): void => {
		socket.emit('createGame', gameRoomId);

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
				<section>
					<label for="username">Enter your username</label>
					<input type="text" bind:value={$usernameStore} name="username" placeholder="Username" />
				</section>
			{/if}

			<section>
				<label for="time">Time per player</label>
				<input type="range" name="time" id="time" />
			</section>

			<section>
				<label for="extraTime">Extra seconds per move</label>
				<input type="range" name="extraTime" id="extraTime" />
			</section>

			<section>
				<ul class="flex w-4/6 m-auto justify-between items-center">
					<li data-color="white">
						<button on:click={() => selectColor('white')}>White</button>
					</li>
					<li data-color="random">
						<button on:click={() => selectColor('random')}>Random</button>
					</li>
					<li data-color="black">
						<button on:click={() => selectColor('black')}>Black</button>
					</li>
				</ul>
			</section>

			<button on:click={startGame} disabled={$usernameStore === undefined || $usernameStore === ''}
				>Start game</button
			>
		</svelte:fragment>
	</Modal>
{/if}
