<script lang="ts" context="module">
	// fetch match data
</script>

<script>
	import { ButtonEnum } from '$lib/constants/button-enum';

	const matches = [
		{
			date: '2020-01-01',
			opponent: 'Opponent 1',
			result: ButtonEnum.danger
		},
		{
			date: '2020-01-01',
			opponent: 'Opponent 2',
			result: ButtonEnum.success
		},
		{
			date: '2020-01-01',
			opponent: 'Opponent 3',
			result: ButtonEnum.warning
		}
	];
</script>

<div class="border-8 border-gray-800 rounded-lg h-20">
	<ul>
		{#each matches as match}
			<li>
				<div class="flex justify-between">
					<div>
						<span class="font-bold">{match.date}</span>
						<span>{match.opponent}</span>
					</div>
					<div>
						<button
							class={match.result === ButtonEnum.danger
								? 'bg-red-500 hover:bg-red-700 text-white w-24 font-bold py-2 px-4 rounded-lg border-b-4 border-red-800'
								: match.result === ButtonEnum.success
								? 'bg-green-500 hover:bg-green-700 text-white w-24 font-bold py-2 px-4 rounded-lg border-b-4 border-green-800'
								: 'bg-yellow-500 hover:bg-yellow-700 text-white w-24 font-bold py-2 px-4 rounded-lg border-b-4 border-yellow-800'}
							>{match.result}</button
						>
					</div>
				</div>
			</li>
		{/each}
	</ul>
</div>
