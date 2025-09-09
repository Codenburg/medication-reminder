import React from 'react'

const PillBlister = ({ totalPills, remainingPills }) => {
  const takenPills = totalPills - remainingPills
  
  // Create array of pill states
  const pills = Array.from({ length: totalPills }, (_, index) => {
    if (index < takenPills) return 'taken'
    return 'full'
  })

  // Calculate grid layout based on total pills
  const getGridCols = (total) => {
    if (total <= 7) return 'grid-cols-7'
    if (total <= 14) return 'grid-cols-7'
    if (total <= 21) return 'grid-cols-7'
    if (total <= 28) return 'grid-cols-7'
    return 'grid-cols-8'
  }

  return (
    <div className="bg-pink-50 rounded-xl p-6 border-2 border-pink-200">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Blister de Pastillas
        </h3>
        <div className="flex justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-6 rounded-full bg-primary-500 border-2 border-primary-400"></div>
            <span className="text-gray-600">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-6 rounded-full bg-green-500 border-2 border-green-400 opacity-60"></div>
            <span className="text-gray-600">Tomada</span>
          </div>
        </div>
      </div>
      
      <div className={`grid ${getGridCols(totalPills)} gap-2 justify-items-center max-w-md mx-auto`}>
        {pills.map((state, index) => (
          <div
            key={index}
            className={`pill-slot ${state} relative group`}
            title={`Pastilla ${index + 1} - ${state === 'taken' ? 'Tomada' : 'Disponible'}`}
          >
            {/* Pill number tooltip on hover */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
              {index + 1}
            </div>
            
            {/* Pill visual effect */}
            {state === 'full' && (
              <div className="absolute inset-1 bg-white rounded-full opacity-30"></div>
            )}
            {state === 'taken' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-xs">✓</div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Progress bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progreso del tratamiento</span>
          <span>{Math.round((takenPills / totalPills) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-primary-400 to-primary-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(takenPills / totalPills) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default PillBlister
