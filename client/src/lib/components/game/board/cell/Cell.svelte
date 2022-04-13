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

<div on:drop={drop} on:dragover={dragOver} data-id={`${rank}${file}`} class={`cell ${color} m-0`}>
	{#if file === 2}
		<img
			id={`piece-${rank}${file}`}
			draggable="true"
			src="/pieces/w-pawn.png"
			alt="white pawn"
			on:dragstart={drag}
		/>
	{/if}

	{#if file === 7}
		<img
			id={`piece-${rank}${file}`}
			draggable="true"
			src="/pieces/b-pawn.png"
			alt="black pawn"
			on:dragstart={drag}
		/>
	{/if}
</div>

<style>
	.cell {
		width: calc(40em / 8);
		height: calc(40em / 8);
	}
	.white {
		background-color: rgb(245, 238, 238);
	}
	.black {
		background-color: rgb(48, 48, 47);
	}
</style>
