<script>
	import Board from '$lib/components/game/board/Board.svelte';
	import Box from '$lib/components/box/Box.svelte';
</script>

<div class="block md:flex justify-between">
	<Box title="Chat with your opponent" textInput={true} />
	<Board />
	<div>
		<Box title="Moves played" />
		<Box title="Actions" />
	</div>
</div>
