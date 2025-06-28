<script lang="ts">
	import { getProfile } from '$lib/services/spotifyAuth';
	import { onMount } from 'svelte';

	let loading = false;
	let profile: any = null;

	onMount(async () => {
		loading = true;
		const accessToken = localStorage.getItem('access_token');
		if (accessToken) {
			profile = await getProfile(accessToken);
			console.log(profile);
		}
		loading = false;
	});
</script>

<div>
	{#if loading}
		<div>Fetching profile…</div>
	{:else if profile != null}
		<div>Profile for {profile.id} was fetched</div>
	{:else}
		<div>Could not fetch profile</div>
	{/if}
</div>
