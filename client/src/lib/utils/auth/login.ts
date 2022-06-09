import { goto } from '$app/navigation';
import { apiBaseUrl } from '$lib/config/config';
import Cookies from 'js-cookie';

export const login = async (username: string, password: string): Promise<void> => {
	const res = await fetch(`${apiBaseUrl}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ username, password })
	});

	const data = await res.json();

	if (res.ok) {
		Cookies.set('access_token', data.access_token, { expires: 1 });
		goto('/profile');
		return data;
	} else {
		return data;
	}
};
