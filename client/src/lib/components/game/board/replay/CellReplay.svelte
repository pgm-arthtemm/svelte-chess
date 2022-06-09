<script lang="ts">
	import { replayMove } from '../../../../../stores';

	export let color: string;
	export let file: number;
	export let rank: string;
	export let moves: any;

	$: if ($replayMove >= 0 && $replayMove < moves.length) {
		if (moves[$replayMove].to !== undefined && moves[$replayMove].to.length > 2) {
			moves[$replayMove].to = moves[$replayMove].to.substring(1);
		}

		if (moves[$replayMove].from === `${rank}${file}`) {
			const image = document.querySelector(`[data-position="${rank}${file}"]`);
			const source = document.querySelector(`[data-id="${moves[$replayMove].from}"]`);
			const destination = document.querySelector(`[data-id="${moves[$replayMove].to}"]`);

			if (destination.querySelector('img')) {
				destination.querySelector('img').remove();
				destination.appendChild(source.querySelector('img'));
				image.setAttribute('data-position', moves[$replayMove].to);
			} else {
				source.childNodes[0].remove();
				destination.appendChild(image);
				image.setAttribute('data-position', moves[$replayMove].to);
			}
		}
	}
</script>

<div
	data-id={`${rank}${file}`}
	data-color={color}
	class={`cell ${color} md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24`}
>
	{#if file === 2}
		<img
			class="absolute"
			id={`piece-${rank}${file}`}
			data-position={`${rank}${file}`}
			draggable="true"
			src="/pieces/w-pawn.png"
			data-color="white"
			data-piece="pawn"
			alt="white pawn"
		/>
	{/if}

	{#if file === 7}
		<img
			class="absolute"
			id={`piece-${rank}${file}`}
			draggable="true"
			data-position={`${rank}${file}`}
			src="/pieces/b-pawn.png"
			data-color="black"
			data-piece="pawn"
			alt="black pawn"
		/>
	{/if}

	{#if file === 8}
		{#if rank === 'c' || rank === 'f'}
			<img
				class="absolute"
				id={`piece-${rank}${file}`}
				draggable="true"
				data-position={`${rank}${file}`}
				src="/pieces/b-bishop.png"
				data-color="black"
				data-piece="bishop"
				alt="black bishop"
			/>
		{/if}
	{/if}

	{#if file === 1}
		{#if rank === 'c' || rank === 'f'}
			<img
				class="absolute"
				id={`piece-${rank}${file}`}
				draggable="true"
				data-position={`${rank}${file}`}
				src="/pieces/w-bishop.png"
				data-color="white"
				data-piece="bishop"
				alt="white bishop"
			/>
		{/if}
	{/if}

	{#if file === 1}
		{#if rank === 'a' || rank === 'h'}
			<img
				class="absolute"
				id={`piece-${rank}${file}`}
				draggable="true"
				data-position={`${rank}${file}`}
				src="/pieces/w-rook.png"
				data-color="white"
				data-piece="rook"
				alt="white rook"
			/>
		{/if}
	{/if}

	{#if file === 1}
		{#if rank === 'b' || rank === 'g'}
			<img
				class="absolute"
				id={`piece-${rank}${file}`}
				draggable="true"
				data-position={`${rank}${file}`}
				src="/pieces/w-knight.png"
				data-color="white"
				data-piece="knight"
				alt="white knight"
			/>
		{/if}
	{/if}

	{#if file === 8}
		{#if rank === 'a' || rank === 'h'}
			<img
				class="absolute"
				id={`piece-${rank}${file}`}
				draggable="true"
				data-position={`${rank}${file}`}
				src="/pieces/b-rook.png"
				data-color="black"
				data-piece="rook"
				alt="black rook"
			/>
		{/if}
	{/if}

	{#if file === 8}
		{#if rank === 'b' || rank === 'g'}
			<img
				class="absolute"
				id={`piece-${rank}${file}`}
				draggable="true"
				data-position={`${rank}${file}`}
				src="/pieces/b-knight.png"
				data-color="black"
				data-piece="knight"
				alt="black knight"
			/>
		{/if}
	{/if}

	{#if file === 8}
		{#if rank === 'd'}
			<img
				class="absolute"
				id={`piece-${rank}${file}`}
				draggable="true"
				data-position={`${rank}${file}`}
				src="/pieces/b-queen.png"
				data-color="black"
				data-piece="queen"
				alt="black queen"
			/>
		{/if}
	{/if}

	{#if file === 8}
		{#if rank === 'e'}
			<img
				class="absolute"
				id={`piece-${rank}${file}`}
				draggable="true"
				data-position={`${rank}${file}`}
				src="/pieces/b-king.png"
				data-color="black"
				data-piece="king"
				alt="black king"
			/>
		{/if}
	{/if}

	{#if file === 1}
		{#if rank === 'd'}
			<img
				class="absolute"
				id={`piece-${rank}${file}`}
				draggable="true"
				data-position={`${rank}${file}`}
				src="/pieces/w-queen.png"
				data-color="white"
				data-piece="queen"
				alt="white queen"
			/>
		{/if}
	{/if}

	{#if file === 1}
		{#if rank === 'e'}
			<img
				class="absolute"
				id={`piece-${rank}${file}`}
				draggable="true"
				data-position={`${rank}${file}`}
				src="/pieces/w-king.png"
				data-color="white"
				data-piece="king"
				alt="white king"
			/>
		{/if}
	{/if}
</div>

<style lang="postcss">
	.white {
		background-color: rgb(245, 238, 238);
	}
	.black {
		background-color: rgb(48, 48, 47);
	}

	.init_white {
		background-color: rgb(237, 213, 182);
	}

	.init_black {
		background-color: rgb(96, 85, 67);
	}

	.cell {
		position: relative;
	}

	img {
		position: absolute;
		width: 80%;
		height: 80%;
		margin: 0.3rem;
	}
</style>
