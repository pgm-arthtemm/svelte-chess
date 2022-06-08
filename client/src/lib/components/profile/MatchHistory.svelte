<script lang="ts">
	import { ButtonEnum } from '$lib/constants/button-enum';
	import Button from '../button/Button.svelte';
	import { movesConvert } from '$lib/utils/profile/movesConvert';
	import { usernameStore } from '../../../stores';

	export let data: any;

	console.log(data);
</script>

<div class="border-8 border-gray-800 rounded-lg py-2 px-6">
	<ul>
		{#each data as match}
			<li class="flex items-center justify-between">
				<div>
					<p class="font-semibold text-white">
						{match.whitePlayer === $usernameStore ? 'You' : match.whitePlayer}
					</p>
					<p>vs</p>
					<p class="font-semibold">
						{match.blackPlayer === $usernameStore ? 'You' : match.blackPlayer}
					</p>
				</div>
				<div>
					<p class="font-bold text-2xl text-yellow-300">{match.winner}</p>
				</div>
				<div>{match.date}</div>
				<div>
					<p>{movesConvert(match.moves).length} moves</p>
				</div>
				<div>
					<a class="text-blue-400 cursor-pointer underline" href={`/analyze/${match.id}`}>Analyze</a
					>
				</div>
				<div>
					{#if match.winner === $usernameStore}
						<Button text="WIN" type={ButtonEnum.success} />
					{:else if match.winner === 'draw'}
						<Button text="DRAW" type={ButtonEnum.warning} />
					{:else}
						<Button text="LOSS" type={ButtonEnum.danger} />
					{/if}
				</div>
			</li>
		{/each}
	</ul>
</div>
