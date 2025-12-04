import { Home, Search, Music } from "lucide-react"
import NavItem from "./components/sidebar/NavItem"
import Library from "./components/sidebar/Library"

export default function SideBar({ playlists, currentView, setView }) {
    //sidebar
    return (
        <div className="w-64 p-4 bg-black text-white flex flex-col space-y-6 hidden md:block">

            {/* Logo y Navegación Principal */}
            <div className="space-y-2 mb-4">
                <h1 className="text-2xl font-bold text-white mb-4">🎵 MúsicApp</h1>
                <NavItem icon={Home} label="Inicio" isActive={currentView === 'home'} onClick={() => setView('home')} />
                <NavItem icon={Search} label="Buscar" isActive={currentView === 'search'} onClick={() => setView('search')} />
            </div>
            <Library playlists={playlists} setView={setView} />
        </div>

    )
}