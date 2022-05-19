<script lang="ts">
	import { chat } from '../../../../stores';
</script>

<ul class="p-2 pt-0">
	{#each $chat as chat}
		<li class="flex break-all items-center border-gray-800 leading-8">
			<p class="text-white"><span class="font-bold">{chat.user}:</span> {chat.message}</p>
		</li>
	{/each}
</ul>
