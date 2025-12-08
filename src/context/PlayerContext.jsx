// src/context/PlayerContext.js
import React, { createContext, useState, useContext, useMemo } from 'react';
import {mockSongs} from "../data/mockData.jsx";

// 1. Crear el Contexto
export const PlayerContext = createContext();

// 2. Crear el Proveedor (donde va toda la lógica de App.js)
export const PlayerProvider = ({ children }) => {
    // ----------------------------------------------------
    // Mover estos estados de App.js aquí:
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(mockSongs[0]);
    const [currentPlaylist, setCurrentPlaylist] = useState(mockSongs); // Usar esta lista para la lógica de Next/Prev

    // ----------------------------------------------------
    // Mover esta lógica de App.js aquí:

    const togglePlay = () => {
        setIsPlaying(prev => !prev);
    };

    const handleSongSelect = (song) => {
        setCurrentSong(song);
        setIsPlaying(true);
    };

    const handleNextSong = () => {
        const currentIndex = currentPlaylist.findIndex(s => s.id === currentSong.id);
        const nextIndex = (currentIndex + 1) % currentPlaylist.length;
        setCurrentSong(currentPlaylist[nextIndex]);
        setIsPlaying(true);
    };

    const handlePrevSong = () => {
        const currentIndex = currentPlaylist.findIndex(s => s.id === currentSong.id);
        const prevIndex = (currentIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
        setCurrentSong(currentPlaylist[prevIndex]);
        setIsPlaying(true);
    };

    // 3. Crear el Objeto de Contexto (el valor que proveemos)
    const contextValue = useMemo(() => ({
        isPlaying,
        togglePlay,
        currentSong,
        handleSongSelect,
        handleNextSong,
        handlePrevSong,
        // Agrega aquí todas las funciones y estados que los componentes necesitan
    }), [isPlaying, currentSong]);

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    );
};


export const usePlayer = () => useContext(PlayerContext);