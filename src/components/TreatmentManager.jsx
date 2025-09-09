import React, { useState } from 'react'

const TreatmentManager = ({ treatment, onUpdateTreatment, onClose }) => {
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    name: treatment.name,
    totalPills: treatment.totalPills,
    remainingPills: treatment.remainingPills
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'totalPills' || name === 'remainingPills' ? parseInt(value) || 0 : value
    }))
  }

  const saveChanges = () => {
    onUpdateTreatment({
      ...treatment,
      ...formData
    })
    setEditMode(false)
  }

  const resetTreatment = () => {
    if (window.confirm('¿Estás seguro de que quieres reiniciar el tratamiento? Esto restablecerá todas las pastillas.')) {
      onUpdateTreatment({
        ...treatment,
        remainingPills: treatment.totalPills,
        takenToday: false,
        startDate: new Date().toISOString().split('T')[0]
      })
    }
  }

  const startNewTreatment = () => {
    if (window.confirm('¿Quieres comenzar un nuevo tratamiento? Esto creará una nueva caja de medicación.')) {
      onUpdateTreatment({
        name: 'Nueva Medicación',
        totalPills: 28,
        remainingPills: 28,
        takenToday: false,
        schedule: treatment.schedule, // Keep existing schedule
        startDate: new Date().toISOString().split('T')[0]
      })
      setFormData({
        name: 'Nueva Medicación',
        totalPills: 28,
        remainingPills: 28
      })
    }
  }

  const commonTreatments = [
    { name: 'Antibiótico (7 días)', pills: 7 },
    { name: 'Tratamiento semanal', pills: 7 },
    { name: 'Tratamiento quincenal', pills: 14 },
    { name: 'Tratamiento mensual', pills: 28 },
    { name: 'Tratamiento personalizado', pills: 30 }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          ⚙️ Gestión de Tratamiento
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
      </div>

      {/* Current Treatment Info */}
      <div className="mb-6 p-4 bg-primary-50 rounded-lg">
        <h4 className="font-medium text-primary-800 mb-2">Tratamiento Actual</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Nombre:</span>
            <p className="font-medium">{treatment.name}</p>
          </div>
          <div>
            <span className="text-gray-600">Total de pastillas:</span>
            <p className="font-medium">{treatment.totalPills}</p>
          </div>
          <div>
            <span className="text-gray-600">Restantes:</span>
            <p className="font-medium">{treatment.remainingPills}</p>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-gray-600 text-sm">Fecha de inicio:</span>
          <p className="font-medium">{new Date(treatment.startDate).toLocaleDateString('es-ES')}</p>
        </div>
      </div>

      {/* Edit Treatment */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-medium text-gray-700">
            Editar Tratamiento
          </h4>
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            {editMode ? 'Cancelar' : 'Editar'}
          </button>
        </div>

        {editMode && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del tratamiento
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total de pastillas
                </label>
                <input
                  type="number"
                  name="totalPills"
                  value={formData.totalPills}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pastillas restantes
                </label>
                <input
                  type="number"
                  name="remainingPills"
                  value={formData.remainingPills}
                  onChange={handleInputChange}
                  min="0"
                  max={formData.totalPills}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <button
              onClick={saveChanges}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Guardar Cambios
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-700 mb-4">
          Acciones Rápidas
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={resetTreatment}
            className="bg-secondary-500 hover:bg-secondary-600 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-medium"
          >
            🔄 Reiniciar Tratamiento
          </button>
          <button
            onClick={startNewTreatment}
            className="bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-medium"
          >
            ➕ Nueva Caja
          </button>
        </div>
      </div>

      {/* Common Treatments */}
      <div>
        <h4 className="text-lg font-medium text-gray-700 mb-4">
          Tratamientos Comunes
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {commonTreatments.map((preset, index) => (
            <button
              key={index}
              onClick={() => {
                if (window.confirm(`¿Quieres comenzar un ${preset.name}?`)) {
                  onUpdateTreatment({
                    name: preset.name,
                    totalPills: preset.pills,
                    remainingPills: preset.pills,
                    takenToday: false,
                    schedule: treatment.schedule,
                    startDate: new Date().toISOString().split('T')[0]
                  })
                }
              }}
              className="text-left p-3 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors duration-200"
            >
              <div className="font-medium text-gray-800">{preset.name}</div>
              <div className="text-sm text-gray-600">{preset.pills} pastillas</div>
            </button>
          ))}
        </div>
      </div>

      {/* Warning */}
      <div className="mt-6 p-4 bg-red-50 rounded-lg">
        <p className="text-sm text-red-800">
          ⚠️ <strong>Importante:</strong> Siempre consulta con tu médico antes de modificar o interrumpir cualquier tratamiento médico.
        </p>
      </div>
    </div>
  )
}

export default TreatmentManager
