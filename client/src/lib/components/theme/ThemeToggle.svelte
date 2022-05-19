<script lang="ts">
	import { theme } from '../../../stores';

	const themeToggle = (): void => {
		if ($theme === 'dark') {
			theme.set('light');
		} else {
			theme.set('dark');
		}
	};
</script>

<div>
	<!-- if theme is dark button is dark gray, if theme is light button is light gray -->
	<button
		class={`bg-${
			$theme === 'dark' ? 'gray-700' : 'gray-300'
		} text-white font-bold py-2 px-4 border border-${
			$theme === 'dark' ? 'gray-300' : 'gray-700'
		} rounded`}
		on:click={themeToggle}
	>
		Toggle theme
	</button>
</div>
