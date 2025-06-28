import { SPOTIFY_CLIENT_ID, SPOTIFY_AUTH_REDIRECT_URI } from '$env/static/private';
import { generateRandomString, sha256, base64encode } from '$lib/utils/helpers/auth';

export async function GET() {
	const redirectUri = SPOTIFY_AUTH_REDIRECT_URI;
	const scope = 'user-read-private user-read-email';

	const codeVerifier = generateRandomString(64);
	const hashed = await sha256(codeVerifier);
	const codeChallenge = base64encode(hashed);

	const authUrl = new URL('https://accounts.spotify.com/authorize');

	const params = {
		response_type: 'code',
		client_id: SPOTIFY_CLIENT_ID,
		scope,
		code_challenge_method: 'S256',
		code_challenge: codeChallenge,
		redirect_uri: redirectUri
	};

	authUrl.search = new URLSearchParams(params).toString();

	return new Response(JSON.stringify({ authUrl: authUrl.toString(), codeVerifier }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
