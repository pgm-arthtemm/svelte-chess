<script lang="ts">
	import { goto } from '$app/navigation';
	import Login from '$lib/components/auth/Login.svelte';
	import NewGame from '$lib/components/game/modal/NewGame.svelte';
	import Cookie from 'js-cookie';

	export let checkLogin: () => boolean;

	let visible: boolean = false;
	let newGameVisible: boolean = false; // @TODO: CHANGE THIS TO FALSE IN PRODUCTION

	const handleLogOut = (): void => {
		Cookie.remove('access_token');
		goto('/');
		window.location.reload();
	};

	const newGame = () => {
		newGameVisible = !newGameVisible;
	};

	const handleToggle = (): void => {
		visible = !visible;
	};

	const handleToggleNewGame = (): void => {
		newGameVisible = !newGameVisible;
	};
</script>

<div class="bg-gray-800 flex justify-between items-center h-20 px-4 mb-4 text-white">
	<div>
		<a sveltekit:prefetch href="/">
			<h1 class="text-2xl font-bold">Svelte <span class="text-red-500">Chess</span></h1>
		</a>
	</div>
	<div class="flex">
		<div>
			<ul class="flex text-lg">
				<li>
					<button
						class="font-semibold mr-6 transition-all duration-200 hover:text-red-500"
						id="newGame"
						on:click={newGame}>New Game</button
					>
				</li>
				<li>
					{#if checkLogin()}
						<button
							class="font-semibold mr-6 transition-all duration-200 hover:text-red-500"
							on:click={handleLogOut}>Log out</button
						>
						<a
							class="font-semibold mr-6 transition-all duration-200 hover:text-red-500"
							sveltekit:prefetch
							href="/profile">Profile</a
						>
					{:else}
						<button
							id="createAccount"
							class="font-semibold mr-6 transition-all duration-200 hover:text-red-500"
							on:click={handleToggle}>Log in</button
						>
					{/if}
				</li>
			</ul>
		</div>
	</div>
</div>

{#if visible}
	<Login {visible} {handleToggle} />
{/if}

{#if newGameVisible}
	<NewGame {newGameVisible} {handleToggleNewGame} />
{/if}
