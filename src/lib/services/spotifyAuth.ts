import { goto } from '$app/navigation';
import { authStore } from '$lib/stores/auth';
import { apiWrapper, checkIfTokenNeedsRefresh } from '$lib/utils/helpers/api';

export const redirectToAuthUrl = async () => {
	const { authUrl, codeVerifier } = await apiWrapper('spotify-auth-url', {}, 'redirectToAuthUrl');
	window.localStorage.setItem('code_verifier', codeVerifier);
	window.location.href = authUrl;
};

const getStoredAccessToken = async (): Promise<string | null> => {
	refreshTokenIfNeeded();
	const accessToken = localStorage.getItem('access_token');
	return accessToken;
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
	saveToken(responseJson);
};

export const refreshTokenIfNeeded = async () => {
	const needsRefresh = checkIfTokenNeedsRefresh();

	if (!needsRefresh) {
		console.log("doesn't need refresh");
		return;
	}

	const refreshToken = localStorage.getItem('refresh_token') || null;

	const responseJson = await apiWrapper(
		'spotify-refresh-token',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ refreshToken })
		},
		'refreshToken'
	);
	saveToken(responseJson);
	console.log('Refreshed token');
};

const saveToken = async (responseJson: {
	access_token: string;
	refresh_token: string;
	expires_in: number;
}) => {
	const { access_token, refresh_token, expires_in } = responseJson;

	localStorage.setItem('access_token', access_token);
	localStorage.setItem('refresh_token', refresh_token);
	localStorage.setItem('expires_in', expires_in.toString());

	authStore.login(access_token);

	const now = new Date();
	const expiry = new Date(now.getTime() + expires_in * 1000);
	localStorage.setItem('expires', expiry.toString());
};

export const getProfile = async () => {
	console.log('localStorage in getProfiel', localStorage);
	refreshTokenIfNeeded();
	const accessToken = await getStoredAccessToken();
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

export const getUserPlaylists = async (userId: string) => {
	if (!userId) {
		throw new Error('User id has not been supplied');
	}
	const accessToken = await getStoredAccessToken();

	if (!accessToken) {
		throw new Error('Access token has not been supplied');
	}
	const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists?limit=50`, {
		headers: {
			Authorization: 'Bearer ' + accessToken
		}
	});

	const data = await response.json();
	return data;
};

export const logoutClick = async () => {
	localStorage.clear();
	await goto('/');
};
