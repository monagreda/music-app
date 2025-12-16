import { useLocalStorage } from '../hooks/useLocalStorage.js';
import React, { createContext, useState, useContext, useMemo, useEffect, useRef } from 'react';
import {mockSongs} from "../data/mockData.jsx";

//Default context values
const defaultContext = {
    isPlaying: false,
    togglePlay: () => {},
    currentSong: {},
    // Asegúrate de usar el nuevo nombre aquí también para evitar fallos futuros:
    onSelectSong: () => {}, 
    handleNextSong: () => {},
    handlePrevSong: () => {},
    audioRef: { current: null } // Valor seguro
}

// 1. Crear el Contexto
export const PlayerContext = createContext();

// 2. Funcion auxiliar para cargar localstorage
const getSavedState = (key, defaultValue) => {
    try {
        const saved = localStorage.getItem(key);
        if (saved !== null) {
            //La mayoria de valores (booleanos, numeros) se guardan como strings
            if(typeof defaultValue === 'boolean') {
                return saved === 'true'; //Convierte "true" a true, "false" a false.
            }
            if (typeof defaultValue === 'number') {
                return Number(saved); // Convierte a numero
            }
        }
    } catch(error) {
        console.error("Error al acceder a localStorage", error);
    }
    return defaultValue;
}

// 3. Crear el Proveedor (donde va toda la lógica de App.js)
export const PlayerProvider = ({ children }) => {
    // Crear referencia al elemento audio
    const audioRef = useRef(new Audio());

    // ----------------------------------------------------
    // Mover estos estados de App.js aquí:
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(mockSongs[0]);
    const [currentPlaylist, setCurrentPlaylist] = useState(mockSongs); // Usar esta lista para la lógica de Next/Prev
    const [isShuffling, setIsShuffling] = useLocalStorage('player_isShuffling' ,false);
    const [shuffledPlaylist, setShuffledPlaylist] = useState([]);
    const [loopMode, setLoopMode] = useLocalStorage('player_loopMode', 0);
    // ----------------------------------------------------
    // Mover esta lógica de App.js aquí:

    //Funcion de orden aleatorio
        const shuffleArray = (array) => {
        //copia el array original para no mutarlo
        const newArray = [...array];
        // Usamos el algoritmo Fisher-Yates 
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;

    }

    const togglePlay = () => {
        setIsPlaying(prev => !prev);
    };

    const toggleShuffle = () => {
        setIsShuffling(prev => !prev);
    }

    const toggleLoop = () => {
        setLoopMode(prev => (prev +1) % 3);
    }

    const onSelectSong = (song) => {
        setCurrentSong(song);
        setIsPlaying(true);
    };

    //Lista de reprduccion 
    const activePlaylist = isShuffling ? shuffledPlaylist : currentPlaylist;

    const handleNextSong = () => {
        const currentIndex = activePlaylist.findIndex(s => s.id === currentSong.id);
        const nextIndex = (currentIndex + 1) % activePlaylist.length;
        //Solo cambiar si la lista no esta vacia
        if(activePlaylist.length > 0) {
            setCurrentSong(activePlaylist[nextIndex]);
            setIsPlaying(true);
        }
    };

    const handlePrevSong = () => {
        const currentIndex = activePlaylist.findIndex(s => s.id === currentSong.id);
        const prevIndex = (currentIndex - 1 + activePlaylist.length) % activePlaylist.length;
        if (activePlaylist.length > 0) {
            setCurrentSong(activePlaylist[prevIndex]);
            setIsPlaying(true);
        }
    };



    // Efecto para reproducir/pausar el audio cuando isPlaying o currentSong cambian
    useEffect(() => {
        if (isPlaying) {
            //le dice al objeto de Audio que empiece la reproduccion
            audioRef.current.play().catch(e => console.error("Error al iniciar la reproduccion:", e));  
        } else{
            //le dice al objeto Audio que pause
            audioRef.current.pause();
        }
    }, [isPlaying]); //Dependencia: Solo se ejecuta cuando isPlaying cambia.

    //useEffect para cargar la cancion
    useEffect(() => {
        if (currentSong) {
            audioRef.current.src = currentSong.audioURL || '/audio/the_backstage.mp3';

            //Carga la nueva fuente
            audioRef.current.load();

            //Si el estado es 'true', empieza a reproducir la nueva cancion
            if(isPlaying) {
                audioRef.current.play().catch(e => console.error("Error cargar y reproducir:", e));
            }
         }
    }, [currentSong]); //Dependencia: Solo se ejecuta cuando currentSong cambia.


    //Efecto de generar la lista aleatoria cuando se activa
    useEffect(() => {
        if (isShuffling) {
            // Generar la lista aleatoria basada en la original
            setShuffledPlaylist(shuffleArray(currentPlaylist));  
        } else {
            //al desactivarse, vaciamos la lista aleatoria
            setShuffledPlaylist([])
        }
    }, [isShuffling, currentPlaylist]);

    //Efecto de loop
    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.loop = loopMode === 2;
    }, [loopMode]) // se ejecuta cada vez qie el usuario cambia el modo loop

    // 3. Crear el Objeto de Contexto (el valor que proveemos)
    const contextValue = useMemo(() => ({
        isPlaying,
        togglePlay,
        currentSong,
        onSelectSong,
        isShuffling,
        toggleShuffle,
        loopMode,
        toggleLoop,
        handleNextSong,
        handlePrevSong,
        audioRef,
        // Agrega aquí todas las funciones y estados que los componentes necesitan
    }), [isPlaying, currentSong, isShuffling, loopMode]);

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    );
};


export const usePlayer = () => useContext(PlayerContext);