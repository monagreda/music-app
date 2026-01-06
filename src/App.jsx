import './App.css'
import SideBar from './SideBar'
import MobileNav from './MobileNav';
import HomeView from './HomeView';
import PlaylistDetail from './PlaylistDetail';
import PlayerBar from './PlayerBar';
import MobileMiniPlayer from './MobileMiniPlayer.jsx';
import LibraryView from './LibraryView';
import { useState } from 'react';
import {mockSongs, mockPlaylists} from "./data/mockData.jsx";
import { PlayerProvider } from './context/PlayerContext.jsx';
import SearchView from './SearchView.jsx';



export default function App() {
  // Estados de la app
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState("");

  // render contenido central
  const renderContent = () => {
    if (currentView === 'home') {
      return (
        <div className='flex-1 overflow-y-auto'>
          <HomeView songs={mockSongs} />
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
  const filteredSongs = mockSongs.filter(song => 
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
      <MobileMiniPlayer/>


      {/* mobile nav  */}
      <MobileNav currentView={currentView} setView={setView} />
    </div>
    </PlayerProvider>
  )

}


