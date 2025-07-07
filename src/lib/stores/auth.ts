import type { AuthState } from '$lib/types/auth';
import { writable } from 'svelte/store';

const createAuthStore = () => {
	const { subscribe, set } = writable<AuthState>({
		isLoggedIn: false,
		accessToken: null
	});

	return {
		subscribe,
		login: (accessToken: string) => {
			set({ isLoggedIn: true, accessToken });
		},
		logout: () => {
			set({ isLoggedIn: false, accessToken: null });
		}
	};
};

export const authStore = createAuthStore();
