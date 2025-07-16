<script lang="ts">
	import { uiStore } from '$lib/stores/ui';
	import { onMount } from 'svelte';
	import Button from './Button.svelte';
	import { logout } from '$lib/services/spotifyAuth';

	onMount(() => {});
</script>

<div class="fixed bottom-0 left-0 w-full bg-indigo-800 px-6 py-4">
	{#if $uiStore.checkedPlaylistIds.length}
		<div class="flex items-center justify-between">
			<p>{$uiStore.checkedPlaylistIds.length} lists marked for download</p>
			<Button
				onClick={() => {
					alert('Download lists');
				}}>Download lists</Button
			>
		</div>
	{/if}
</div>
