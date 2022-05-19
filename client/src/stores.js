import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const moves = writable([]);

export const settings = writable({});

export const theme = writable((browser && localStorage.getItem('theme')) || 'dark');
theme.subscribe((theme) => browser && (localStorage.theme = theme));

export const chat = writable([]);
