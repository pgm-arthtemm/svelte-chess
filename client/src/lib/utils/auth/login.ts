import { goto } from '$app/navigation';
import { apiBaseUrl } from '$lib/config/config';
import Cookies from 'js-cookie';

export const login = async (
	username: string,
	password: string,
	visible: boolean = false
): Promise<void> => {
	const res = await fetch(`${apiBaseUrl}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ username, password })
	});

	if (res.ok) {
		const data = await res.json();
		Cookies.set('access_token', data.access_token);
		visible = !visible;
		goto('/profile');
	}
};
