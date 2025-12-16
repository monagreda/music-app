import { Play, Pause, Shuffle, SkipBack, SkipForward, Repeat2, Repeat1 } from "lucide-react"
import { usePlayer } from "../../context/PlayerContext"

export default function Controls() {
    const { 
        togglePlay,
        isPlaying,
        handlePrevSong,
        handleNextSong,
        isShuffling,
        toggleShuffle,
        loopMode,
        toggleLoop
         } = usePlayer();

         //icono a mostrar loop
         const LoopIcon = loopMode === 2 ? Repeat1 : Repeat2;

         // 2. Lógica para el color del icono Loop
    const loopColor = loopMode !== 0 
        ? 'text-green-500 hover:text-green-400' 
        : 'text-gray-400 hover:text-white';

    // 3. Lógica para el color del icono Shuffle (mejora para robustez)
    const shuffleColor = isShuffling 
        ? 'text-green-500 hover:text-green-400' 
        : 'text-gray-400 hover:text-white';

    return (
        <div className="flex items-center space-x-6 mb-2">
            <Shuffle 
            size={20}
           className={`cursor-pointer ${shuffleColor}`}
            onClick={toggleShuffle}
            />
            <SkipBack
                size={24}
                className="text-gray-400 hover:text-white cursor-pointer"
                onClick={handlePrevSong}
            />
            <button onClick={togglePlay} className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-lg">
                {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" />}
            </button>
            <SkipForward
                size={24}
                className="text-gray-400 hover:text-white cursor-pointer"
                onClick={handleNextSong}
            />
            <LoopIcon
            size={20} 
            className={`cursor-pointer transition-colors ${loopColor}`}
            onClick={toggleLoop}
            />
        </div>
    )
}