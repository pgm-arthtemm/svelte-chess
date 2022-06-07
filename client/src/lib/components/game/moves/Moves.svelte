<script lang="ts">
	import { moves } from '../../../../stores';
</script>

<div>
	<ul class="flex flex-wrap">
		{#each $moves as move}
			<li class="mr-4 text-white">
				<p>{move.new}</p>
			</li>
		{/each}
	</ul>
</div>
