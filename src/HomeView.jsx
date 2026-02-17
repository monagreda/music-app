import SongList from "./components/songs/SongList"
import { usePlayer } from "./context/PlayerContext.jsx";

export default function HomeView({ title, songs }) {
    const { onSelectSong } = usePlayer();

    return (
        <section className="p-6">
            {/* Título de la sección (ej: 🔥 Los más escuchados) */}
            <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">
                    {title}
                </h2>
                <button className="text-sm font-bold text-gray-400 hover:underline cursor-pointer uppercase tracking-wider">
                    ver todo
                </button>
            </div>

            {/* Lista de canciones del cluster (contenedor) */}
            <div className="bg-gray-800/20 rounded-xl p-2">
                <SongList songs={songs} onSelectSong={onSelectSong} />
            </div>

        </section>
    )
}