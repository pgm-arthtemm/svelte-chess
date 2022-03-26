<script lang="typescript">
	import { apiBaseUrl } from '$lib/config/config';

	interface LoginType {
		username: string;
		password: string;
	}

	let username: string;
	let password: string;

	let data: LoginType;

	const login = async (): Promise<void> => {
		const res: Response = await fetch(`${apiBaseUrl}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		});

		if (res.ok) {
			data = await res.json();
			console.log(data);
		} else {
			const error = res.statusText;
			console.log(error);
		}
	};
</script>

<form on:submit|preventDefault={login}>
	<div class="flex">
		<input type="text" bind:value={username} placeholder="username" />
		<input type="password" bind:value={password} placeholder="password" />
	</div>
	<button class="bg-blue-400 p-4 text-white m-4 hover:bg-blue-700" type="submit"> Login </button>
</form>

<style lang="postcss">
	input {
		@apply border-b-2 border-blue-500 m-2;
	}
</style>
