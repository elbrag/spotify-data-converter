import { SPOTIFY_CLIENT_ID } from '$env/static/private';

export async function POST() {
	try {
		const refreshToken = localStorage.getItem('refresh_token') || null;

		if (!refreshToken) {
			throw new Error('No refresh token has been set');
		}

		const url = 'https://accounts.spotify.com/api/token';
		const payload = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				client_id: SPOTIFY_CLIENT_ID,
				grant_type: 'refresh_token',
				refresh_token: refreshToken
			})
		};

		const response = await fetch(url, payload);

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
			throw new Error(
				`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorData)}`
			);
		}

		const responseData = await response.json();

		return new Response(JSON.stringify(responseData), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.error(
			'Error during token refresh:',
			error instanceof Error ? error.message : 'Unknown error'
		);
		return new Response(
			JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	}
}
