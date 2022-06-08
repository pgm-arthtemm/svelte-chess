import { apiBaseUrl } from '$lib/config/config';

export const gameDataToServer = async (data: any) => {
	const res = await fetch(`${apiBaseUrl}/games`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	if (res.ok) {
		const data = await res.json();
		return data;
	}
};
