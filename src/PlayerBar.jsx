import ActualSong from "./components/Bar/ActualSong"
import Controls from "./components/Bar/Controls"
import ProgressBar from "./components/Bar/ProgressBar"
import Volume from "./components/Bar/Volume"

export default function PlayerBar({ isPlaying, togglePlay, currentSong, handlePrevSong, handleNextSong }) {
    return (
        <div className="fixed bottom-0 left-0 right-0 h-24 bg-gray-950 border-t border-gray-800 flex items-center justify-between px-6 shadow-2xl z-30">
            <div className="w-28 flex-shrink-0">
                <ActualSong currentSong={currentSong} />
            </div>

            <div className="flex flex-col items-center justify-center flex-1">
                <Controls
                    isPlaying={isPlaying}
                    togglePlay={togglePlay}
                    handleNextSong={handleNextSong}
                    handlePrevSong={handlePrevSong}
                />
                <ProgressBar currentSong={currentSong} />
            </div>

            <div className="hidden md:block w-28 flex-shrink-0">
                <Volume />
            </div>
            <div className="block md:hidden w-28 flex-shrink-0">
                {/* Este div está vacío, pero ocupa el 25% del ancho para empujar los controles al centro */}
            </div>
        </div>
    )
}