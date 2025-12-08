export const mockSongs = [
  { id: 101, title: 'Running Up That Hill', artist: 'Kate Bush', album: 'Hounds of Love', duration: '5:03', isLiked: true },
  { id: 102, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: '5:55', isLiked: false },
  { id: 103, title: 'As It Was', artist: 'Harry Styles', album: 'Harrys House', duration: '2:47', isLiked: true },
  { id: 104, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', isLiked: false },
  { id: 105, title: 'Shape of You', artist: 'Ed Sheeran', album: '÷', duration: '3:53', isLiked: false },
];

export const mockPlaylists = [
  { id: 1, title: 'Pop Chill', image: 'https://placehold.co/50x50/1e293b/ffffff?text=PCH', description: 'Música relajante para estudiar o trabajar.', color: 'bg-indigo-700/80', tracks: mockSongs.slice(0, 3) },
  { id: 2, title: 'Lo-Fi Beats', image: 'https://placehold.co/50x50/374151/ffffff?text=LOFI', description: 'Ritmos tranquilos para la concentración.', color: 'bg-amber-700/80', tracks: mockSongs.slice(1, 4) },
  { id: 3, title: 'Rock Essentials', image: 'https://placehold.co/50x50/4b5563/ffffff?text=ROCK', description: 'Los himnos más grandes del rock clásico.', color: 'bg-red-700/80', tracks: mockSongs },
];