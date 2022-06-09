<script lang="ts">
	import { replayMove } from '../../../../stores';

	export let moves: any;
</script>

<div>
	<ul class="flex flex-wrap p-2">
		{#each moves as move, index}
			<li class={`${$replayMove === index ? 'text-red' : 'notSelected'} mr-4`}>
				{#if move.to !== undefined}
					<p>{move.to}</p>
				{/if}
			</li>
		{/each}
	</ul>
</div>

<style lang="postcss">
	li {
		@apply bg-gray-200 text-black font-semibold text-lg p-1 rounded-md;
	}

	.notSelected {
		color: white;
		@apply bg-gray-700;
	}
</style>
