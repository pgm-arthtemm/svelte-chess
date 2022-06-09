<script lang="ts">
	import { apiBaseUrl } from '$lib/config/config';
	import jwt_decode from 'jwt-decode';
	import Modal from '../modal/Modal.svelte';
	import Cookies from 'js-cookie';
	import { login } from '$lib/utils/auth/login';
	import {
		moves,
		selectedColor,
		usernameStore,
		opponentName,
		winnerNameStore
	} from '../../../stores';
	import { gameDataToServer } from '$lib/utils/game';

	export let visible: boolean;
	export let handleToggle: () => void;
	export let afterGame: boolean = false;

	let username: string = afterGame ? $usernameStore : '';
	let email: string = '';
	let password: string = '';
	let error: boolean = false;

	const register = async (username: string, email: string, password: string): Promise<void> => {
		const res = await fetch(`${apiBaseUrl}/auth/register`, {
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

		if (res.ok) {
			handleToggle();

			login(username, password).then((data) => {
				const { sub }: any = jwt_decode(Cookies.get('access_token'));

				let whitePlayer: string = $selectedColor === 'white' ? username : $opponentName;
				let blackPlayer: string = $selectedColor === 'black' ? username : $opponentName;
				let movesString: string = '';
				for (let i = 0; i < $moves.length; i++) {
					movesString += $moves[i].initial + ',' + $moves[i].new + ',';
				}

				let gameData = {
					winner: $winnerNameStore,
					whitePlayer,
					blackPlayer,
					date: new Date(),
					moves: movesString,
					userId: sub
				};

				gameDataToServer(gameData);
			});
		} else {
			error = true;
		}
	};
</script>

{#if visible}
	<Modal title="Register" open={visible} on:close={handleToggle}>
		<svelte:fragment slot="modal-body">
			<section>
				<div class="flex flex-col">
					<label class="font-bold text-xl pb-2" for="username">Username</label>
					<input bind:value={username} type="text" placeholder="username" />
				</div>

				<div class="flex flex-col">
					<label class="font-bold text-xl pb-2" for="email">Email</label>
					<input bind:value={email} type="email" placeholder="email" />
				</div>

				<div class="flex flex-col">
					<label class="font-bold text-xl pb-2" for="password">Password</label>
					<input bind:value={password} type="password" placeholder="password" />
				</div>

				{#if error}
					<div>
						<p class="text-red-500 text-center">Username or email already exist</p>
					</div>
				{/if}

				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
					on:click={() => {
						register(username, email, password);
					}}>Register</button
				>
			</section>
		</svelte:fragment>
	</Modal>
{/if}

<style>
	input {
		border: 1px solid #ccc;
		padding: 10px;
		margin-bottom: 10px;
	}
</style>
