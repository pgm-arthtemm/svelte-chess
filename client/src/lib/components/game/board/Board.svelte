<script lang="ts">
	import { page } from '$app/stores';
	import { usernameStore } from '../../../../stores';
	import { io } from 'socket.io-client';
	import Cell from './cell/Cell.svelte';
	import CellReplay from './replay/CellReplay.svelte';

	const socket = io();

	export let color: string = '';
	export let replay: boolean = false;
	export let moves: any = undefined;

	let files: number[];
	let ranks: string[];

	if (color === 'black') {
		files = [1, 2, 3, 4, 5, 6, 7, 8];
		ranks = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].reverse();
	} else {
		socket.emit('getStarter', { gameId: $page.params.id, playerMove: $usernameStore });
		ranks = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
		files = [1, 2, 3, 4, 5, 6, 7, 8].reverse();
	}
</script>

<div class="board">
	<div class="grid grid-cols-8 aspect-square">
		{#each files as file, fileIndex}
			{#if fileIndex % 2 === 0}
				{#each ranks as rank, rankIndex}
					{#if replay}
						<CellReplay
							{moves}
							color={`${rankIndex % 2 === 0 ? 'white' : 'black'}`}
							{file}
							{rank}
						/>
					{:else}
						<Cell color={`${rankIndex % 2 === 0 ? 'white' : 'black'}`} {file} {rank} />
					{/if}
				{/each}
			{:else}
				{#each ranks as rank, rankIndex}
					{#if replay}
						<CellReplay
							{moves}
							color={`${rankIndex % 2 === 0 ? 'black' : 'white'}`}
							{file}
							{rank}
						/>
					{:else}
						<Cell color={`${rankIndex % 2 === 0 ? 'black' : 'white'}`} {file} {rank} />
					{/if}
				{/each}
			{/if}
		{/each}
	</div>
</div>
