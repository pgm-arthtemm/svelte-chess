<script context="module" lang="ts">
	import { checkLogin } from '$lib/utils/checkLogin';
	import jwt_decode from 'jwt-decode';
	import Cookies from 'js-cookie';

	export const load = async ({ fetch }) => {
		let user: any;

		if (checkLogin()) {
			const { sub }: any = jwt_decode(Cookies.get('access_token'));
			const response = await fetch(`http://localhost:4000/users/id/${sub}`);
			user = await response.json();
		}

		return {
			props: {
				data: user
			}
		};
	};
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { usernameStore } from '../stores';
	import { io } from 'socket.io-client';
	import { v4 as uuidv4 } from 'uuid';
	const socket = io();

	export let data: any;

	if (checkLogin()) {
		$usernameStore = data.username;
	}

	let userName: string;
	let gameRoomIdValue: string = uuidv4();
	let entered: boolean = false;

	const enterUsername = (): void => {
		entered = true;
		socket.emit('createGame', gameRoomIdValue);
	};
</script>

{#if entered}
	{goto(`game/${gameRoomIdValue}`)}
{/if}

<div class="border-2 border-red-500 w-full h-72">
	<h1>username</h1>
	<input bind:value={userName} type="text" placeholder="username" />
	<button on:click={enterUsername}>Confirm</button>
</div>
