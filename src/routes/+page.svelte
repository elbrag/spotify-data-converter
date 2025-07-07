<script lang="ts">
	import Login from '$lib/components/Login.svelte';
	import { authStore } from '$lib/stores/auth';
	import { onMount } from 'svelte';

	let loading = false;
	let showLogin = true;

	onMount(() => {
		loading = true;

		const unsubscribe = authStore.subscribe(async (state) => {
			if (state.isLoggedIn) {
				showLogin = false;
			}

			loading = false;
		});

		return () => unsubscribe();
	});
</script>

<div
	class="flex h-full min-h-screen flex-col justify-center bg-gradient-to-tl from-green-600 to-green-200"
>
	<div class="mb-20 flex flex-col items-center justify-center">
		<h1 class="text-4xl font-bold text-white">Spotify data converter</h1>
		{#if showLogin}
			<Login />
		{/if}
	</div>
</div>
