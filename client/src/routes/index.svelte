<script lang="ts">
	import Board from '$lib/components/game/board/Board.svelte';
	import Modal from '$lib/layout/modal/Modal.svelte';
	import { gameModes } from '$lib/config/config';

	let selectedMode: string;
	let selectedTime: number;

	let times: number[];

	$: times = selectedMode ? gameModes.filter((mode) => mode.name === selectedMode)[0].times : [];

	let showModal = false;
	const handleToggleModal = () => {
		showModal = !showModal;
	};
</script>

<button on:click={() => handleToggleModal()}>Open modal</button>

<Modal title="Choose Game Settings" open={showModal} on:close={() => handleToggleModal()}>
	<svelte:fragment slot="modal-body">
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
	</svelte:fragment>
</Modal>
