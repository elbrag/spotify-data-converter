<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/auth';

	let { children } = $props();

	onMount(() => {
		const accessToken = localStorage.getItem('access_token');
		if (accessToken) {
			authStore.login(accessToken);
		}
	});
</script>

{@render children()}
