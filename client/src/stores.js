import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const moves = writable([]);

export const chat = writable([]);

export const usernameStore = writable('');

export const initPos = writable('');

export const replayMove = writable(-1);

export const gameStarter = writable(false);

export const prevMove = writable({
	from: '',
	to: ''
});

export const timeSettings = writable({
	time: 0
});

export const moveMade = writable({
	initPosition: '',
	newPosition: '',
	take: false
});

export const theme = writable((browser && localStorage.getItem('theme')) || 'dark');
theme.subscribe((theme) => browser && (localStorage.theme = theme));

export const gameIdStore = writable('');

export const selectedColor = writable();

export const playerMoveStore = writable();

export const opponentName = writable();

export const winnerNameStore = writable();

export const yourTimeSpent = writable(0);

export const opponentTimeSpent = writable(0);
