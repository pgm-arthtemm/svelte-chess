<script lang="ts">
	import { ButtonEnum } from '$lib/constants/button-enum';
	import Button from '../button/Button.svelte';
	import { movesConvert } from '$lib/utils/profile/movesConvert';
	import { dateConvert } from '$lib/utils/profile/dateConvert';

	export let data: any;

	const gameData = data.reverse();

	export let loggedInName: string;

	const openNewGame = () => {
		document.getElementById('newGame').click();
	};
</script>

{#if gameData.length > 0}
	<h1 class="text-white font-semibold text-5xl">Your match history</h1>
	<div class="border-8 border-gray-800 rounded-lg py-2 my-4 px-6">
		<table class="w-full text-lg text-left text-white">
			<thead class="border-b-2 border-gray-500">
				<tr class="text-2xl">
					<th scope="col" class="font-semibold">Players</th>
					<th scope="col" class="font-semibold">Winner</th>
					<th scope="col" class="font-semibold">Date</th>
					<th scope="col" class="font-semibold">Moves</th>
					<th scope="col" class="font-semibold">Analysis</th>
					<th scope="col" class="font-semibold">Result</th>
				</tr>
			</thead>
			<tbody>
				{#each gameData as match}
					<tr>
						<td>
							<div class="flex items-center mb-1">
								<div class="w-4 h-4 bg-white rounded-sm mr-2" />
								<p class=" text-white font-semibold">
									{match.whitePlayer === loggedInName ? 'You' : match.whitePlayer}
								</p>
							</div>
							<div>
								<div class="flex items-center">
									<div class="w-4 h-4 bg-black rounded-sm mr-2" />
									<p class=" text-black font-bold">
										{match.blackPlayer === loggedInName ? 'You' : match.blackPlayer}
									</p>
								</div>
							</div></td
						>
						<td>
							<p class="text-yellow-300 font-semibold">
								{match.winner === loggedInName ? 'You' : match.winner}
							</p>
						</td>
						<td>
							<p class=" text-white">
								{dateConvert(match.date)}
							</p>
						</td>
						<td>
							<p class=" text-white">
								{movesConvert(match.moves).length}
							</p>
						</td>
						<td>
							<a
								sveltekit:prefetch
								class="text-blue-400 cursor-pointer underline"
								href={`/analyze/${match.id}`}>Analyze</a
							>
						</td>
						<td>
							<div>
								{#if match.winner === loggedInName}
									<Button text="WIN" type={ButtonEnum.success} />
								{:else if match.winner === 'draw'}
									<Button text="DRAW" type={ButtonEnum.warning} />
								{:else}
									<Button text="LOSS" type={ButtonEnum.danger} />
								{/if}
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<h1 class="text-white font-semibold text-3xl text-center mt-8">No match history</h1>
	<div
		on:click={openNewGame}
		class="bg-green-500 mb-6 cursor-pointer hover:bg-green-700 text-white text-2xl text-center w-2/3 m-auto font-bold py-4 mt-4 px-4 rounded-lg border-b-4 border-green-800"
	>
		<h1>Challenge a friend</h1>
	</div>
{/if}

<style lang="postcss">
	table {
		border-collapse: separate;
		border-spacing: 0.5em;
	}

	tbody td {
		@apply py-4 border-t-2 border-gray-600;
	}
</style>
