<script lang="ts">
	export let title: string;
	export let content: string;
	export let textInput: boolean;
</script>

<div class="rounded-lg border-8 border-gray-800 w-72">
	<div class="h-[calc(100%-3rem)]">
		<h2 class="border-b-8 border-gray-800 p-1 text-gray-200 font-bold bg-gray-800">{title}</h2>
		<ul>
			<li />
		</ul>
	</div>
	<div class="border-t-8 border-gray-800">
		{#if textInput}
			<input class="rounded-md h-10 w-full pl-2 pb-1" type="text" placeholder="Type a message..." />
		{/if}
	</div>
</div>
