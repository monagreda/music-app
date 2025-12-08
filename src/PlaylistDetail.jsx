import Header from "./components/PLaylistDetail/header"
import ControlList from "./components/PLaylistDetail/ControlList"
import { usePlayer } from "./context/PlayerContext"

export default function PlaylistDetail({ playlist }) {
    const {onSelectSong, togglePlay, isPlaying} = usePlayer();

    if (!playlist) return <div className="texxt-white p-6">Playlist no encontrada. </div>
    return (
        <div className="flex-1 overflow-y-auto bg-gray-900">
            <Header playlist={playlist} />
            <ControlList 
            isPlaying={isPlaying} 
            playlist={playlist} 
            onSelectSong={onSelectSong} 
            togglePlay={togglePlay} />

        </div>
    )
}