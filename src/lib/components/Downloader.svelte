<script lang="ts">
	import { uiStore } from '$lib/stores/ui';
	import { onMount } from 'svelte';
	import Button from './Button.svelte';
	import { getPlaylist } from '$lib/services/spotifyAuth';
	import { convertTracksToCsv, downloadPlaylistAsCsv } from '$lib/utils/helpers/fileConversion';
	import type { Paging, PlaylistTrack } from 'spotify-types';

	onMount(() => {});

	const onClickDownload = () => {
		console.log($uiStore.checkedPlaylistIds);
		$uiStore.checkedPlaylistIds.forEach(async (id) => {
			const playlist = await getPlaylist(id);
			// Types don't seem to match up with data gotten from the api. Maybe investigate a bit more, otherwise we'll have to typecast :/
			const tracks = playlist.tracks as unknown as Paging<PlaylistTrack>;
			const tracksInCsv = convertTracksToCsv(tracks);
			downloadPlaylistAsCsv(tracksInCsv, playlist.name);
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
