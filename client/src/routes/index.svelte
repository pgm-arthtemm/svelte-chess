<script context="module" lang="ts">
	import { checkLogin } from '$lib/utils/checkLogin';
	import jwt_decode from 'jwt-decode';
	import Cookies from 'js-cookie';

	export const load = async ({ fetch }) => {
		let user: any;
		let users: any;

		if (checkLogin()) {
			const { sub }: any = jwt_decode(Cookies.get('access_token'));
			const response = await fetch(`http://localhost:4000/users/id/${sub}`);
			const repsonse2 = await fetch('http://localhost:4000/users');
			user = await response.json();
			users = await repsonse2.json();
		}

		return {
			props: {
				data: {
					user,
					users
				}
			}
		};
	};
</script>

<script lang="ts">
	import Forfeit from '$lib/components/game/actions/Forfeit.svelte';
	import Result from '$lib/components/game/modal/Result.svelte';
	import { usernameStore } from '../stores';
	import { ColorEnum } from '$lib/constants/color-enum';
	import { ResultTypeEnum } from '$lib/constants/result-type.enum';

	export let data: any;

	if (checkLogin()) {
		$usernameStore = data.user.username;
	}

	const openNewGame = (): any => {
		const newGameButton = document.getElementById('newGame');
		newGameButton.click();
	};
</script>

<svelte:head>
	<title>Svelte Chess - Home</title>
</svelte:head>

<div
	class="text-center text-3xl md:text-4xl 2xl:text-6xl 2xl:leading-normal 2xl:font-bold md:flex text-white font-semibold mt-4"
>
	<img class="hidden w-1/2 md:block" src="/board.PNG" alt="board" />
	<div class="p-8">
		<h1>Play Chess for Free against your friends!</h1>
		<div class="flex justify-between mt-6 lg:w-2/3 m-auto">
			<p class="text-lg font-semibold text-gray-400">
				<span class="text-white">12</span> players registered.
			</p>
			<p class="text-lg font-semibold text-gray-400">
				<span class="text-white">45</span> games played.
			</p>
		</div>
		<div
			on:click={() => openNewGame()}
			class="bg-green-500 cursor-pointer hover:bg-green-700 text-white text-2xl text-center w-2/3 m-auto font-bold py-4 mt-4 px-4 rounded-lg border-b-4 border-green-800"
		>
			<h1>Challenge a friend</h1>
		</div>
	</div>
</div>
