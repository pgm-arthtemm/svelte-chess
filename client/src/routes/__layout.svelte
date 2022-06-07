<script>
	import '../app.postcss';
	import Nav from '$lib/layout/Nav.svelte';
	import { checkLogin } from '$lib/utils/checkLogin';
</script>

<div class="bg-gray-700 h-screen">
	<Nav {checkLogin} />
	<main class="container mx-auto p-2 sm:p-0">
		<slot />
	</main>
</div>
