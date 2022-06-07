<script lang="ts">
	import MatchHistory from '$lib/components/profile/MatchHistory.svelte';

	let username: string = '';
	let password: string = '';
</script>

<div class="bg-gray-800 rounded-lg p-4">
	<div class="flex justify-between w-11/12 m-auto h-full">
		<img class="rounded-full" src="https://picsum.photos/200" alt="" />
		<section>
			<div class="flex flex-col">
				<label class="font-bold text-xl pb-2" for="username">Username</label>
				<input bind:value={username} type="text" placeholder="username" />
			</div>

			<div class="flex flex-col">
				<label class="font-bold text-xl pb-2" for="password">Password</label>
				<input bind:value={password} type="password" placeholder="password" />
			</div>
		</section>
	</div>
</div>

<MatchHistory />
