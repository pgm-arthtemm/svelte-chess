<script lang="ts">
	import { playerMoveStore, usernameStore, initPos, moveMade, moves } from '../../../../../stores';
	import { page } from '$app/stores';
	import { move, validateMove, clockSwitch } from '$lib/utils/game';
	import { gameOver } from '$lib/utils/game/gameOver';

	export let color: string;
	export let file: number;
	export let rank: string;

	$: if (`${rank}${file}` === $moveMade.initPosition && $playerMoveStore === $usernameStore) {
		let newPosy: string;

		if ($moveMade.newPosition.length === 3) {
			newPosy = $moveMade.newPosition.substring(1);
		} else {
			newPosy = $moveMade.newPosition;
		}

		if ($moveMade.take) {
			const imageTaken = document.querySelector(`[data-position="${newPosy}"]`);
			imageTaken.remove();
		}

		const checkNewPos = (newPos: string): string => {
			if (newPos.length === 3) {
				return newPos.substring(1);
			} else {
				return newPos;
			}
		};

		// select all divs and remove class init_white
		const initDivs = document.querySelectorAll('.init_white');
		initDivs.forEach((div) => {
			div.classList.remove('init_white');
		});

		// select all divs and remove class init_black
		const initDivs2 = document.querySelectorAll('.init_black');
		initDivs2.forEach((div) => {
			div.classList.remove('init_black');
		});

		const initPos = document.querySelector(`[data-id="${$moveMade.initPosition}"]`);
		const newPos = document.querySelector(`[data-id="${checkNewPos($moveMade.newPosition)}"]`);

		if (initPos.getAttribute('data-color') === 'white') {
			initPos.classList.add('init_white');
		} else {
			initPos.classList.add('init_black');
		}

		if (newPos.getAttribute('data-color') === 'white') {
			newPos.classList.add('init_white');
		} else {
			newPos.classList.add('init_black');
		}

		const image = initPos.querySelector('img');

		if (image) {
			initPos.removeChild(image);
			newPos.appendChild(image);
		} else {
			console.log('image not found');
		}
	}

	const drag = (e: any): any => {
		e.dataTransfer.setData('text/plain', e.target.id);
		$initPos = e.target.dataset.position;
	};

	const drop = (e: any): any => {
		e.preventDefault();

		if ($usernameStore !== $playerMoveStore) {
			console.log('NOT YOUR TURN');
			return;
		}

		const data = e.dataTransfer.getData('text/plain');
		const img = document.getElementById(data);
		const piece = img.dataset.piece;
		const color = img.dataset.color;
		let newPos = e.target.dataset.id;
		let take: boolean = false;

		if (newPos === undefined) {
			take = true;
			newPos = e.target.parentNode.dataset.id;
		}

		let char: string;

		if (validateMove($initPos, newPos, piece, color, take)) {
			img.setAttribute('data-position', newPos);

			clockSwitch($page.params.id, $usernameStore);

			switch (piece) {
				case 'pawn':
					char = '';
					break;
				case 'rook':
					char = 'R';
					break;
				case 'knight':
					char = 'N';
					break;
				case 'bishop':
					char = 'B';
					break;
				case 'queen':
					char = 'Q';
					break;
				case 'king':
					char = 'K';
					break;
				default:
					char = '';
					break;
			}

			const data = e.dataTransfer.getData('text');

			if (take) {
				if (e.target.dataset.piece === 'king') {
					const color = $moves.length % 2 === 0 ? 'black' : 'white';

					gameOver($page.params.id, $playerMoveStore, color);
				}

				console.log($playerMoveStore);
				console.log(e.target.dataset.piece);

				const parentDiv = e.target.parentNode;
				e.target.remove();
				parentDiv.appendChild(document.getElementById(data));
				move($page.params.id, `${char}${newPos}`, $initPos, take);
			} else {
				e.target.appendChild(document.getElementById(data));
				move($page.params.id, `${char}${newPos}`, $initPos, take);
			}
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
			on:dragstart={drag}
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
			on:dragstart={drag}
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
				data-position={`${rank}${file}`}
				src="/pieces/w-bishop.png"
				data-color="white"
				data-piece="bishop"
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
				data-position={`${rank}${file}`}
				src="/pieces/w-rook.png"
				data-color="white"
				data-piece="rook"
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
				data-position={`${rank}${file}`}
				src="/pieces/w-knight.png"
				data-color="white"
				data-piece="knight"
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
				data-position={`${rank}${file}`}
				src="/pieces/b-rook.png"
				data-color="black"
				data-piece="rook"
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
				data-position={`${rank}${file}`}
				src="/pieces/b-knight.png"
				data-color="black"
				data-piece="knight"
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
				data-position={`${rank}${file}`}
				src="/pieces/b-queen.png"
				data-color="black"
				data-piece="queen"
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
				data-position={`${rank}${file}`}
				src="/pieces/b-king.png"
				data-color="black"
				data-piece="king"
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
				data-position={`${rank}${file}`}
				src="/pieces/w-queen.png"
				data-color="white"
				data-piece="queen"
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
				data-position={`${rank}${file}`}
				src="/pieces/w-king.png"
				data-color="white"
				data-piece="king"
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
