<script lang="ts">
	import { page } from '$app/stores';
	import { usernameStore, selectedColor } from '../../../../stores';
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { ButtonEnum } from '$lib/constants/button-enum';
	import { draw } from '$lib/utils/game/actions';

	export let toggleDraw: () => void = () => {};
	export let drawVisible: boolean = false;

	const confirm = () => {
		draw($page.params.id, $usernameStore);
		toggleDraw();
	};
</script>

<Modal title="Do you want to request a draw?" open={drawVisible} on:close={toggleDraw}>
	<svelte:fragment slot="modal-body">
		<section>
			<p class="text-2xl font-bold text-center mb-4">Are you sure you want to request a draw?</p>
			<div class="flex md:w-2/3 m-auto md:justify-between">
				<Button text="YES" onClick={confirm} type={ButtonEnum.success} />
				<Button text="NO" onClick={toggleDraw} type={ButtonEnum.danger} />
			</div>
		</section>
	</svelte:fragment>
</Modal>
