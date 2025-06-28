export const generateRandomString = (length: number) => {
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const values = crypto.getRandomValues(new Uint8Array(length));
	return values.reduce((acc, x) => acc + possible[x % possible.length], '');
};

export const sha256 = async (randomString: string) => {
	const encoder = new TextEncoder();
	const data = encoder.encode(randomString);
	return crypto.subtle.digest('SHA-256', data);
};

export const base64encode = (input: ArrayBuffer | ArrayLike<number>) => {
	return btoa(String.fromCharCode(...new Uint8Array(input)))
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_');
};
