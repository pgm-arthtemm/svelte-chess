<script lang="ts">
	import { ButtonEnum } from '$lib/constants/button-enum';

	export let text: string;
	export let onClick: () => void = () => {};
	export let type: ButtonEnum;
</script>

<div>
	<button
		on:click={onClick}
		class={type === ButtonEnum.danger
			? 'bg-red-500 hover:bg-red-700 text-white w-24 font-bold py-2 px-4 rounded-lg border-b-4 border-red-800'
			: type === ButtonEnum.success
			? 'bg-green-500 hover:bg-green-700 text-white w-24 font-bold py-2 px-4 rounded-lg border-b-4 border-green-800'
			: 'bg-yellow-500 hover:bg-yellow-700 text-white w-24 font-bold py-2 px-4 rounded-lg border-b-4 border-yellow-800'}
		>{text}</button
	>
</div>
