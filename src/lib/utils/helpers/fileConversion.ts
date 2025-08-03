import type { Paging, PlaylistTrack, Track } from 'spotify-types';

export const convertTracksToCsv = (jsonData: Paging<PlaylistTrack>) => {
	let csv = 'Nr,Artist,Track Name\n';

	const trackItems = jsonData.items;

	trackItems.forEach((item, i) => {
		const track = item.track as Track;
		if (!track || !track.artists || !track.name) return;

		const artistNames = track.artists.map((artist) => artist.name).join(', ');

		const escapedArtist = escapeCsvValue(artistNames);
		const escapedTrackName = escapeCsvValue(track.name);

		csv += `${i + 1},${escapedArtist},${escapedTrackName}\n`;
	});

	console.log(csv);
	return csv;
};

const escapeCsvValue = (value: string): string => {
	if (value.includes(',') || value.includes('"') || value.includes('\n')) {
		return `"${value.replace(/"/g, '""')}"`;
	}
	return value;
};

export const downloadPlaylistAsCsv = (csvContent: string, filename: string) => {
	const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
	const link = document.createElement('a');
	const url = URL.createObjectURL(blob);

	link.setAttribute('href', url);
	link.setAttribute('download', filename);
	link.style.visibility = 'hidden';

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};
