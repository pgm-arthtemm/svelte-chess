<script lang="ts">
	export let color: string;
	export let file: number;
	export let rank: string;

	const drag = (e: any): any => {
		e.dataTransfer.setData('text/plain', e.target.id);
	};

	const drop = (e: any): any => {
		e.preventDefault();

		let valid: boolean = false;

		if (e.target.tagName === 'IMG') {
			// Pawn already on thie position, move on to validating the move
			// TODO: Validate move

			if (valid) {
				const data = e.dataTransfer.getData('text');
				e.target.appendChild(document.getElementById(data));
			}
		} else {
			// TODO: Validate move
			const data = e.dataTransfer.getData('text');
			e.target.appendChild(document.getElementById(data));
		}
	};

	const dragOver = (e: any): any => {
		e.preventDefault();
	};
</script>

<div
	on:drop={drop}
	on:dragover={dragOver}
	data-id={`${rank}${file}`}
	class={`cell ${color} md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24`}
>
	{#if file === 2}
		<img
			class="absolute"
			id={`piece-${rank}${file}`}
			draggable="true"
			src="/pieces/w-pawn.png"
			alt="white pawn"
			on:dragstart={drag}
		/>
	{/if}

	{#if file === 7}
		<img
			class="absolute"
			id={`piece-${rank}${file}`}
			draggable="true"
			src="/pieces/b-pawn.png"
			alt="black pawn"
			on:dragstart={drag}
		/>
	{/if}

	{#if file === 8}
		{#if rank === 'c' || rank === 'f'}
			<img
				class="absolute"
				id={`piece-${rank}${file}`}
				draggable="true"
				src="/pieces/b-bishop.png"
				alt="black bishop"
				on:dragstart={drag}
			/>
		{/if}
	{/if}

	{#if file === 1}
		{#if rank === 'c' || rank === 'f'}
			<img
				class="absolute"
				id={`piece-${rank}${file}`}
				draggable="true"
				src="/pieces/w-bishop.png"
				alt="white bishop"
				on:dragstart={drag}
			/>
		{/if}
	{/if}

	{#if file === 1}
		{#if rank === 'a' || rank === 'h'}
			<img
				class="absolute"
				id={`piece-${rank}${file}`}
				draggable="true"
				src="/pieces/w-rook.png"
				alt="white rook"
				on:dragstart={drag}
			/>
		{/if}
	{/if}

	{#if file === 1}
		{#if rank === 'b' || rank === 'g'}
			<img
				class="absolute"
				id={`piece-${rank}${file}`}
				draggable="true"
				src="/pieces/w-knight.png"
				alt="white knight"
				on:dragstart={drag}
			/>
		{/if}
	{/if}

	{#if file === 8}
		{#if rank === 'a' || rank === 'h'}
			<img
				class="absolute"
				id={`piece-${rank}${file}`}
				draggable="true"
				src="/pieces/b-rook.png"
				alt="black rook"
				on:dragstart={drag}
			/>
		{/if}
	{/if}

	{#if file === 8}
		{#if rank === 'b' || rank === 'g'}
			<img
				class="absolute"
				id={`piece-${rank}${file}`}
				draggable="true"
				src="/pieces/b-knight.png"
				alt="black knight"
				on:dragstart={drag}
			/>
		{/if}
	{/if}

	{#if file === 8}
		{#if rank === 'd'}
			<img
				class="absolute"
				id={`piece-${rank}${file}`}
				draggable="true"
				src="/pieces/b-queen.png"
				alt="black queen"
				on:dragstart={drag}
			/>
		{/if}
	{/if}

	{#if file === 8}
		{#if rank === 'e'}
			<img
				class="absolute"
				id={`piece-${rank}${file}`}
				draggable="true"
				src="/pieces/b-king.png"
				alt="black king"
				on:dragstart={drag}
			/>
		{/if}
	{/if}

	{#if file === 1}
		{#if rank === 'd'}
			<img
				class="absolute"
				id={`piece-${rank}${file}`}
				draggable="true"
				src="/pieces/w-queen.png"
				alt="white queen"
				on:dragstart={drag}
			/>
		{/if}
	{/if}

	{#if file === 1}
		{#if rank === 'e'}
			<img
				class="absolute"
				id={`piece-${rank}${file}`}
				draggable="true"
				src="/pieces/w-king.png"
				alt="white king"
				on:dragstart={drag}
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
</style>
