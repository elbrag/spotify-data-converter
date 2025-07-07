<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/auth';

	let { children } = $props();

	onMount(() => {
		const accessToken = localStorage.getItem('access_token');
		console.log('accessToken', accessToken);
		console.log('$authStore.isLoggedIn in /layout', $authStore.isLoggedIn);
		if (accessToken && !$authStore.isLoggedIn) {
			console.log('Going to login');
			authStore.login(accessToken);
		}
	});
</script>

{@render children()}
