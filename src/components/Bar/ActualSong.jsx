export default function ActualSong({ currentSong }) {
    const albumArtSrc = currentSong?.albumArt || 'https://placehold.co/60x60/374151/ffffff?text=🎶';
    const songTitle = currentSong?.title || 'Título Desconocido';
    const songArtist = currentSong?.artist || 'Artista';
    return (
        <div className="flex items-center space-x-2 w-full">
            <img
                src={albumArtSrc}
                alt="Album Art"
                className="w-10 h-10 md:w-14 md:h-14 rounded shadow-lg flex-shrink-0"
            />
            <div>
                <p className="text-white font-semibold truncate cursor-pointer text-left text-sm md:text-base">
                    {songTitle}</p>
                <p className="text-gray-400 truncate cursor-pointer text-left text-xs">
                    {songArtist}</p>
            </div>
        </div>
    )
}