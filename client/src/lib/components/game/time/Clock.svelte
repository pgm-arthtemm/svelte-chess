<script lang="ts">
	import { timeConvert } from '$lib/utils/game';

	export let timeSpent: number;
	export let time: number;
	export let style: string = '';
	export let name: string = '';

	let timeInSeconds: number = time * 60;
	let timeLeft: number;

	$: timeLeft = timeInSeconds - timeSpent;
</script>

<div class={`${style} text-3xl text-white py-3 `}>
	<p class="text-right">{name}: {timeConvert(timeLeft)}</p>
</div>
