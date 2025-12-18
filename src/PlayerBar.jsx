import ActualSong from "./components/Bar/ActualSong"
import Controls from "./components/Bar/Controls"
import ProgressBar from "./components/Bar/ProgressBar"
import Volume from "./components/Bar/Volume"
import {usePlayer} from"./context/PlayerContext.jsx"

export default function PlayerBar() {

    // 2. Obtener la lógica y el estado directamente
    const { 
        isPlaying, 
        togglePlay, 
        handlePrevSong, 
        handleNextSong 
    } = usePlayer();

    return (
        <div className="fixed bottom-16 md:bottom-0 left-0 right-0 h-20 md:h-24 bg-gray-950 border-t border-gray-800 flex items-center justify-between px-6 shadow-2xl z-30">
            <div className="w-1/3 md:w-1/4 flex-shrink-0 min-w-0">
                <ActualSong/>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 px-2 md: px-4 min-w-0">
                <Controls />
                <div className="hidden sm:block w-full max-w-md md:max-w-2xl mt-1">
                    <ProgressBar/>
                </div>
                
            </div>

            <div className="hidden md:flex items-center justify-end w-1/4 flex-shrink-0">
                <Volume />
            </div>
            <div className="md:hidden w-8 xs:w-12 flex-shrink-0">
                {/* Este div está vacío, pero ocupa el 25% del ancho para empujar los controles al centro */}
            </div>
        </div>
    )
}