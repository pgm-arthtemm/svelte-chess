<script lang="ts">
	import Login from '$lib/components/auth/Login.svelte';
	import Cookies from 'js-cookie';

	export let isLoggedIn: boolean;

	let visible: boolean = false;

	const handleLogOut = () => {
		Cookies.remove('access_token');
		window.location.reload();
	};

	const handleToggle = () => {
		visible = !visible;
	};
</script>

<div class="bg-blue-400 text-white p-4 text-xl">
	{#if isLoggedIn}
		<button on:click={handleLogOut}>Log out</button>
	{:else}
		<button on:click={handleToggle}>Log in</button>
	{/if}
</div>

{#if visible}
	<Login />
{/if}
