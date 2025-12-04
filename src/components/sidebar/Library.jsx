import {
    LibraryIcon,
    ListMusic
} from "lucide-react";

export default function Library({ playlists, setView }) {
    return (
        <div className="pt-4 border-t border-gray-800 space-y-2">

            {/* header */}
            <div className="flex items-center justify-between text-gray-400 hover:text-white cursor-pointer">
                <div className="flex items-center space-x-2">
                    <LibraryIcon size={24} className="text-white" />
                    <span className="font-semibold">Tu Biblioteca</span>
                </div>
                <ListMusic size={20} className="hover:text-white" />
            </div>

            {/* playlist */}
            <div className="space-y-1">
                {playlists.map(p => (
                    <div
                        key={p.id}
                        className="flex items-center space-x-3 text-gray-300 text-sm py-1 hover:bg-gray-800 rounded px-1 cursor-pointer transition-colors duration-150"
                        onClick={() => setView({ name: 'playlist', id: p.id })}
                    >
                        <img src={p.image} alt={p.title} className="w-10 h-10 rounded-md" />
                        <div>
                            <p className="text-white font-medium truncate">{p.title}</p>
                            <p className="text-gray-400 text-xs">Playlist</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}