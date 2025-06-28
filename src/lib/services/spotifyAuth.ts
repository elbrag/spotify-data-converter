export const redirectToAuthUrl = async () => {
	try {
		const response = await fetch('/api/spotify-auth-url');

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const { authUrl, codeVerifier } = await response.json();

		window.localStorage.setItem('code_verifier', codeVerifier);
		window.location.href = authUrl;
	} catch (error) {
		console.error('There was a problem with the fetch operation:', error);
	}
};
