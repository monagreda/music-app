export default function ({ icon: Icon, label, onClick, isActive = false }) {
    return (
        <div onClick={onClick} className={`
        flex items-center space-x-3 p-2 rounded-lg cursor-pointer
        transition-colors duration-200 font-semibold
        ${isActive
                ? 'text-white bg-gray-700'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }
        `}
        >
            <Icon size={24} />
            <span>{label}</span>
        </div>
    )
}