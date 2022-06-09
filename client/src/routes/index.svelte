<script lang="ts">
	import { checkLogin } from '$lib/utils/checkLogin';
	import jwt_decode from 'jwt-decode';
	import Cookies from 'js-cookie';
	import { apiBaseUrl } from '$lib/config/config';
	import { usernameStore } from '../stores';
	import { onMount } from 'svelte';

	let user: any;
	let users: any;
	let games: any;
	let loaded: boolean = false;

	onMount(() => {
		const getData = async () => {
			const usersRes = await fetch(`${apiBaseUrl}/users`);
			const gamesRes = await fetch(`${apiBaseUrl}/games`);

			users = await usersRes.json();
			games = await gamesRes.json();

			if (checkLogin()) {
				const { sub }: any = jwt_decode(Cookies.get('access_token'));
				const userRes = await fetch(`${apiBaseUrl}/users/id/${sub}`);
				user = await userRes.json();
			}

			loaded = true;
		};

		getData();
	});

	if (checkLogin() && loaded) {
		$usernameStore = user.username;
	}

	const openNewGame = (): any => {
		const newGameButton = document.getElementById('newGame');
		newGameButton.click();
	};

	const createAccount = (): any => {
		const accountButton = document.getElementById('createAccount');
		accountButton.click();
	};
</script>

<svelte:head>
	<title>Svelte Chess - Home</title>
</svelte:head>

{#if loaded}
	<div
		class="text-center text-3xl md:text-4xl 2xl:text-6xl 2xl:leading-normal 2xl:font-bold md:flex text-white font-semibold mt-4"
	>
		<img class="hidden w-1/2 md:block" src="/board.PNG" alt="board" />
		<div class="p-8">
			<h1>Play Chess for Free against your friends!</h1>
			<div class="flex justify-between mt-6 lg:w-2/3 m-auto">
				<p class="text-lg font-semibold text-gray-400">
					<span class="text-white">{users.length}</span> players registered.
				</p>
				<p class="text-lg font-semibold text-gray-400">
					<span class="text-white">{games.length}</span> games played.
				</p>
			</div>
			<div
				on:click={openNewGame}
				class="bg-green-500 mb-6 cursor-pointer hover:bg-green-700 text-white text-2xl text-center w-2/3 m-auto font-bold py-4 mt-4 px-4 rounded-lg border-b-4 border-green-800"
			>
				<h1>Challenge a friend</h1>
			</div>
			{#if !checkLogin()}
				<div
					on:click={createAccount}
					class="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white text-2xl text-center w-2/3 m-auto font-bold py-4 mt-4 px-4 rounded-lg border-b-4 border-blue-800"
				>
					<h1>Create an account</h1>
				</div>
			{:else}
				<div
					class="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white text-2xl text-center w-2/3 m-auto font-bold py-4 mt-4 px-4 rounded-lg border-b-4 border-blue-800"
				>
					<a sveltekit:prefetch href="/profile">View my previous matches</a>
				</div>
			{/if}
		</div>
	</div>
{/if}
