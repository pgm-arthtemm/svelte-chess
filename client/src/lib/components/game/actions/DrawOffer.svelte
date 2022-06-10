<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { ButtonEnum } from '$lib/constants/button-enum';
	import { confirmDraw } from '$lib/utils/game/actions';

	export let toggleDrawOffer: () => void = () => {};
	export let drawOfferVisible: boolean = false;
	export let drawName: string = '';

	const confirm = () => {
		confirmDraw($page.params.id);
		toggleDrawOffer();
	};
</script>

<Modal
	title={`${drawName} has requested a draw`}
	open={drawOfferVisible}
	on:close={toggleDrawOffer}
>
	<svelte:fragment slot="modal-body">
		<section>
			<p class="text-2xl font-bold text-center mb-4">
				Do you want to accept this request for a draw?
			</p>
			<div class="flex md:w-2/3 m-auto md:justify-between">
				<Button text="YES" onClick={confirm} type={ButtonEnum.success} />
				<Button text="NO" onClick={toggleDrawOffer} type={ButtonEnum.danger} />
			</div>
		</section>
	</svelte:fragment>
</Modal>
