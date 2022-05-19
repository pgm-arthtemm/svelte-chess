import { writable } from 'svelte/store';

export const moves = writable([]);

export const settings = writable({});

export const theme = writable(localStorage.getItem('theme') || 'dark');
theme.subscribe((theme) => localStorage.setItem('theme', theme));
