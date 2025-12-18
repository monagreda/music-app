import { Home, Search, Library } from "lucide-react"
import NavItem from "./components/sidebar/NavItem"

export default function MobileNav({ currentView, setView }) {
    return (
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-gray-900/90 backdrop-blur-md border-t border-gray-800 flex justify-around items-center md:hidden z-50">
            <NavItem
                icon={Home}
                label="Inicio"
                isActive={currentView === 'home'}
                onClick={() => setView('home')}
            />
            <NavItem
                icon={Search}
                label="Buscar"
                isActive={currentView === 'search'}
                onClick={() => setView('search')}
            />
            <NavItem
                icon={Library}
                label="Biblioteca"
                isActive={currentView === 'library' || (typeof currentView === 'object' && currentView.name === 'playlist')}
                onClick={() => setView('library')}
            />
        </div>
    )
}