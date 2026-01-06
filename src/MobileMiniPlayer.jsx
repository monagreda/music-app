import React, {useState, useEffect} from "react";
import { Play, Pause } from "lucide-react";
import { usePlayer } from "./context/PlayerContext";

export default function MobileMiniPlayer() {
    const { currentSong, isPlaying, togglePlay,audioRef, handleNextSong, handlePrevSong } = usePlayer();

    //Estado de gesto
    const [touchStart, setTouchStart] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const [progress, setProgress] = useState(0)

    //efecto para mover la barra
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            if (audio.duration) {
                const percentage = (audio.currentTime / audio.duration) * 100;
                setProgress(percentage);
            }
        };

        audio.addEventListener('timeupdate', updateProgress);
        return () => audio.removeEventListener('timeupdate', updateProgress);
    }, [audioRef, currentSong]); // Se reinicia si cambia la canción

    // --- LÓGICA DE GESTOS (SWIPE) ---
    const onTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        const currentX = e.targetTouches[0].clientX;
        const diff = currentX - touchStart;
        setTranslateX(diff); // Mueve la barra visualmente con el dedo
    };

    const onTouchEnd = () => {
        // Umbral de 70 píxeles para cambiar de canción
        if (translateX < -70) handleNextSong();
        if (translateX > 70) handlePrevSong();
        
        // Volver al centro
        setTranslateX(0);
    };

    if (!currentSong) return null;

    return (
        /* Contenedor flotante: margen lateral (mx-2), redondeado (rounded-lg) y desenfoque */
        <div 
        // eventos de toque
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        //movimientos dinamicos
        style={{
            transform: `translateX(${translateX}px)`,
            transition: translateX === 0 ? 'transform 0.3s ease-out' : 'none'
        }}
        className="fixed bottom-[72px] left-2 right-2 h-14 bg-gray-900/95 backdrop-blur-md border border-gray-800 rounded-lg flex items-center justify-between px-3 shadow-2xl z-40 md:hidden">
            
            <div className="flex items-center space-x-3 min-w-0">
                <img 
                    src={currentSong.albumArt} 
                    className="w-10 h-10 rounded-md object-cover shadow-lg" 
                    alt="Art" 
                />
                <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate w-40">
                        {currentSong.title}
                    </p>
                    <p className="text-gray-400 text-xs truncate">
                        {currentSong.artist}
                    </p>
                </div>
            </div>

            <button 
                onClick={(e) => {
                    e.stopPropagation(); // Para no disparar eventos del padre
                    togglePlay();
                }}
                className="text-white p-2"
            >
                {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" />}
            </button>

            {/* Barra de progreso minimalista: una línea finísima al fondo de la tarjeta */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 rounded-b-lg overflow-hidden">
                <div 
                    className="h-full bg-white transition-all duration-300 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}