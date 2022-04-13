<script>
	import '../app.postcss';
	import Nav from '$lib/layout/Nav.svelte';
	import Cookies from 'js-cookie';

	const isLoggedIn = Cookies.get('access_token') !== undefined;
</script>

<div>
	<Nav {isLoggedIn} />
	<main>
		<slot />
	</main>
</div>

<style lang="postcss">
</style>
