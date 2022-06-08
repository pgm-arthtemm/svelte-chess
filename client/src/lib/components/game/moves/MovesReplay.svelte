<script lang="ts">
	export let moves: any;
</script>

<div>
	<ul class="flex flex-wrap">
		{#each moves as move}
			<li class="mr-4 text-white">
				{#if move.to !== undefined}
					<p>{move.to}</p>
				{/if}
			</li>
		{/each}
	</ul>
</div>
