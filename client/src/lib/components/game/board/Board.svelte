<script lang="ts">
	import Cell from './cell/Cell.svelte';

	let files: number[] = [1, 2, 3, 4, 5, 6, 7, 8].reverse();
	let ranks: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
</script>

<div class="board m-auto w-96 h-96 mt-12">
	<div class="flex flex-wrap">
		{#each files as file, fileIndex}
			{#if fileIndex % 2 === 0}
				{#each ranks as rank, rankIndex}
					{#if rankIndex % 2 === 0}
						<Cell {file} {rank} color={'white'} />
					{:else}
						<Cell {file} {rank} color={'black'} />
					{/if}
				{/each}
			{:else}
				{#each ranks as rank, rankIndex}
					{#if rankIndex % 2 === 0}
						<Cell {file} {rank} color={'black'} />
					{:else}
						<Cell {file} {rank} color={'white'} />
					{/if}
				{/each}
			{/if}
		{/each}
	</div>
</div>

<style lang="postcss">
	.board {
		width: 40em;
		height: 40em;
	}
</style>
