<script lang="ts">
	import { page } from '$app/stores';
	import { usernameStore, selectedColor } from '../../../../stores';
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { ButtonEnum } from '$lib/constants/button-enum';
	import { forfeit } from '$lib/utils/game/actions';

	export let forfeitVisible: boolean;
	export let toggleForfeit: () => void = () => {};

	const confirm = () => {
		forfeit($page.params.id, $usernameStore, $selectedColor);
		toggleForfeit();
	};
</script>

<Modal title="Do you want to forfeit?" open={forfeitVisible} on:close={() => toggleForfeit()}>
	<svelte:fragment slot="modal-body">
		<section>
			<p class="text-2xl font-bold text-center mb-4">Are you sure you want to forfeit?</p>
			<div class="flex md:w-1/3 m-auto justify-between">
				<Button text="YES" onClick={confirm} type={ButtonEnum.success} />
				<Button text="NO" onClick={toggleForfeit} type={ButtonEnum.danger} />
			</div>
		</section>
	</svelte:fragment>
</Modal>
