<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { ButtonEnum } from '$lib/constants/button-enum';
	import type { ColorEnum } from '$lib/constants/color-enum';
	import { checkLogin } from '$lib/utils/checkLogin';

	export let result: ColorEnum;
	export let won: boolean;
	export let showResult: boolean = false;
	export let toggleResult: () => void;

	let loggedIn: boolean = checkLogin();
	let title: string;

	won ? (title = 'You won!') : (title = 'You lost!');
</script>

<Modal {title} open={showResult} on:close={toggleResult}>
	<svelte:fragment slot="modal-body">
		<section>
			<div class="flex justify-between md:w-1/2 m-auto">
				<div class="text-center">
					<img
						class={`${
							result === 'black' ? 'border-4 border-green-700' : 'border-2 border-gray-600'
						} w-20 h-20 rounded-md shadow-2xl`}
						src="/pieces/w-pawn.png"
						alt="white-pawn"
					/>
					<p class="text-xl font-semibold">username</p>
				</div>
				<div class="text-center">
					<img
						class={`${
							result === 'white' ? 'border-4 border-green-700' : 'border-2 border-gray-600'
						} w-20 h-20 rounded-md shadow-2xl`}
						src="/pieces/b-pawn.png"
						alt="white-pawn"
					/>
					<p class="text-xl font-semibold">username</p>
				</div>
			</div>

			{#if !loggedIn}
				<div>
					<p>Want to save this game?</p>
					<p>Create an account</p>
				</div>
			{/if}

			<Button
				text="OK"
				onClick={() => {
					goto('/');
				}}
				type={ButtonEnum.success}
			/>
		</section>
	</svelte:fragment>
</Modal>
