<script lang="ts">
	import '../app.css';
	import { onDestroy, onMount } from 'svelte';
	import { authStore } from '$lib/stores/auth';
	import { checkTokenAndLoginExpiries } from '$lib/services/spotifyAuth';
	import Navigation from '$lib/components/Navigation.svelte';

	let { children } = $props();
	let intervalId: number;

	onMount(() => {
		const accessToken = localStorage.getItem('access_token');

		if (accessToken && !$authStore.isLoggedIn) {
			authStore.login(accessToken);
		}
		intervalId = setInterval(async () => {
			await checkTokenAndLoginExpiries();
		}, 300000);

		onDestroy(() => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		});
	});
</script>

<Navigation />
{@render children()}
