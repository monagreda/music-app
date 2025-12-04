export default function Header({ playlist }) {
    return (
        <header className={`pt-20 px-6 pb-8 flex items-end space-x-6 ${playlist.color}`}>
            <img src={playlist.image} alt={playlist.title} className="w-48 h-48 shadow-2xl" />
            <div>
                <p className="text-xs font-bold uppercase text-white/80">Playlist</p>
                <h1 className="text-6xl font-extrabold text-white mt-2 mb-4">{playlist.title}</h1>
                <p className="text-sm text-white/80">{playlist.description}</p>
                <div className="flex items-center space-x-1 text-sm font-semibold mt-2">
                    <span className="text-white">Luis Monagreda</span>
                    <span className="text-white/80">· {playlist.tracks.length} canciones</span>
                </div>
            </div>
        </header>
    )
}