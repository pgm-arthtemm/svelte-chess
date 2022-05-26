<script lang="ts">
	import Cell from './cell/Cell.svelte';

	export let color: string;

	let files: number[];
	let ranks: string[];

	if (color === 'black') {
		files = [1, 2, 3, 4, 5, 6, 7, 8];
	} else {
		files = [1, 2, 3, 4, 5, 6, 7, 8].reverse();
	}

	ranks = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
</script>

<div class="board">
	<div class="grid grid-cols-8 aspect-square">
		{#each files as file, fileIndex}
			{#if fileIndex % 2 === 0}
				{#each ranks as rank, rankIndex}
					<Cell color={`${rankIndex % 2 === 0 ? 'white' : 'black'}`} {file} {rank} />
				{/each}
			{:else}
				{#each ranks as rank, rankIndex}
					<Cell color={`${rankIndex % 2 === 0 ? 'black' : 'white'}`} {file} {rank} />
				{/each}
			{/if}
		{/each}
	</div>
</div>
