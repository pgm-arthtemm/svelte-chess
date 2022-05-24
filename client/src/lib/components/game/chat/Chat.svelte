<script lang="ts">
	import { io } from 'socket.io-client';
	const socket = io();

	let messages: string[] = [];
</script>

<ul class="p-2 pt-0">
	<!-- {#each $chat as chat} -->
	<li class="flex break-all items-center border-gray-800 leading-8">
		<!-- <p class="text-white"><span class="font-bold">{chat.user}:</span> {chat.message}</p> -->
	</li>
	<!-- {/each} -->
</ul>
