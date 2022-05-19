<script>
	import '../app.postcss';
	import Nav from '$lib/layout/Nav.svelte';
	import Cookies from 'js-cookie';
	import { theme } from '../stores';

	const isLoggedIn = Cookies.get('access_token') !== undefined;
</script>

<div class={`h-screen bg-${$theme === 'dark' ? 'gray-800' : 'gray-300'}`}>
	<Nav {isLoggedIn} />
	<main>
		<slot />
	</main>
</div>
