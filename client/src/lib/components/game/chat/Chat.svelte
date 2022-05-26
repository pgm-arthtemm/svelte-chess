<script lang="ts">
	import { chat, usernameStore } from '../../../../stores';

	const checkSender = (chat: any): string => {
		return chat.username === $usernameStore ? 'You' : chat.username;
	};
</script>

<ul class="p-2 pt-0 h-72">
	{#each $chat as chat}
		<li class="flex break-all items-center border-gray-800 leading-8">
			<p class="text-white"><span class="font-bold">{checkSender(chat)}:</span> {chat.message}</p>
		</li>
	{/each}
</ul>
