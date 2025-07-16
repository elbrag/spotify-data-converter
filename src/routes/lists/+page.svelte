<script lang="ts">
	import PlaylistListItem from '$lib/components/PlaylistListItem.svelte';
	import { getProfile, getUserPlaylists } from '$lib/services/spotifyAuth';
	import { authStore } from '$lib/stores/auth';
	import { uiStore } from '$lib/stores/ui';
	import type { Playlist, PrivateUser } from 'spotify-types';
	import { onMount } from 'svelte';

	let loading: boolean = false;
	let profile: PrivateUser | null = null;
	let lists: Playlist[] = [];

	onMount(() => {
		loading = true;
		const unsubscribe = authStore.subscribe(async (state) => {
			console.log('$authStore.isLoggedIn on /lists', state.isLoggedIn);
			if (state.isLoggedIn) {
				profile = await getProfile();
				console.log(profile);
				if (profile) {
					const userPlayListObject = await getUserPlaylists(profile.id);
					console.log(userPlayListObject);
					lists = userPlayListObject.items;
				}
			}
			loading = false;
		});
		return () => unsubscribe();
	});

	const onListCheck = (list: Playlist) => {
		const isChecked = $uiStore.checkedPlaylistIds.includes(list.id);
		const lists = isChecked
			? $uiStore.checkedPlaylistIds.filter((id) => id !== list.id)
			: [...$uiStore.checkedPlaylistIds, list.id];

		uiStore.updateCheckedPlaylistIds(lists);
	};
</script>

<div>
	{#if loading}
		<div>Fetching profile…</div>
	{:else if profile != null}
		<div>Profile for {profile.id} was fetched</div>
		{#if lists?.length}
			<ul class="mt-10 flex flex-col gap-1">
				{#each lists as list}
					<PlaylistListItem
						name={list.name}
						onClick={() => onListCheck(list)}
						checked={$uiStore.checkedPlaylistIds.includes(list.id)}
						id={list.id}
					/>
				{/each}
			</ul>
		{/if}
	{:else}
		<div>Could not fetch profile</div>
	{/if}
</div>
