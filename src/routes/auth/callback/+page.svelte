<script lang="ts">
	import { onMount } from 'svelte';
	import { getAndSetToken } from '$lib/services/spotifyAuth';

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');
		if (code) {
			await getAndSetToken(code);
		}
	});
</script>

<div>Login successful!</div>
