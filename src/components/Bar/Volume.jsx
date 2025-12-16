import React, {useState, useEffect} from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { usePlayer } from '../../context/PlayerContext';
import { Volume2, VolumeX } from "lucide-react"


export default function Volume() {
    //referencia desde contexto
    const {audioRef} = usePlayer();
    const audio =  audioRef.current;
    

    //Estado local para el volumen (de 0 a 100 para el slider)
    const [volume, setVolume] = useLocalStorage('player_volume', 50);
    const [previousVolume, setPreviousVolume] = useState(volume);

    //Efecto para inicializar el volumen en el objeto de audio
    useEffect(() => {
   if (audio) {
            audio.volume = volume / 100;
        }
    }, [volume, audio]) // Se ejecuta al montar y cada vez que el volumen cambie

    //Handler para controlar el slider
    const handleVolumeChange = (event) => {
        const newVolume = Number(event.target.value); // El valor del slider
        setVolume(newVolume);

        //actualizar la propiedad de volumen audio
        if(audio) {
        audio.volume = newVolume / 100
        }

        //actualizar volumen
        if(newVolume > 0) {
            setPreviousVolume(newVolume);
        }
    };

    //Handler para el boton de silencio
    const toggleMute = () => {
        if(!audio) return;

        if (volume > 0) {
            // Si hay volumen, lo guardamos y lo ponemos en 0 (Mute)
            setPreviousVolume(volume);
            setVolume(0);
            audio.volume = 0;
        } else {
            // Si está en 0, lo regresamos al volumen anterior
            setVolume(previousVolume);
            audio.volume = previousVolume / 100;
        }
    };

    // Icono que se muestra (VolumeX si está silenciado, Volume2 si tiene sonido)
    const VolumeIcon = volume === 0 ? VolumeX : Volume2;

    // Cálculo del porcentaje para la barra visual (como en ProgressBar)
    const progressPercent = volume;

    return (
        <div className="flex items-center space-x-3 w-full justify-end">
            {/* boton mute */}
            <button
            onClick={toggleMute}
            className="text-gray-400 hover:text-white transition-colors p-1"
            >
                <VolumeIcon size={20}/>
            </button>

            {/* Barra de Volumen */}

            <input
                type="range"
                min="0"
                max="100"
                value={volume} // Se enlaza al estado local
                onChange={handleVolumeChange} // Usa el handler
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full"
                // El estilo para la barra de volumen. Usaremos el verde de Spotify.
                style={{ background: `linear-gradient(to right, #1db954 0%, #1db954 ${progressPercent}%, #535353 ${progressPercent}%, #535353 100%)` }}
            />
        </div>
    )
}