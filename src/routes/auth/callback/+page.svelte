<script lang="ts">
	import { onMount } from 'svelte';
	import { getAndSetToken } from '$lib/services/spotifyAuth';
	import { goto } from '$app/navigation';

	let loggedIn = false;
	let loading = false;

	onMount(async () => {
		loading = true;
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');
		if (code) {
			await getAndSetToken(code);
			loggedIn = true;
			setTimeout(async () => {
				await goto('/lists');
			}, 1000);
		} else {
			loggedIn = false;
		}
		loading = false;
	});
</script>

{#if !loading && !loggedIn}
	<div>No login attempt was detected</div>
{:else if loading}
	<div>Logging in…</div>
{:else if loggedIn}
	<div>Login successful!</div>
{:else}
	<div>No login code found.</div>
{/if}
