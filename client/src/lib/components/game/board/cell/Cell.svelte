<script lang="ts">
	export let color;
	export let file;
	export let rank;
</script>

<div data-id={`${rank}${file}`} class={`cell ${color}`} />

<style>
	.cell {
		width: calc(40em / 8);
		height: calc(40em / 8);
	}
	.white {
		background-color: rgb(245, 238, 238);
	}
	.black {
		background-color: rgb(48, 48, 47);
	}
</style>
