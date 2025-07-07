<script lang="ts">
	import { authStore } from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import Button from './Button.svelte';

	onMount(() => {});
</script>

<header class="bg-sky-200">
	<nav class="flex items-center justify-between px-5 py-3">
		<p>Spotify data converter</p>
		<ul>
			{#if $authStore.isLoggedIn}
				<Button>Log out</Button>
			{/if}
			<li></li>
		</ul>
	</nav>
</header>
