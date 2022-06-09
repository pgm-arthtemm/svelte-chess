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
	<div class="xl:flex">
		<div class="md:flex m-auto justify-center">
			<Board {moves} replay={true} color={startColor} />
		</div>
		<div class="md:flex justify-between md:mt-4 xl:inline-block m-auto">
			<Box
				{moves}
				replay={true}
				style="mt-4 md:mt-0 md:w-[calc(50%-0.5rem)] xl:m-auto xl:w-2/3 2xl:w-full"
				title="Actions"
			/>
			<Box
				{moves}
				replay={true}
				style="mt-4 md:mt-0 md:w-[calc(50%-0.5rem)] xl:m-auto xl:w-2/3 2xl:w-full"
				title="Moves played"
			/>
		</div>
	</div>
{/if}
