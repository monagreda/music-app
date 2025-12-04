import Header from "./components/PLaylistDetail/header"
import ControlList from "./components/PLaylistDetail/ControlList"

export default function PlaylistDetail({ playlist, onSelectSong, togglePlay, isPlaying }) {
    if (!playlist) return <div className="texxt-white p-6">Playlist no encontrada. </div>
    return (
        <div className="flex-1 overflow-y-auto bg-gray-900">
            <Header playlist={playlist} />
            <ControlList isPlaying={isPlaying} playlist={playlist} onSelectSong={onSelectSong} togglePlay={togglePlay} />

        </div>
    )
}