<script lang="ts">
	import { usernameStore } from '../../../stores';
	import Chat from '../game/chat/Chat.svelte';
	import Actions from '../game/actions/Actions.svelte';
	import { io } from 'socket.io-client';
	import Moves from '../game/moves/Moves.svelte';
	import MovesReplay from '../game/moves/MovesReplay.svelte';
	const socket = io();

	export const chat: any = [];
	export let gameId: any = '';
	export let title: string;
	export let textInput: boolean = false;
	export let style: string = '';
	export let replay: boolean = false;
	export let moves: any = undefined;

	let chatMessage: string = '';

	const onKeyPress = (e: KeyboardEventInit): void => {
		if (e.key === 'Enter') {
			socket.emit('sendMessage', {
				message: chatMessage,
				gameId: gameId,
				username: $usernameStore
			});
			chatMessage = '';
		}
	};
</script>

<div class={`${style} rounded-lg border-8 border-gray-800 max-h-[calc(100%)]`}>
	<div class="h-[calc(100%-3rem)]">
		<h2 class="border-b-8 border-gray-800 p-1 text-gray-200 font-bold bg-gray-800">{title}</h2>
		{#if textInput}
			<Chat />
		{:else if title === 'Moves played'}
			{#if replay}
				<MovesReplay {moves} />
			{:else}
				<Moves />
			{/if}
		{:else if title === 'Actions'}
			<Actions {moves} {replay} />
		{/if}
	</div>
	<div class="border-t-8 border-gray-800">
		{#if textInput}
			<div class="flex">
				<input
					class="rounded-md h-10 w-full pl-2 pb-1"
					type="text"
					placeholder="Type a message..."
					bind:value={chatMessage}
					on:keypress={onKeyPress}
				/>
				<button class="h-10 bg-gray-800 text-gray-200 w-1/3">Send</button>
			</div>
		{/if}
	</div>
</div>
