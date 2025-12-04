import Like from "./Like"

export default function NameSong({ song, index, onSelectSong }) {
    return (
        <div
            className="grid grid-cols-[30px_2fr_2fr_2fr_1fr_30px] py-3 px-1 rounded-md hover:bg-gray-700 cursor-pointer transition-colors duration-150 items-center"
            onClick={() => onSelectSong(song)}
        >
            <div className="text-gray-400 font-medium">{index + 1}</div>

            <div className="flex flex-col">
                <span className="text-white font-medium truncate text-left">{song.title}</span>
                <span className="text-gray-400 text-sm truncate text-left">{song.artist}</span>
            </div>

            <div className="text-gray-400 truncate text-left">{song.album}</div>
            <div className="text-gray-400 truncate text-left">{song.artist}</div>
            <div className="text-right text-gray-400">{song.duration}</div>
            <Like song={song} />
        </div>
    )
}