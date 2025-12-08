import './App.css'
import SideBar from './SideBar'
import MobileNav from './MobileNav';
import HomeView from './HomeView';
import PlaylistDetail from './PlaylistDetail';
import PlayerBar from './PlayerBar';
import LibraryView from './LibraryView';
import { useState } from 'react';
import {mockSongs, mockPlaylists} from "./data/mockData.jsx";
import { PlayerProvider } from './context/PlayerContext.jsx';


export default function App() {
  // Estados de la app
  const [currentView, setCurrentView] = useState('home');

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
        <div className="flex-1 p-6 overflow-y-auto bg-gray-900 text-white">
          <h1 className="text-4xl font-bold mt-20">Vista de Búsqueda</h1>
          <p className="mt-4 text-gray-400">Aquí se mostrarán los resultados de búsqueda.</p>
        </div>
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
        {renderContent()}

      </div>




      {/* Player (Reproductor) - Pasa la lógica de reproducción */}
      <PlayerBar
        className="fixed bottom-0 left-0 right-0 h-[90px] bg-gray-800 border-t border-gray-700 z-20"
      />

      {/* mobile nav  */}
      <MobileNav currentView={currentView} setView={setView} />
    </div>
    </PlayerProvider>
  )

}


