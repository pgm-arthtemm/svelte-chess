<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import Register from './Register.svelte';
	import { login } from '$lib/utils/auth/login';
	import { usernameStore } from '../../../stores';

	export let visible: boolean;
	export let handleToggle: () => void;

	let username: string = '';
	let password: string = '';

	let registerModal: boolean = false;

	const gotoRegister = (): any => {
		registerModal = !registerModal;
		visible = !visible;
	};

	const registerToggle = () => {
		registerModal = !registerModal;
	};

	const loginUser = async (username: string, password: string): Promise<void> => {
		try {
			login(username, password, visible);
			$usernameStore = username;
			visible = !visible;
		} catch (e) {
			console.log(e);
		}
	};
</script>

{#if visible}
	<Modal title="Login" open={visible} on:close={() => handleToggle()}>
		<svelte:fragment slot="modal-body">
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

			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
				on:click={() => {
					loginUser(username, password);
				}}>Log in</button
			>
			<div class="mt-4">
				<p on:click={gotoRegister} class="text-blue-800 underline hover:cursor-pointer">
					Don't have an account yet? Click here.
				</p>
			</div>
		</svelte:fragment>
	</Modal>
{/if}

{#if registerModal}
	<Register visible={registerModal} handleToggle={registerToggle} />
{/if}

<style>
	input {
		border: 1px solid #ccc;
		padding: 10px;
		margin-bottom: 10px;
	}
</style>
