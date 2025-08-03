<script lang="ts">
	import { uiStore } from '$lib/stores/ui';
	import { onMount } from 'svelte';
	import Button from './Button.svelte';
	import { getPlaylist } from '$lib/services/spotifyAuth';

	onMount(() => {});

	const onClickDownload = () => {
		console.log($uiStore.checkedPlaylistIds);
		$uiStore.checkedPlaylistIds.forEach((id) => {
			getPlaylist(id);
		});
	};
</script>

<div>
	{#if $uiStore.checkedPlaylistIds.length}
		<div class="flex items-center justify-between">
			<p>{$uiStore.checkedPlaylistIds.length} lists marked for download</p>
			<Button onClick={onClickDownload}>Download lists</Button>
		</div>
	{/if}
</div>
