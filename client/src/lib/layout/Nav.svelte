<script lang="ts">
	import Login from '$lib/components/auth/Login.svelte';
	import ThemeToggle from '$lib/components/theme/ThemeToggle.svelte';
	import Cookies from 'js-cookie';

	export let checkLogin: () => boolean;

	let visible: boolean = false;

	const handleLogOut = () => {
		Cookies.remove('access_token');
		window.location.reload();
	};

	const handleToggle = () => {
		visible = !visible;
	};
</script>

<div class="bg-gray-800 flex justify-between items-center h-20 px-4 text-white">
	<div>
		<a href="/">
			<h1 class="text-2xl font-bold">Svelte <span class="text-red-500">Chess</span></h1>
		</a>
	</div>
	<div class="flex">
		<div>
			{#if checkLogin()}
				<button on:click={handleLogOut}>Log out</button>
				<a href="/profile">Profile</a>
			{:else}
				<button on:click={handleToggle}>Log in</button>
			{/if}
		</div>
		<ThemeToggle />
	</div>
</div>

{#if visible}
	<Login {visible} {handleToggle} />
{/if}
