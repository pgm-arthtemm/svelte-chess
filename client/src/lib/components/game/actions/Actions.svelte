<script lang="ts">
	import { replayMove } from '../../../../stores';
	import FaFlag from 'svelte-icons/fa/FaFlag.svelte';
	import FaHandshake from 'svelte-icons/fa/FaHandshake.svelte';
	import Forfeit from './Forfeit.svelte';
	import FaArrowRight from 'svelte-icons/fa/FaArrowRight.svelte';
	import FaFastForward from 'svelte-icons/fa/FaFastForward.svelte';
	import FaPlay from 'svelte-icons/fa/FaPlay.svelte';
	import FaFastBackward from 'svelte-icons/fa/FaFastBackward.svelte';
	import FaPause from 'svelte-icons/fa/FaPause.svelte';

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

	const nextMove = () => {
		$replayMove += 1;
	};

	const togglePlay = () => {
		playing = !playing;
	};

	const lastMove = () => {
		moves.forEach((move: any) => {
			if (move.to !== undefined) {
				setTimeout(() => {
					$replayMove += 1;
				}, 10);
			}
		});
	};

	const firstMove = () => {
		$replayMove = -1;
		window.location.reload();
	};

	setInterval(() => {
		if (playing && $replayMove < moves.length - 1) {
			nextMove();
		}
	}, 1500);
</script>

<div class="p-3 flex items-center justify-between w-2/3 m-auto">
	{#if replay}
		<div class="text-white w-7 h-7 cursor-pointer" on:click={firstMove}>
			<FaFastBackward />
		</div>
		<div class="text-white w-7 h-7 cursor-pointer" on:click={togglePlay}>
			{#if playing}
				<FaPause />
			{:else}
				<FaPlay />
			{/if}
		</div>
		<div class="text-white w-7 h-7 cursor-pointer" on:click={nextMove}>
			<FaArrowRight />
		</div>
		<div class="text-white w-7 h-7 cursor-pointer" on:click={lastMove}>
			<FaFastForward />
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
