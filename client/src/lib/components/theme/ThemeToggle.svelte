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
	<button
		class={`bg-${
			$theme === 'dark' ? 'gray-700' : 'gray-300'
		} text-white border border-gray-400 rounded-lg px-2 font-bold`}
		on:click={themeToggle}
	>
		toggle
	</button>
</div>
