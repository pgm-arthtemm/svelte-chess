<script>
	import Board from '$lib/components/game/board/Board.svelte';
	import Box from '$lib/components/box/Box.svelte';
	import { settings } from '../../stores';
	console.log($settings);
</script>

<div class="block md:flex">
	<!-- <Chat /> -->
	<Box title="Chat with your opponent" textInput={true} content="test" />
	<Board />
</div>
