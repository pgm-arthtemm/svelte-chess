<script lang="ts">
	import Login from '$lib/components/auth/Login.svelte';
	import ThemeToggle from '$lib/components/theme/ThemeToggle.svelte';
	import Cookies from 'js-cookie';
	import { theme } from '../../stores';

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

<div class={`bg-${$theme === 'dark' ? 'gray-900' : 'gray-700'} text-white p-4 text-xl`}>
	{#if isLoggedIn}
		<button on:click={handleLogOut}>Log out</button>
	{:else}
		<button on:click={handleToggle}>Log in</button>
	{/if}
	<ThemeToggle />
</div>

{#if visible}
	<Login />
{/if}
