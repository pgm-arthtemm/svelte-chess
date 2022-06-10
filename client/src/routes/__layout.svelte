<script lang="ts">
	import '../app.postcss';
	import Nav from '$lib/layout/Nav.svelte';
	import { checkLogin } from '$lib/utils/checkLogin';

	$: checkLogin();
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/pieces/b-queen.png" />
</svelte:head>

<div>
	<Nav {checkLogin} />
	<main class="container mx-auto p-2 sm:p-0">
		<slot />
	</main>
</div>
