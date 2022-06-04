<script lang="ts">
	import { timeConvert } from '$lib/utils/game/timeConvert';

	export let counting: boolean;
	export let time: number;
	export let opponent: boolean = false;
</script>

<div class="text-right text-3xl text-white flex justify-between py-3">
	<h1>opponent</h1>

	{#if counting}
		<p>COUNTING</p>
	{:else}
		<p>{timeConvert(time)}</p>
	{/if}
</div>
