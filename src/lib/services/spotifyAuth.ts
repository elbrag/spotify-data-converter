import { apiWrapper } from '$lib/utils/helpers/api';

export const redirectToAuthUrl = async () => {
	const { authUrl, codeVerifier } = await apiWrapper('spotify-auth-url', {}, 'redirectToAuthUrl');
	window.localStorage.setItem('code_verifier', codeVerifier);
	window.location.href = authUrl;
};

export const getAndSetToken = async (code: string | null) => {
	if (!code) {
		throw new Error('Access code has not been supplied');
	}

	const codeVerifier = localStorage.getItem('code_verifier') ?? '';
	const responseJson = await apiWrapper(
		'spotify-get-token',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ code, codeVerifier })
		},
		'getAndSetToken'
	);

	localStorage.setItem('access_token', responseJson.access_token);
};

export const getProfile = async (accessToken: string) => {
	if (!accessToken) {
		throw new Error('Access token has not been supplied');
	}
	const response = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			Authorization: 'Bearer ' + accessToken
		}
	});

	const data = await response.json();
	return data;
};
