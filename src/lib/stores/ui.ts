import type { UIState } from '$lib/types/storeState';
import { writable } from 'svelte/store';

const createUIStore = () => {
	const { subscribe, set } = writable<UIState>({
		checkedPlaylistIds: []
	});

	return {
		subscribe,
		updateCheckedPlaylistIds: (lists: string[]) => {
			set({ checkedPlaylistIds: lists });
		}
	};
};

export const uiStore = createUIStore();
