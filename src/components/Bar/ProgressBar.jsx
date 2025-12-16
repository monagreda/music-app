import React, { useState, useEffect } from 'react';
import {usePlayer} from "../../context/PlayerContext.jsx";

// Funcion auxiliar para convertir segundos a formato MM:SS
const formatTime = (time) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time/60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}: ${String(seconds).padStart(2, '0')}`;

}

export default function ProgressBar() {
    // Obtener la referencia de audio desde el contexto
    const {audioRef, handleNextSong} = usePlayer();

    //Estado local para el tiempo actual y la duracion total
    const [currentTime, setCurrentTime] = useState(0);
    const[duration, setDuration]= useState(0)

    //useEffect para sincronizar con los eventos del objeto Audio
    useEffect(() => {
        const audio = audioRef.current; //El objeto <audio> nativo
        //Si no tenemos el objeto de audio, salimos
        if (!audio) return;
        //Obtener la duracion inmediatamente si ya esta cargada
        if(audio.duration){
            setDuration(audio.duration)
        }

        //a. Handler para actualizar el tiempo actual (se dispara muchas veces por segundo)
        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        //b. Listener para cuando el audio termina (para ir a la siguiente cancion)
        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        //c. Listener para cuando el audio termina (para ir a la siguiente cancion)
        const handleSongEnd = () => {
            if(!audio.loop){
                handleNextSong();
                setCurrentTime(0);
            }
        }

        //Asignar los Event Listeners (Suscripcion)
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleSongEnd);

        //Funcion de limpieza(Cleanup)
        //ES CRUCIAL: Eliminar los listeners al desmontar para evitar fugas de memoria
        return() => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleSongEnd);
        }
    }, [audioRef, handleNextSong]) //Dpendencia: Se ejecuta solo cuando el objeto de audio cambie (generalmente nunca después del montaje)

    //Calculo del porcentaje para la barra visual
    const progressPercent = (currentTime / duration) * 100;

    // Manejar el cambio manual del usuario (Scrubbing)
    const handleScrubbing = (event) =>{
        const newTime = Number(event.target.value);
        setCurrentTime(newTime);
        //Usamos la referencia directa para el cambio manual
        if (audioRef.current){
            audioRef.current.currentTime = newTime; //Actualiza el tiempo en el objeto de audio
        }
    };

    return (
        <div className="flex items-center space-x-3 w-full max-w-lg">
            {/* Tiempo Actual */}
            <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
            {/* Barra de Progreso (Slider) */}
            <input 
                type="range" 
                min="0"
                max={duration}
                value={currentTime}
                step="0.01" // Permite pasos muy pequeños para precisión
                onChange={handleScrubbing}
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full"
                // Tailwind CSS para personalizar el color de la pista y el pulgar
                style={{ background: `linear-gradient(to right, #1db954 0%, #1db954 ${progressPercent}%, #535353 ${progressPercent}%, #535353 100%)` }}
            />
            {/* Duracion Total */}
            <span className="text-xs text-gray-400 w-10 text-left">{formatTime(duration)}</span>
        </div>
    )
}