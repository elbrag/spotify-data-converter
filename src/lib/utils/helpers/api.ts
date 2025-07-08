import { LocalStorageKeys } from '$lib/enums/storage';

/**
 * Api wrapper for Spotify api calls
 */
export const spotifyApiWrapper = async (
	url: string,
	functionName: string,
	method: 'GET' | 'POST' = 'GET',
	options = {}
) => {
	try {
		const response = await fetch(`/api/${url}`, {
			...options,
			method,
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
			throw new Error(`${functionName}: Request failed: ${errorData.error || response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error(
			error instanceof Error ? error.message : `Error while calling ${functionName}: Unknown error`
		);
		throw error;
	}
};

/**
 * Check if token has expired
 */
export const checkIfTokenNeedsRefresh = (): boolean => {
	if (typeof window === 'undefined') {
		return false;
	}

	const tokenExpires = localStorage.getItem(LocalStorageKeys.tokenExpires);
	const accessToken = localStorage.getItem(LocalStorageKeys.accessToken);

	if (!tokenExpires || !accessToken) {
		return false;
	}

	const expiresDate = new Date(tokenExpires);
	const now = new Date();
	const bufferTime = 5 * 60 * 1000;

	return now.getTime() >= expiresDate.getTime() - bufferTime;
};

/**
 * Check if login has expired
 */
export const checkIfLoginIsExpired = (): boolean => {
	if (typeof window === 'undefined') {
		return false;
	}

	const loginExpires = localStorage.getItem(LocalStorageKeys.loginExpires);

	if (!loginExpires) {
		return true;
	}

	const expiresDate = new Date(loginExpires);
	const now = new Date();

	return now.getTime() >= expiresDate.getTime();
};
