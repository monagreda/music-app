import NameSong from "./NameSong";
import { CircleCheck } from "lucide-react"


export default function List({ songs, onSelectSong }) {

    if (!Array.isArray(songs)) {
        return <div className="text-gray-400 p-4">No se pudo cargar la lista de canciones.</div>;
    }

    return (
        <div className="bg-gray-800 p-4 rounded-xl shadow-xl">
            {/* header */}
            <div className="grid grid-cols-[30px_2fr_2fr_2fr_1fr_30px] text-gray-400 border-b border-gray-700 pb-2 mb-2 font-semibold text-sm">
                <div>#</div>
                <div className="text-left">Título</div>
                <div className="text-left">Álbum</div>
                <div className="text-left">Artista</div>
                <div className="text-right">Duración</div>
                <div className="flex justify-center items-center">
                    <CircleCheck size={16} />
                </div>
            </div>

            {songs.map((song, index) => (
                <NameSong
                    key={song.id}
                    song={song}
                    index={index}
                    onSelectSong={onSelectSong}
                />
            ))}

        </div>
    )
}