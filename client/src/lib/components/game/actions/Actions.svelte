<script lang="ts">
	import { page } from '$app/stores';
	import { usernameStore } from '../../../../stores';
	import FaFlag from 'svelte-icons/fa/FaFlag.svelte';
	import FaHandshake from 'svelte-icons/fa/FaHandshake.svelte';
	import { forfeit } from '$lib/utils/game/actions';
	import Forfeit from './Forfeit.svelte';

	let forfeitVisible: boolean = false;

	const askForDraw = () => {
		console.log('ask for draw');
	};

	const openForfeit = () => {
		forfeitVisible = !forfeitVisible;
	};

	const toggleForfeit = () => {
		forfeitVisible = !forfeitVisible;
	};
</script>

<div class="p-3 flex items-center justify-between w-1/3 m-auto">
	<div on:click={() => openForfeit()} class="text-white w-7 h-7 cursor-pointer">
		<FaFlag />
	</div>
	<div on:click={() => askForDraw()} class="text-white w-8 h-8 cursor-pointer">
		<FaHandshake />
	</div>
</div>

{#if forfeitVisible}
	<Forfeit {forfeitVisible} {toggleForfeit} />
{/if}
