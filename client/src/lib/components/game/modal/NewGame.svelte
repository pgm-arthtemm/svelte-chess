<script lang="ts">
	import { selectedColor, usernameStore } from '../../../../stores';
	import { checkLogin } from '$lib/utils/checkLogin';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { io } from 'socket.io-client';
	import { v4 as uuidv4 } from 'uuid';
	import { goto } from '$app/navigation';

	const socket = io();
	const gameRoomId: string = uuidv4();

	export let newGameVisible: boolean;
	export let handleToggleNewGame: () => void;

	const selectColor = (color: string): any => {
		$selectedColor = color;
	};

	const startGame = (): void => {
		socket.emit('createGame', gameRoomId);
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
					<li>
						<button on:click={selectColor('white')}>White</button>
					</li>
					<li>
						<button on:click={selectColor('random')}>Random</button>
					</li>
					<li>
						<button on:click={selectColor('black')}>Black</button>
					</li>
				</ul>
			</section>

			<button on:click={startGame} disabled={$usernameStore === undefined || $usernameStore === ''}
				>Start game</button
			>
		</svelte:fragment>
	</Modal>
{/if}
