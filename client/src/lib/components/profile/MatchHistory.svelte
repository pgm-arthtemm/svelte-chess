<script lang="ts">
	import { ButtonEnum } from '$lib/constants/button-enum';
	import Button from '../button/Button.svelte';
	import { movesConvert } from '$lib/utils/profile/movesConvert';

	export let data: any;
	export let loggedInName: string;

	console.log(loggedInName);
</script>

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
			{#each data as match}
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
							{match.date}
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

<style lang="postcss">
	table {
		border-collapse: separate;
		border-spacing: 0.5em;
	}

	tbody td {
		@apply py-4 border-t-2 border-gray-600;
	}
</style>
