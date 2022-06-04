<script lang="ts" context="module">
	const matches = [
		{
			id: 1,
			date: new Date(new Date().getTime()),
			result: 'win',
			username: 'LoggedinUser',
			opponent: {
				id: 2,
				username: 'Opponent123',
				color: 'black'
			}
		},
		{
			id: 1,
			date: new Date(new Date().getTime()),
			result: 'draw',
			username: 'LoggedinUser',
			opponent: {
				id: 2,
				username: 'Opponent123',
				color: 'white'
			}
		},
		{
			id: 1,
			date: new Date(new Date().getTime()),
			result: 'loss',
			username: 'LoggedinUser',
			opponent: {
				id: 2,
				username: 'Opponent123',
				color: 'white'
			}
		},
		{
			id: 1,
			date: new Date(new Date().getTime()),
			result: 'win',
			username: 'LoggedinUser',
			opponent: {
				id: 2,
				username: 'Opponent123',
				color: 'white'
			}
		}
	];
</script>

<script lang="ts">
	import { ButtonEnum } from '$lib/constants/button-enum';
	import Button from '../button/Button.svelte';
	import { dateFormat } from '$lib/utils/dateFormat';

	const userColor = (match: any): string => {
		if (match.opponent.color === 'white') {
			return 'black';
		} else {
			return 'white';
		}
	};

	const opponentColor = (match: any): string => {
		if (match.opponent.color === 'white') {
			return 'white';
		} else {
			return 'black';
		}
	};
</script>

<div class="border-8 border-gray-800 rounded-lg py-2 px-6">
	<ul>
		{#each matches as match}
			<li class="py-4">
				<div class="flex justify-between items-center">
					<div class="flex-1 justify-between  font-semibold text-lg leading-8">
						<div class="flex items-center">
							<p class={`pl-2 text-${userColor(match)}`}>{match.username}</p>
						</div>
						<div class="m-0 p-0 pl-6 text-white">
							<p>vs</p>
						</div>
						<div class="flex items-center">
							<p class={`pl-2 text-${opponentColor(match)}`}>{match.opponent.username}</p>
						</div>
					</div>
					<div class="flex-1">
						{#if match.result === 'win'}
							<Button text="WIN" type={ButtonEnum.success} />
						{/if}
						{#if match.result === 'draw'}
							<Button text="DRAW" type={ButtonEnum.warning} />
						{/if}
						{#if match.result === 'loss'}
							<Button text="LOSS" type={ButtonEnum.danger} />
						{/if}
					</div>
					<div class="flex-1">
						<a class="underline text-blue-300 visited:text-purple-500" href={`/analyze/${match.id}`}
							>Analyze</a
						>
					</div>
					<div class="flex-1">
						<span class="text-white font-semibold text-lg">{dateFormat(match.date)}</span>
					</div>
				</div>
			</li>
		{/each}
	</ul>
</div>
