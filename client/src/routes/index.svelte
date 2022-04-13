<script>
	import Board from '$lib/components/game/board/Board.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';

	let showModal = false;
	const handleToggleModal = () => {
		showModal = !showModal;
	};
</script>

<button on:click={() => handleToggleModal()}>Open modal</button>

<Modal title="Choose Game Settings" open={showModal} on:close={() => handleToggleModal()}>
	<svelte:fragment slot="modal-body">
		<h1>test</h1>
	</svelte:fragment>
</Modal>
