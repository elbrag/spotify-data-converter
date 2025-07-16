<script lang="ts">
	import Login from '$lib/components/Login.svelte';
	import { authStore } from '$lib/stores/auth';
	import { onMount } from 'svelte';
</script>

<div class="flex h-full min-h-screen flex-col justify-center">
	<div class="mb-20 flex flex-col items-center justify-center">
		<h1 class="text-4xl font-bold text-white">Spotify data converter</h1>
		{#if !$authStore.isLoggedIn}
			<Login />
		{/if}
	</div>
</div>
