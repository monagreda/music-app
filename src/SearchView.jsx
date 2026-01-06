import { Search as SearchIcon } from "lucide-react";
import SongList from "./components/songs/SongList"; 

export default function SearchView({ searchQuery, setSearchQuery, songs }) {
    return (
        <div className="flex-1 min-h-screen bg-gradient-to-b from-gray-800/40 to-gray-900 pb-32">
            
            {/* Header del Buscador (Sticky en móvil para que no se pierda al bajar) */}
            <div className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur-md p-4 md:p-8 md:bg-transparent md:backdrop-blur-none">
                <div className="max-w-4xl mx-auto">
                    <h1 className="hidden md:block text-3xl font-bold text-white mb-6">Buscar</h1>
                    
                    <div className="relative group">
                        <SearchIcon 
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white transition-colors" 
                            size={22} 
                        />
                        <input 
                            type="text"
                            placeholder="¿Qué quieres escuchar?"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white pl-12 pr-4 py-3 md:py-4 rounded-full border border-transparent focus:border-white/30 outline-none transition-all shadow-xl text-base md:text-lg"
                            autoFocus
                        />
                    </div>
                </div>
            </div>

            {/* Contenedor de Resultados */}
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-white px-2">
                    {searchQuery ? `Resultados para "${searchQuery}"` : "Explora todo"}
                </h2>

                {songs.length > 0 ? (
                    /* Aquí SongList ya debe manejar su propio grid responsive */
                    <SongList songs={songs} />
                ) : (
                    <div className="flex flex-col items-center justify-center mt-20 px-4 text-center">
                        <div className="bg-gray-800 p-6 rounded-full mb-4">
                             <SearchIcon size={48} className="text-gray-500" />
                        </div>
                        <h3 className="text-white text-xl font-semibold">No se encontraron resultados</h3>
                        <p className="text-gray-400 mt-2 max-w-xs">
                            Asegúrate de que el nombre esté bien escrito o intenta con otro artista.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}