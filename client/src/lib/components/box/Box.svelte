<script lang="ts">
	import Chat from '../game/chat/Chat.svelte';
	import { chat } from '../../../stores';

	export let title: string;
	export let textInput: boolean = false;

	let chatMessage: string = '';

	const onKeyPress = (e: KeyboardEventInit): void => {
		if (e.key === 'Enter') {
			$chat = [...$chat, { message: chatMessage, user: 'You' }];
			chatMessage = '';
		}
	};
</script>

<div class="rounded-lg border-8 border-gray-800 w-1/4 max-h-[calc(100%)]">
	<div class="h-[calc(100%-3rem)]">
		<h2 class="border-b-8 border-gray-800 p-1 text-gray-200 font-bold bg-gray-800">{title}</h2>
		{#if textInput}
			<Chat />
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
