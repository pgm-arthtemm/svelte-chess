<script lang="ts">
	import Box from '$lib/components/box/Box.svelte';
	import Board from '$lib/components/game/board/Board.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { apiBaseUrl } from '$lib/config/config';
	import { movesConvert } from '$lib/utils/profile/movesConvert';

	let startColor = 'white';
	let moves: any;
	let converted: boolean = false;

	onMount(async () => {
		const data = await fetch(`${apiBaseUrl}/games/id/${$page.params.id}`);
		const game = await data.json();

		moves = movesConvert(game.moves);
		converted = true;
	});
</script>

{#if converted}
	<div class="xl:flex justify-between">
		<div class="md:flex justify-between">
			<Board {moves} replay={true} color={startColor} />
		</div>
		<div class="md:flex justify-between md:mt-4 xl:mt-0 xl:block xl:w-1/5 2xl:w-1/4">
			<Box
				{moves}
				replay={true}
				style="mt-4 md:mt-0 md:w-[calc(50%-0.5rem)] xl:w-auto"
				title="Actions"
			/>
			<Box
				{moves}
				replay={true}
				style="mt-4 md:mt-0 md:w-[calc(50%-0.5rem)] xl:w-auto"
				title="Moves played"
			/>
		</div>
		<div class="md:hidden" />
	</div>
{/if}
