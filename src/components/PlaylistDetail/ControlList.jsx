import { Pause, Play } from "lucide-react"
import SongList from "../songs/SongList.jsx"
import { usePlayer } from "../../context/PlayerContext.jsx"

export default function ControlList({ playlist }) {
     const {onSelectSong, togglePlay, isPlaying} = usePlayer();
     
    return (
        <div className="bg-gray-900">
            {/* bton */}
            <div className="p-6 w-full flex justify-start">
                <button onClick={() => togglePlay()} className=" p-3 bg-green-500 text-black rounded-full hover:scale-105 transition-transform shadow-green-500/50 shadow-xl" >
                    {isPlaying ? <Pause size={30} fill="black" /> : <Play size={30} fill="black" />}
                </button>
            </div>
            {/* lista de Canciones */}
            <SongList songs={playlist.tracks}
                onSelectSong={onSelectSong}
                hideHeader={true}
            />

        </div>
    )
}