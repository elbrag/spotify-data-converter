<script lang="ts">
	import '../app.css';
	import { onDestroy, onMount } from 'svelte';
	import { authStore } from '$lib/stores/auth';
	import { checkTokenAndLoginExpiries } from '$lib/services/spotifyAuth';
	import Navigation from '$lib/components/Navigation.svelte';
	import { LocalStorageKeys } from '$lib/enums/storage';
	import BottomBar from '$lib/components/BottomBar.svelte';

	let { children } = $props();
	let intervalId: number;

	onMount(() => {
		const accessToken = localStorage.getItem(LocalStorageKeys.accessToken);

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

<div class="bg-indigo-950 text-white">
	<Navigation />
	<main class="px-2 pb-24 lg:px-4 lg:pb-48">
		{@render children()}
	</main>
	<BottomBar />
</div>
