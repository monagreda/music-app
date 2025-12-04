

export default function ProgressBar({ currentSong }) {
    const duration = currentSong ? currentSong.duration : '0:00';
    return (
        <div className="flex items-center space-x-3 w-full max-w-lg">
            <span className="text-xs text-gray-400">0:45</span>
            <div className="h-1 w-full bg-gray-700 rounded-full cursor-pointer group">
                <div className="h-1 bg-green-500 rounded-full" style={{ width: '30%' }}></div>
            </div>
            <span className="text-xs text-gray-400">{duration}</span>
        </div>
    )
}