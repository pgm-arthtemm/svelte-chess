<script lang="ts">
	import { moves, replayMove, prevMove, usernameStore } from '../stores';
	import MatchHistory from '$lib/components/profile/MatchHistory.svelte';
	import { checkLogin } from '$lib/utils/checkLogin';
	import jwt_decode from 'jwt-decode';
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import { apiBaseUrl } from '$lib/config/config';
	import { goto } from '$app/navigation';

	onMount(() => {
		if (!checkLogin()) {
			goto('/');
		}
	});

	let gameData: any;
	let loggedInUser: string;

	$replayMove = -1;
	$moves = [];
	$prevMove = {
		from: '',
		to: ''
	};

	onMount(async () => {
		if (checkLogin()) {
			const decoded: any = jwt_decode(Cookies.get('access_token'));
			loggedInUser = decoded.username;
			$usernameStore = decoded.username;

			const response = await fetch(`${apiBaseUrl}/games/userId/${decoded.sub}`);
			gameData = await response.json();
		}
	});

	let username: string = '';
	let password: string = '';
</script>

{#if gameData}
	<div class="lg:w-2/3 m-auto ">
		<h1 class="text-white font-semibold text-5xl mb-4">Your Profile</h1>
		<div class="bg-gray-800 rounded-lg p-4 mb-6">
			<div class="flex justify-between w-11/12 m-auto h-full" />
		</div>
		<MatchHistory loggedInName={loggedInUser} data={gameData} />
	</div>
{/if}
