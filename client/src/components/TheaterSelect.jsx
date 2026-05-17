import React from 'react'

const bhopalTheaters = [
    { id: 1, name: "PVR Logix Mall", address: "DB City Mall, Arera Colony" },
    { id: 2, name: "INOX", address: "Aashima Mall, Hoshangabad Road" },
    { id: 3, name: "Cinepolis", address: "Planet Godrej, MP Nagar" },
    { id: 4, name: "Cineworld", address: "Shahpura, Bhopal" },
    { id: 5, name: "MPR Cinemas", address: "Bhopal Junction" },
    { id: 6, name: "PVR DB Mall", address: "DB City Mall, Bhopal" },
    { id: 7, name: "Esquire Cinemas", address: "Habibganj, Bhopal" },
    { id: 8, name: "Carnival Cinemas", address: "Kolar Road, Bhopal" }
]

const TheaterSelect = ({ isOpen, onClose, onSelect }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />
            
            <div className="relative bg-gray-800 border border-primary/30 rounded-2xl w-full max-w-md mx-4 overflow-hidden">
                <div className="bg-primary/20 px-6 py-4 border-b border-primary/20">
                    <h2 className="text-xl font-semibold text-white">Select Theater</h2>
                    <p className="text-sm text-gray-400 mt-1">Bhopal</p>
                </div>

                <div className="max-h-96 overflow-y-auto p-4 space-y-3">
                    {bhopalTheaters.map((theater) => (
                        <button
                            key={theater.id}
                            onClick={() => onSelect(theater)}
                            className="w-full text-left p-4 bg-gray-700/50 hover:bg-primary/20 hover:border-primary/50 border border-transparent rounded-xl transition-all duration-200 group"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-white group-hover:text-primary transition-colors">
                                        {theater.name}
                                    </h3>
                                    <p className="text-sm text-gray-400 mt-1">
                                        {theater.address}
                                    </p>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </button>
                    ))}
                </div>

                <div className="p-4 border-t border-gray-700">
                    <button 
                        onClick={onClose}
                        className="w-full py-3 text-gray-400 hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TheaterSelect