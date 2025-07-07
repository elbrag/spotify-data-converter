<script lang="ts">
	import { goto } from '$app/navigation';
	import { getProfile, getUserPlaylists } from '$lib/services/spotifyAuth';
	import { authStore } from '$lib/stores/auth';
	import { onMount } from 'svelte';

	let loading = false;
	let profile: any = null;
	let lists: any[] = [];

	onMount(async () => {
		loading = true;

		if ($authStore.isLoggedIn) {
			profile = await getProfile();
			console.log(profile);
			if (profile) {
				const userPlayListObject = await getUserPlaylists(profile.id);
				console.log(userPlayListObject);
				lists = userPlayListObject.items;
			}
		} else {
			await goto('/');
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
