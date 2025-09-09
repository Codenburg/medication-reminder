import React, { useState } from 'react'

const MedicationSchedule = ({ schedule, onUpdateSchedule, onClose }) => {
  const [newTime, setNewTime] = useState('')
  const [newLabel, setNewLabel] = useState('')

  const addScheduleTime = () => {
    if (newTime && newLabel) {
      const newSchedule = [...schedule, { time: newTime, label: newLabel, id: Date.now() }]
      onUpdateSchedule(newSchedule)
      setNewTime('')
      setNewLabel('')
    }
  }

  const removeScheduleTime = (id) => {
    const updatedSchedule = schedule.filter(item => item.id !== id)
    onUpdateSchedule(updatedSchedule)
  }

  const getTimeLabel = (time) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${displayHour}:${minutes} ${period}`
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          ⏰ Horarios de Medicación
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
      </div>

      {/* Current Schedule */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-700 mb-3">
          Horarios Configurados
        </h4>
        {schedule.length === 0 ? (
          <p className="text-gray-500 italic">
            No hay horarios configurados. Añade tu primer recordatorio abajo.
          </p>
        ) : (
          <div className="space-y-2">
            {schedule.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-primary-50 rounded-lg p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="font-medium text-primary-800">
                    {getTimeLabel(item.time)}
                  </span>
                  <span className="text-gray-600">- {item.label}</span>
                </div>
                <button
                  onClick={() => removeScheduleTime(item.id)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add New Schedule */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-medium text-gray-700 mb-3">
          Añadir Nuevo Horario
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hora
            </label>
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Etiqueta
            </label>
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="ej: Desayuno, Almuerzo, Cena"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={addScheduleTime}
              disabled={!newTime || !newLabel}
              className={`w-full px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                newTime && newLabel
                  ? 'bg-primary-500 hover:bg-primary-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Añadir
            </button>
          </div>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="mt-6 pt-6 border-t">
        <h4 className="text-lg font-medium text-gray-700 mb-3">
          Horarios Comunes
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { time: '08:00', label: 'Desayuno' },
            { time: '12:00', label: 'Almuerzo' },
            { time: '18:00', label: 'Cena' },
            { time: '22:00', label: 'Antes de dormir' }
          ].map((preset) => (
            <button
              key={preset.time}
              onClick={() => {
                setNewTime(preset.time)
                setNewLabel(preset.label)
              }}
              className="px-3 py-2 text-sm bg-secondary-100 hover:bg-secondary-200 rounded-lg transition-colors duration-200"
            >
              {getTimeLabel(preset.time)}
              <br />
              <span className="text-xs text-gray-600">{preset.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
        <p className="text-sm text-secondary-800">
          💡 <strong>Consejo:</strong> Los recordatorios funcionan mejor cuando permites las notificaciones del navegador. 
          Asegúrate de activarlas cuando te lo solicite el sistema.
        </p>
      </div>
    </div>
  )
}

export default MedicationSchedule
