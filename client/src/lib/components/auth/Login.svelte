<script lang="ts">
	import { goto } from '$app/navigation';
	import Cookies from 'js-cookie';
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

		if (res.ok) {
			const data = await res.json();
			Cookies.set('access_token', data.access_token);
			goto('/');
		}
	};
</script>

<div class="bg-gra">
	<section
		class="w-1/4 m-auto p-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
	>
		<div class="flex flex-col">
			<label for="username" class="p-2 text-lg font-bold">Username</label>
			<input type="text" bind:value={$username.value} placeholder="username" />
			{#if $myForm.hasError('username.required')}
				<p class="p-2 pt-0 text-red-500">Username is required</p>
			{/if}
		</div>

		<div class="flex flex-col">
			<label for="password" class="p-2 text-lg font-bold">Password</label>
			<input type="password" bind:value={$password.value} placeholder="password" />
			{#if $myForm.hasError('password.required')}
				<p class="p-2 pt-0 text-red-500">Password is required</p>
			{/if}
		</div>
		<button
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			on:click={() => {
				username.validate().then(() => {
					password.validate().then(() => {
						login($username.value, $password.value);
					});
				});
			}}>Log in</button
		>
	</section>
</div>

<style>
	input {
		border: 1px solid #ccc;
		padding: 10px;
		margin-bottom: 10px;
	}
</style>
