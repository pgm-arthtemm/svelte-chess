<script lang="ts">
	import { replayMove } from '../../../../stores';
	import FaFlag from 'svelte-icons/fa/FaFlag.svelte';
	import FaHandshake from 'svelte-icons/fa/FaHandshake.svelte';
	import Forfeit from './Forfeit.svelte';
	import FaArrowRight from 'svelte-icons/fa/FaArrowRight.svelte';
	import FaSyncAlt from 'svelte-icons/fa/FaSyncAlt.svelte';
	import FaArrowLeft from 'svelte-icons/fa/FaArrowLeft.svelte';
	import FaPlay from 'svelte-icons/fa/FaPlay.svelte';

	export let replay: boolean = false;
	export let moves: any = undefined;

	let forfeitVisible: boolean = false;
	let playing: boolean = false;

	const askForDraw = () => {
		console.log('ask for draw');
	};

	const openForfeit = () => {
		forfeitVisible = !forfeitVisible;
	};

	const toggleForfeit = () => {
		forfeitVisible = !forfeitVisible;
	};

	const previousMove = () => {
		$replayMove -= 1;
	};

	const nextMove = () => {
		$replayMove += 1;
	};

	const togglePlay = () => {
		playing = !playing;
	};

	setInterval(() => {
		if (playing && $replayMove < moves.length - 1) {
			nextMove();
		}
	}, 1500);

	const switchSide = () => {
		console.log('switch side');
	};
</script>

<div class="p-3 flex items-center justify-between w-1/3 m-auto">
	{#if replay}
		<div class="text-white w-7 h-7 cursor-pointer" on:click={switchSide}>
			<FaSyncAlt />
		</div>
		<div class="text-white w-7 h-7 cursor-pointer" on:click={previousMove}>
			<FaArrowLeft />
		</div>

		<div class="text-white w-7 h-7 cursor-pointer" on:click={togglePlay}>
			<FaPlay />
		</div>

		<div class="text-white w-7 h-7 cursor-pointer" on:click={nextMove}>
			<FaArrowRight />
		</div>
	{:else}
		<div on:click={() => openForfeit()} class="text-white w-7 h-7 cursor-pointer">
			<FaFlag />
		</div>
		<div on:click={() => askForDraw()} class="text-white w-8 h-8 cursor-pointer">
			<FaHandshake />
		</div>
	{/if}
</div>

{#if forfeitVisible}
	<Forfeit {forfeitVisible} {toggleForfeit} />
{/if}
