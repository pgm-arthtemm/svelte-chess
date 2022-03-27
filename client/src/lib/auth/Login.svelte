<script lang="typescript">
	import { form, field } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';
	import { apiBaseUrl } from '$lib/config/config';

	let username = field('username', '', [required()]);
	let password = field('password', '', [required()]);

	const myForm = form(username, password);

	const login = async (username: string, password: string): Promise<void> => {
		const res = await fetch(`${apiBaseUrl}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		});
		console.log(res);
	};
</script>

<section>
	<div>
		<input type="text" bind:value={$username.value} placeholder="username" />
		{#if $myForm.hasError('username.required')}
			<p>Username is required</p>
		{/if}
	</div>

	<div>
		<input type="password" bind:value={$password.value} placeholder="password" />
		{#if $myForm.hasError('password.required')}
			<p>Password is required</p>
		{/if}
	</div>
	<button
		on:click={() => {
			username.validate().then(() => {
				password.validate().then(() => {
					login($username.value, $password.value);
				});
			});
		}}>Log in</button
	>
</section>

<style>
	input {
		border: 1px solid #ccc;
		padding: 10px;
		margin-bottom: 10px;
	}
</style>
