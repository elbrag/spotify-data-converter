export const apiWrapper = async (url: string, options = {}, functionName: string) => {
	try {
		const response = await fetch(`/api/${url}`, options);

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

export const checkIfTokenNeedsRefresh = (): boolean => {
	if (typeof window === 'undefined') {
		return false;
	}

	const expires = localStorage.getItem('expires');
	const accessToken = localStorage.getItem('access_token');

	if (!expires || !accessToken) {
		return false;
	}

	const expiresDate = new Date(expires);
	const now = new Date();
	const bufferTime = 5 * 60 * 1000; // 5 minutes buffer to refresh before it expires

	return now.getTime() >= expiresDate.getTime() - bufferTime;
};
