<script>
	import '../app.postcss';
	import Nav from '$lib/layout/Nav.svelte';
	import Cookies from 'js-cookie';

	const isLoggedIn = Cookies.get('access_token') !== undefined;
</script>

<div class="bg-gray-700 h-screen">
	<Nav {isLoggedIn} />
	<main class="container">
		<slot />
	</main>
</div>
