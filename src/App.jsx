import './App.css'
import SideBar from './SideBar'
import MobileNav from './MobileNav';
import HomeView from './HomeView';
import PlaylistDetail from './PlaylistDetail';
import PlayerBar from './PlayerBar';
import MobileMiniPlayer from './MobileMiniPlayer.jsx';
import LibraryView from './LibraryView';
import { useState } from 'react';
import { mockSongs, mockPlaylists } from "./data/mockData.jsx";
import songsData from './data/canciones_ready.json'
import { PlayerProvider } from './context/PlayerContext.jsx';
import SearchView from './SearchView.jsx';



export default function App() {
  // Estados de la app
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState("");

  // 1. MAPEADOR: Traducimos de español (Python) a inglés (React)
  // y nos aseguramos de usar songsData si existe, sino mockSongs por seguridad
  const allSongs = (songsData || mockSongs).map(song => ({
    ...song,
    title: song.titulo || song.title,      // Si existe 'titulo', úsalo, si no 'title'
    artist: song.artista || song.artist,   // Si existe 'artista', úsalo, si no 'artist'
    id: song.id || Math.random()           // Un ID por si acaso
  }));

  // render contenido central
  const renderContent = () => {
    if (currentView === 'home') {

      // 3. CLUSTERING: Dividimos las canciones para mostrar secciones inteligentes
      const popularHits = allSongs.filter(s => s.cluster === 0);
      const chillVibes = allSongs.filter(s => s.cluster === 1);

      return (
        <div className='flex-1 overflow-y-auto space-y-8'>
          {/* Mostramos dos filas basadas en la IA */}
          <HomeView title="🔥 Los más escuchados" songs={popularHits} />
          <HomeView title="🧘 Relax & Mood" songs={chillVibes} />
        </div>
      )
    }
    if (typeof currentView === 'object' && currentView.name === 'playlist') {
      const playlist = mockPlaylists.find(p => p.id === currentView.id)
      return (
        <PlaylistDetail
          playlist={playlist}
        />
      )
    }
    if (currentView === 'search') {
      return (
        <SearchView
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          songs={filteredSongs}
        />
      );
    }

    if (currentView === 'library') {
      return (
        <div className='flex-1 overflow-y-auto'>
          <LibraryView playlists={mockPlaylists} setView={setView} />
        </div>
      )
    }

    return <div className='p-6 text-white'>Vista no encontrada</div>;
  };

  //Filtrar canciones en tiempo real
  const filteredSongs = allSongs.filter(song =>
    song.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // funcion vista
  const setView = (view) => {
    setCurrentView(view);
  };

  return (
    <PlayerProvider>
      <div className='flex h-screen bg-gray-900 text-white'>

        {/* Contenedor GRID (SideBar + Contenido Principal) */}
        <div className=' grid grid-cols-1 md:grid-cols-[auto_1fr] h-[calc(100vh-160px)] md:h-[calc(100vh-96px)]'>
          <SideBar currentView={currentView} setView={setView} playlists={mockPlaylists} />
          {/* Contenido Principal - Renderiza la vista actual */}
          <main className='flex-1 overflow-y-auto pb-40 md:pb-28'>

            {/* El Header ahora vive aquí, una sola vez para toda la App */}
            <header className="sticky top-0 bg-gray-900/90 backdrop-blur-sm z-10 p-4 flex justify-between items-center border-b border-gray-800">
              <div className="flex space-x-4">
                <button className="p-2 bg-black rounded-full text-white opacity-50">{'<'}</button>
                <button className="p-2 bg-black rounded-full text-white opacity-50">{'>'}</button>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-white text-black font-semibold px-4 py-2 rounded-full hover:scale-105 transition-transform"
                >
                  Actualizar IA
                </button>
              </div>
            </header>

            {renderContent()}
          </main>
        </div>




        {/* Player (Reproductor) - Pasa la lógica de reproducción */}
        <div className='hidden md:block'>
          <PlayerBar
            className="fixed bottom-16 md:bottom-0 left-0 right-0 h-20 md:h-24 bg-gray-800 border-t border-gray-700 z-20"
          />
        </div>

        {/* reproductor solo visible en mobiles */}
        <MobileMiniPlayer />


        {/* mobile nav  */}
        <MobileNav currentView={currentView} setView={setView} />
      </div>
    </PlayerProvider>
  )

}


