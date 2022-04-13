<script lang="ts">
	import { apiBaseUrl } from '$lib/config/config';
	import { form, field } from 'svelte-forms';
	import { required, email } from 'svelte-forms/validators';

	const userEmail = field('email', '', [required(), email()]);
	const username = field('username', '', [required()]);
	const password = field('password', '', [required()]);

	const myForm = form(username, password, userEmail);

	const register = async (username: string, email: string, password: string): Promise<void> => {
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

		console.log(response);
	};
</script>

<section>
	<div>
		<label for="username">Username</label>
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
					userEmail.validate().then(() => {
						register($username.value, $userEmail.value, $password.value);
					});
				});
			});
		}}>Register</button
	>
</section>

<style>
	input {
		border: 1px solid #ccc;
		padding: 10px;
		margin-bottom: 10px;
	}
</style>
