<script lang="ts">
	import MatchHistory from '$lib/components/profile/MatchHistory.svelte';
	import { checkLogin } from '$lib/utils/checkLogin';
	import jwt_decode from 'jwt-decode';
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';

	let gameData: any;

	onMount(async () => {
		if (checkLogin()) {
			const { sub }: any = jwt_decode(Cookies.get('access_token'));
			const response = await fetch(`http://localhost:4000/games/userId/${sub}`);
			gameData = await response.json();
		}
	});

	let username: string = '';
	let password: string = '';
</script>

{#if gameData}
	<div class="bg-gray-800 rounded-lg p-4">
		<div class="flex justify-between w-11/12 m-auto h-full">
			<img class="rounded-full" src="https://picsum.photos/200" alt="" />
			<section>
				<div class="flex flex-col">
					<label class="font-bold text-xl pb-2" for="username">Username</label>
					<input bind:value={username} type="text" placeholder="username" />
				</div>

				<div class="flex flex-col">
					<label class="font-bold text-xl pb-2" for="password">Password</label>
					<input bind:value={password} type="password" placeholder="password" />
				</div>
			</section>
		</div>
	</div>
	<MatchHistory data={gameData} />
{/if}
