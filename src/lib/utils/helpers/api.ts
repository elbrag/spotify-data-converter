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
