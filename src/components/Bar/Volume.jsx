import { Volume2 } from "lucide-react"

export default function Volume() {
    return (
        <div className="flex items-center space-x-3 w-full justify-end">
            <Volume2 size={20} className="text-gray-400 hover:text-white cursor-pointer" />
            <div className="h-1 w-24 bg-gray-700 rounded-full cursor-pointer">
                <div className="h-1 bg-white rounded-full" style={{ width: '70%' }}></div>
            </div>
        </div>
    )
}