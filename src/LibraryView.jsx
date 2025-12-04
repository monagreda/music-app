import { Play } from "lucide-react";

export default function LibraryView({ playlists, setView }) {
    return (
        <div className="flex-1 p-6 overflow-y-auto bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-8 mt-4">Tu Biblioteca</h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {playlists.map((p) => (
                    <div
                        key={p.id}
                        className="relative p-2 rounded-lg shadow-xl bg-gray-800/40 cursor-pointer 
                                   transition-all duration-300 hover:bg-gray-700/60 group"
                        onClick={() => setView({ name: 'playlist', id: p.id })}
                    // className={`p-4 rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-[1.02] ${p.color}`}
                    >
                        <div className="relative w-full mb-2">
                            <img
                                src={p.image}
                                alt={p.title}
                                className="w-full h-auto rounded mb-2"
                            />

                            <button
                                className="absolute bottom-2 right-2 p-3 bg-green-500 text-black rounded-full 
                                           opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 
                                           transition-all duration-300 shadow-lg hover:scale-105"
                                onClick={(e) => {
                                    e.stopPropagation(); // Evita que se active el onClick del div padre
                                    console.log(`Reproduciendo playlist: ${p.title}`);
                                }}
                            >
                                <Play size={24} fill="black" />
                            </button>

                        </div>
                        <h3 className="text-lg font-bold truncate">{p.title}</h3>
                        <p className="text-sm text-white/80">{p.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}