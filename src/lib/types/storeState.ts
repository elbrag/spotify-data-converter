export interface AuthState {
	isLoggedIn: boolean;
	accessToken: string | null;
}

export interface UIState {
	checkedPlaylistIds: string[];
}
