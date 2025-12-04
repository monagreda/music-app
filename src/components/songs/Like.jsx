import { Heart } from "lucide-react"

export default function Like({ song }) {

    return (
        // Usamos flex para centrar el corazón en su pequeña columna
        <div className="flex justify-center items-center h-full">
            {song.isLiked ? (
                // Corazón relleno (Like activo)
                <Heart size={18} className="text-green-500 hover:text-white cursor-pointer transition-colors" fill="rgb(34 197 94)" />
            ) : (
                // Corazón vacío (Like inactivo)
                <Heart size={18} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
            )}
        </div>
    )
}