<script lang="ts">
	import { onMount } from 'svelte';
	import { getAndSetToken } from '$lib/services/spotifyAuth';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';

	let loading = false;

	onMount(async () => {
		loading = true;
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');
		if (code) {
			await getAndSetToken(code);
			setTimeout(async () => {
				await goto('/lists');
			}, 1000);
		} else {
			// loggedIn = false;
		}
		loading = false;
	});
</script>

{#if !loading && !$authStore.isLoggedIn}
	<div>No login attempt was detected</div>
{:else if loading}
	<div>Logging in…</div>
{:else if $authStore.isLoggedIn}
	<div>Login successful!</div>
{:else}
	<div>No login code found.</div>
{/if}
