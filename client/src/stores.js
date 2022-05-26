import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const moves = writable([]);

export const chat = writable([]);

export const usernameStore = writable('');

export const settings = writable({});

export const theme = writable((browser && localStorage.getItem('theme')) || 'dark');
theme.subscribe((theme) => browser && (localStorage.theme = theme));

export const gameIdStore = writable('');

export const selectedColor = writable();
