import './App.css'
import SideBar from './SideBar'
import MobileNav from './MobileNav';
import HomeView from './HomeView';
import PlaylistDetail from './PlaylistDetail';
import PlayerBar from './PlayerBar';
import LibraryView from './LibraryView';
import { useState } from 'react';

const mockSongs = [
  { id: 101, title: 'Running Up That Hill', artist: 'Kate Bush', album: 'Hounds of Love', duration: '5:03', isLiked: true },
  { id: 102, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: '5:55', isLiked: false },
  { id: 103, title: 'As It Was', artist: 'Harry Styles', album: 'Harrys House', duration: '2:47', isLiked: true },
  { id: 104, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', isLiked: false },
  { id: 105, title: 'Shape of You', artist: 'Ed Sheeran', album: '÷', duration: '3:53', isLiked: false },
];

const mockPlaylists = [
  { id: 1, title: 'Pop Chill', image: 'https://placehold.co/50x50/1e293b/ffffff?text=PCH', description: 'Música relajante para estudiar o trabajar.', color: 'bg-indigo-700/80', tracks: mockSongs.slice(0, 3) },
  { id: 2, title: 'Lo-Fi Beats', image: 'https://placehold.co/50x50/374151/ffffff?text=LOFI', description: 'Ritmos tranquilos para la concentración.', color: 'bg-amber-700/80', tracks: mockSongs.slice(1, 4) },
  { id: 3, title: 'Rock Essentials', image: 'https://placehold.co/50x50/4b5563/ffffff?text=ROCK', description: 'Los himnos más grandes del rock clásico.', color: 'bg-red-700/80', tracks: mockSongs },
];


export default function App() {
  // Estados de la app
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(mockSongs[0])
  const [currentView, setCurrentView] = useState('home');


  //logica
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSongSelect = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    console.log(`Reproduciendo: ${song.title}`);
  }

  const handleNextSong = () => {
    const currentIndex = mockSongs.findIndex(s => s.id === currentSong.id)
    const nextIndex = (currentIndex + 1) % mockSongs.length;
    setCurrentSong(mockSongs[nextIndex]);
    setIsPlaying(true);
  }

  const handlePrevSong = () => {
    const currentIndex = mockSongs.findIndex(s => s.id === currentSong.id)
    const prevIndex = (currentIndex - 1 + mockSongs.length) % mockSongs.length;
    setCurrentSong(mockSongs[prevIndex]);
    setIsPlaying(true);
  }

  // render contenido central
  const renderContent = () => {
    if (currentView === 'home') {
      return (
        <div className='flex-1 overflow-y-auto'>
          <HomeView songs={mockSongs} onSelectSong={handleSongSelect} />
        </div>
      )
    }
    if (typeof currentView === 'object' && currentView.name === 'playlist') {
      const playlist = mockPlaylists.find(p => p.id === currentView.id)
      return (
        <PlaylistDetail
          playlist={playlist}
          onSelectSong={handleSongSelect}
          togglePlay={togglePlay}
          isPlaying={isPlaying}
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
    <div className='flex h-screen bg-gray-900 text-white'>

      {/* Contenedor GRID (SideBar + Contenido Principal) */}
      <div className=' grid grid-cols-1 md:grid-cols-[auto_1fr] h-[calc(100vh-160px)] md:h-[calc(100vh-96px)]'>
        <SideBar currentView={currentView} setView={setView} playlists={mockPlaylists} />
        {/* Contenido Principal - Renderiza la vista actual */}
        {renderContent()}

      </div>




      {/* Player (Reproductor) - Pasa la lógica de reproducción */}
      <PlayerBar
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        currentSong={currentSong}
        handleNextSong={handleNextSong}
        handlePrevSong={handlePrevSong}
        className="fixed bottom-0 left-0 right-0 h-[90px] bg-gray-800 border-t border-gray-700 z-20"
      />

      {/* mobile nav  */}
      <MobileNav currentView={currentView} setView={setView} />
    </div>
  )

}


