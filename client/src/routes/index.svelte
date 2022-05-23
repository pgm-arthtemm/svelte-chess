<script lang="ts">
	import { settings } from '../stores';
	import { goto } from '$app/navigation';
	import { gameModes } from '$lib/config/config';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { checkLogin } from '$lib/utils/checkLogin';
	import { io } from 'socket.io-client';
	import { v4 as uuidv4 } from 'uuid';

	const socket = io();

	let username: string;
	let showModal = false;
	let selectedMode: string;
	let selectedTime: number;
	let times: number[];
	let gameRoomIdValue: string = uuidv4();
	let entered: boolean = false;

	$: times = selectedMode ? gameModes.filter((mode) => mode.name === selectedMode)[0].times : [];

	const handleToggleModal = () => {
		showModal = !showModal;
	};

	const enterUsername = (): void => {
		entered = true;
		socket.emit('createGame', gameRoomIdValue);
	};

	const handleConfirm = () => {
		if (selectedMode && selectedTime) {
			settings.set({
				mode: selectedMode,
				time: selectedTime
			});
			handleToggleModal();
			goto('/game');
		}
	};
</script>

<button on:click={() => checkLogin()}>CHECK FOR COOKIE</button>
<button on:click={() => handleToggleModal()}>Open modal</button>

<div class="h-full bg-red-100">
	<h1>test</h1>
</div>

<Modal title="Choose Game Settings" open={showModal} on:close={() => handleToggleModal()}>
	<svelte:fragment slot="modal-body">
		<div>
			<p>Choose mode</p>
			<select bind:value={selectedMode}>
				{#each gameModes as gameMode}
					<option>{gameMode.name}</option>
				{/each}
			</select>

			<p>Select time for each player</p>
			{#if times}
				<select bind:value={selectedTime}>
					{#each times as time}
						<option>{time}</option>
					{/each}
				</select>
			{/if}
		</div>

		<button
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
			on:click|preventDefault={handleConfirm}
		>
			Confirm
		</button>
	</svelte:fragment>
</Modal>

{#if entered}
	{goto(`game/${gameRoomIdValue}`)}
{/if}

<div class="border-2 border-red-500 w-full h-72">
	<h1>username</h1>
	<input bind:value={username} type="text" placeholder="username" />
	<button on:click={enterUsername}>Confirm</button>
</div>
