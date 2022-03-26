<script lang="typescript">
	import { apiBaseUrl } from '$lib/config/config';

	let username: string;
	let email: string;
	let password: string;

	let status: any;

	const register = async (): Promise<void> => {
		// post to register, get the status
		const response = await fetch(`${apiBaseUrl}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				email,
				password
			})
		});

		// const res: Response = await fetch(`${apiBaseUrl}/auth/register`, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		username,
		// 		email,
		// 		password
		// 	})
		// });
	};
</script>

<form on:submit|preventDefault={register}>
	<div class="flex">
		<input type="text" bind:value={username} placeholder="username" />
		<input type="text" bind:value={email} placeholder="email" />
		<input type="password" bind:value={password} placeholder="password" />
	</div>
	<button class="bg-blue-400 p-4 text-white m-4 hover:bg-blue-700" type="submit"> Login </button>
</form>

<style lang="postcss">
	input {
		@apply border-b-2 border-blue-500 m-2;
	}
</style>
