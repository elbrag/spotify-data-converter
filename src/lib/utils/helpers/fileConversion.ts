import type { Paging, PlaylistTrack, Track } from 'spotify-types';

export const convertTracksToCsv = (jsonData: Paging<PlaylistTrack>) => {
	let csv = 'Artist,Track Name\n';

	const trackItems = jsonData.items;

	trackItems.forEach((item) => {
		const track = item.track as Track;
		if (!track || !track.artists || !track.name) return;

		const artistNames = track.artists.map((artist) => artist.name).join(', ');

		const escapedArtist = escapeCsvValue(artistNames);
		const escapedTrackName = escapeCsvValue(track.name);

		csv += `${escapedArtist},${escapedTrackName}\n`;
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
