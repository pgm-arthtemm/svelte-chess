<script lang="ts">
	import Register from '$lib/components/auth/Register.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { ColorEnum } from '$lib/constants/color-enum';
	import type { ResultTypeEnum } from '$lib/constants/result-type.enum';
	import { checkLogin } from '$lib/utils/checkLogin';
	import { timeConvert } from '$lib/utils/game';
	import {
		opponentName,
		opponentTimeSpent,
		selectedColor,
		usernameStore,
		yourTimeSpent
	} from '../../../../stores';

	export let result: ColorEnum = ColorEnum.none;
	export let won: boolean = false;
	export let winnerName: string;
	export let resultType: ResultTypeEnum;
	export let showResult: boolean = false;
	export let toggleResult: () => void;
	export let draw: boolean = false;

	let showRegister: boolean = false;
	const toggleRegister = () => (showRegister = !showRegister);

	let loggedIn: boolean = checkLogin();
	let title: string;

	let notWinnerName: string;

	if (winnerName !== $usernameStore) {
		notWinnerName === $opponentName;
	}

	if (won) {
		title = 'You won!';
	} else {
		title = 'You lost!';
	}

	if (draw) {
		title = 'Draw!';
	}
</script>

<Modal {title} open={showResult} on:close={toggleResult}>
	<svelte:fragment slot="modal-body">
		<section>
			<div class="flex justify-between w-2/3 md:w-1/3 lg:w-1/2 m-auto items-center">
				<div class="text-center">
					<img
						class={`${
							result === 'black' ? 'border-4 border-green-700' : 'border-2 border-gray-600'
						} w-20 h-20 rounded-md shadow-2xl m-auto`}
						src="/pieces/w-pawn.png"
						alt="white-pawn"
					/>
					<p class="text-xl font-semibold">
						{$selectedColor === 'white' ? $usernameStore : $opponentName}
					</p>
				</div>
				<p class="text-lg font-bold">vs</p>
				<div class="text-center">
					<img
						class={`${
							result === 'white' ? 'border-4 border-green-700' : 'border-2 border-gray-600'
						} w-20 h-20 rounded-md shadow-2xl m-auto`}
						src="/pieces/b-pawn.png"
						alt="white-pawn"
					/>
					<p class="text-xl font-semibold">
						{$selectedColor === 'black' ? $usernameStore : $opponentName}
					</p>
				</div>
			</div>

			<div class="text-lg font-semibold mt-6 text-center">
				{#if draw}
					<p>The game ended in a <span class="font-bold">draw</span></p>
				{:else}
					<p>You {won ? 'won' : 'lost'} the game by <span class="font-bold">{resultType}</span>.</p>
				{/if}
				<p>
					This game took <span class="font-bold"
						>{timeConvert($opponentTimeSpent + $yourTimeSpent)}</span
					>, you spent
					<span class="font-bold">{timeConvert($yourTimeSpent)}</span>.
				</p>
			</div>

			{#if !loggedIn}
				<div class="text-center my-8 text-lg font-semibold">
					<p>You can save the result of your games by signing up.</p>
					<p on:click={toggleRegister} class="text-blue-700 underline cursor-pointer">
						Sign up here
					</p>
				</div>
			{/if}
		</section>
	</svelte:fragment>
</Modal>

{#if showRegister}
	<Register visible={showRegister} handleToggle={toggleRegister} afterGame={true} />
{/if}
