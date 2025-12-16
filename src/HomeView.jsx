import SongList from "./components/songs/SongList"
import { usePlayer } from "./context/PlayerContext.jsx";

export default function HomeView({ songs }) {
    const { onSelectSong } = usePlayer();

    return (
        <>
            {/* Barra Superior de Contenido (Placeholder) */}
            <header className="sticky top-0 bg-gray-900/90 backdrop-blur-sm z-10 p-4 flex justify-between items-center border-b border-gray-800">
                <div className="flex space-x-4">
                    <button className="p-2 bg-black rounded-full text-white opacity-50 cursor-not-allowed">{'<'}</button>
                    <button className="p-2 bg-black rounded-full text-white opacity-50 cursor-not-allowed">{'>'}</button>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="bg-white text-black font-semibold px-4 py-2 rounded-full hover:scale-105 transition-transform">Actualizar</button>
                </div>
            </header>
            <SongList songs={songs} onSelectSong={onSelectSong} />

        </>
    )
}