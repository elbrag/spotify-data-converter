export const redirectToAuthUrl = async () => {
	try {
		const response = await fetch('/api/spotify-auth-url');

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
			throw new Error(`Network response was not ok: ${errorData.error || response.status}`);
		}

		const { authUrl, codeVerifier } = await response.json();

		window.localStorage.setItem('code_verifier', codeVerifier);
		window.location.href = authUrl;
	} catch (error) {
		console.error(
			'Error while calling redirectToAuthUrl:',
			error instanceof Error ? error.message : 'Unknown error'
		);
	}
};

export const getAndSetToken = async (code: string | null) => {
	try {
		if (!code) {
			throw new Error('Access code has not been supplied');
		}

		const codeVerifier = localStorage.getItem('code_verifier') ?? '';

		const response = await fetch('/api/spotify-get-token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ code, codeVerifier })
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
			throw new Error(`Network response was not ok: ${errorData.error || response.status}`);
		}

		const responseJson = await response.json();
		localStorage.setItem('access_token', responseJson.access_token);
	} catch (error) {
		console.error(
			'Error while calling getAndSetToken:',
			error instanceof Error ? error.message : 'Unknown error'
		);
	}
};

export const getProfile = async () => {
	const accessToken = localStorage.getItem('access_token');

	const response = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			Authorization: 'Bearer ' + accessToken
		}
	});

	const data = await response.json();
	return data;
};
