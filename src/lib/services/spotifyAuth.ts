import { goto } from '$app/navigation';
import { authStore } from '$lib/stores/auth';
import {
	spotifyApiWrapper,
	checkIfLoginIsExpired,
	checkIfTokenNeedsRefresh
} from '$lib/utils/helpers/api';
import type { Paging, Playlist, PrivateUser } from 'spotify-types';

/**
 * Redirect to Spotify auth url
 */
export const redirectToAuthUrl = async (): Promise<void> => {
	const { authUrl, codeVerifier } = await spotifyApiWrapper(
		'spotify-auth-url',
		'redirectToAuthUrl'
	);
	localStorage.setItem('code_verifier', codeVerifier);
	window.location.href = authUrl;
};

/**
 * Get locally stored access token
 *
 * refresh if necessary
 *
 */
const getStoredAccessToken = async (): Promise<string | null> => {
	refreshTokenIfNeeded();
	const accessToken = localStorage.getItem('access_token');
	return accessToken;
};

/**
 * Get and save token from Spotify using codeVerifier
 */
export const getAndSetToken = async (code: string | null): Promise<void> => {
	if (!code) {
		throw new Error('Access code has not been supplied');
	}

	const codeVerifier = localStorage.getItem('code_verifier') ?? '';
	const responseJson = await spotifyApiWrapper('spotify-get-token', 'getAndSetToken', 'POST', {
		body: JSON.stringify({ code, codeVerifier })
	});
	saveToken(responseJson);
};

/**
 * Check if login is expired. If not, call refreshTokenIfNeeded
 */
export const checkTokenAndLoginExpiries = async (): Promise<void> => {
	const loginExpired = checkIfLoginIsExpired();
	if (loginExpired) {
		logout();
	} else {
		await refreshTokenIfNeeded();
	}
};

/**
 * Check if token is expired, if so, refresh it
 */
export const refreshTokenIfNeeded = async (): Promise<void> => {
	const needsRefresh = checkIfTokenNeedsRefresh();

	if (!needsRefresh) {
		console.log("doesn't need refresh");
		return;
	}

	const refreshToken = localStorage.getItem('refresh_token') || null;

	const responseJson = await spotifyApiWrapper('spotify-refresh-token', 'refreshToken', 'POST', {
		body: JSON.stringify({ refreshToken })
	});
	saveToken(responseJson);
	console.log('Refreshed token');
};

/**
 * Save tokens and their expire dates to local storage
 */
const saveToken = async (responseJson: {
	access_token: string;
	refresh_token: string;
	expires_in: number;
}): Promise<void> => {
	const { access_token, refresh_token, expires_in } = responseJson;

	localStorage.setItem('access_token', access_token);
	localStorage.setItem('refresh_token', refresh_token);
	localStorage.setItem('expires_in', expires_in.toString());

	authStore.login(access_token);

	const now = new Date();
	const tokenExpiry = new Date(now.getTime() + expires_in * 1000);
	localStorage.setItem('token_expires', tokenExpiry.toString());

	const loginExpiry = new Date(now.getTime() + 24 * 60 * 60 * 1000);
	localStorage.setItem('login_expires', loginExpiry.toString());
};

/**
 * Get Spotify user profile
 */
export const getProfile = async (): Promise<PrivateUser> => {
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

	const data: PrivateUser = await response.json();
	return data;
};

/**
 * Get Spotify user playlists
 */
export const getUserPlaylists = async (userId: string): Promise<Paging<Playlist>> => {
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

	const data: Paging<Playlist> = await response.json();
	console.log('getUserPlaylists data', data);
	return data;
};

/**
 * Logout from Spotify
 */
export const logout = async (): Promise<void> => {
	localStorage.clear();
	await goto('/');
};
