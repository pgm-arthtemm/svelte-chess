<script lang="ts">
	import { timeConvert } from '$lib/utils/game';

	export let timeSpent: number;
	export let time: number;

	let timeInSeconds: number = time * 60;
	let timeLeft: number;

	$: timeLeft = timeInSeconds - timeSpent;
</script>

<div class="text-right text-3xl text-white flex justify-between py-3">
	<h1>username</h1>
	<p>{timeConvert(timeLeft)}</p>
</div>
