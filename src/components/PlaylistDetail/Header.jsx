export default function Header({ playlist }) {
    return (
        /* 1. Cambiamos a flex-col en móvil y flex-row en md. 
           Centramos los items en móvil y los alineamos al fondo en escritorio */
        <header className={`pt-24 md:pt-20 px-6 pb-8 flex flex-col md:flex-row items-center md:items-end gap-6 ${playlist.color}`}>
            
            {/* 2. Imagen: Ajustamos el tamaño para que no sea gigante en móvil */}
            <img 
                src={playlist.image} 
                alt={playlist.title} 
                className="w-40 h-40 md:w-52 md:h-52 shadow-2xl rounded-sm object-cover" 
            />

            {/* 3. Contenedor de texto: Alineación central en móvil, izquierda en md */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left min-w-0">
                <p className="hidden md:block text-xs font-bold uppercase text-white/80">
                    Playlist
                </p>
                
                {/* 4. Título: Bajamos de 6xl a 3xl en móvil y usamos 7xl en escritorio */}
                <h1 className="text-3xl md:text-7xl font-extrabold text-white mt-2 mb-4 break-words w-full">
                    {playlist.title}
                </h1>

                <p className="text-sm text-white/80 max-w-md">
                    {playlist.description}
                </p>

                <div className="flex items-center space-x-1 text-sm font-semibold mt-3">
                    <span className="text-white">Luis Monagreda</span>
                    <span className="text-white/80">· {playlist.tracks.length} canciones</span>
                </div>
            </div>
        </header>
    )
}