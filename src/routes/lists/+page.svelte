<script lang="ts">
	import { getProfile, getUserPlaylists } from '$lib/services/spotifyAuth';
	import { onMount } from 'svelte';

	let loading = false;
	let profile: any = null;
	let lists: any[] = [];

	onMount(async () => {
		loading = true;
		const accessToken = localStorage.getItem('access_token');
		if (accessToken) {
			profile = await getProfile(accessToken);
			console.log(profile);
			if (profile) {
				const userPlayListObject = await getUserPlaylists(profile.id, accessToken);
				console.log(userPlayListObject);
				lists = userPlayListObject.items;
			}
		}
		loading = false;
	});
</script>

<div>
	{#if loading}
		<div>Fetching profile…</div>
	{:else if profile != null}
		<div>Profile for {profile.id} was fetched</div>
		{#if lists?.length}
			<ul class="mt-10">
				{#each lists as list}
					<li>{list.name}</li>
				{/each}
			</ul>
		{/if}
	{:else}
		<div>Could not fetch profile</div>
	{/if}
</div>
