import { useState, useEffect } from 'react';

export function useLocalStorage(key, defaultValue) {
    // 1. Inicializamos el estado intentando leer de localStorage
    const [value, setValue] = useState(() => {
        try {
            const saved = localStorage.getItem(key);
            if (saved !== null) {
                // Usamos JSON.parse porque localStorage guarda todo como string
                // Esto nos permite guardar booleanos, números u objetos correctamente
                return JSON.parse(saved);
            }
        } catch (error) {
            console.error(`Error cargando ${key} desde localStorage:`, error);
        }
        return defaultValue;
    });

    // 2. Cada vez que el valor cambie, actualizamos localStorage automáticamente
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error guardando ${key} en localStorage:`, error);
        }
    }, [key, value]);

    return [value, setValue];
}

    // // Guardar modo Shuffle al cambiar
    // useEffect(() => {
    //     try {
    //         localStorage.setItem('player_isShuffling', isShuffling.toString());
    //     } catch (error) {
    //         console.error("Error al guardar Shuffle en localStorage", error);
    //     }
    // }, [isShuffling]);

    // // Guardar modo Loop al cambiar
    // useEffect(() => {
    //     try {
    //         localStorage.setItem('player_loopMode', loopMode.toString());
    //     } catch (error) {
    //         console.error("Error al guardar Loop en localStorage", error);
    //     }
    // }, [loopMode]);

    
    // // Función auxiliar para cargar el volumen guardado
    // const getSavedVolume = () => {
    //     try {
    //         const savedVolume = localStorage.getItem('player_volume');
    //         if (savedVolume !== null) {
    //             // El volumen se guarda como un string, lo convertimos a número
    //             return Number(savedVolume); 
    //         }
    //     } catch (error) {
    //         console.error("Error al cargar volumen desde localStorage", error);
    //     }
    //     return 50; // Valor por defecto si no hay nada guardado
    // };
