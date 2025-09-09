import React, { useState } from 'react';

const SetupWizard = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [treatmentData, setTreatmentData] = useState({
    name: '',
    totalPills: 28,
    schedule: []
  });
  const [customTime, setCustomTime] = useState('');
  const [validationError, setValidationError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTreatmentData(prev => ({
      ...prev,
      [name]: name === 'totalPills' ? parseInt(value) || 0 : value
    }));
    
    // Clear validation error when user starts typing
    if (name === 'name' && validationError) {
      setValidationError('');
    }
  };

  const addScheduleTime = (time, label) => {
    setTreatmentData(prev => ({
      ...prev,
      schedule: [...prev.schedule, { time, label, id: Date.now() }]
    }));
  };
  
  const removeScheduleTime = (id) => {
    setTreatmentData(prev => ({
      ...prev,
      schedule: prev.schedule.filter(item => item.id !== id)
    }));
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Nombre de tu Medicación</h3>
            <p className="text-gray-600">
              ¿Cómo se llama el medicamento que estás tomando?
            </p>
            <input
              type="text"
              name="name"
              value={treatmentData.name}
              onChange={handleChange}
              placeholder="Ej: Paracetamol, Metformina, etc."
              className={`w-full px-4 py-3 border ${
                validationError ? 'border-pink-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
              required
            />
            {validationError && (
              <p className="text-pink-600 text-sm mt-1">{validationError}</p>
            )}
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Cantidad de Pastillas</h3>
            <p className="text-gray-600">
              ¿Cuántas pastillas contiene tu tratamiento completo?
            </p>
            <input
              type="number"
              name="totalPills"
              value={treatmentData.totalPills}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Horarios de Toma</h3>
            <p className="text-gray-600">
              Configura los horarios en que debes tomar tu medicación
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['08:00', '12:00', '18:00', '22:00'].map(time => (
                <button
                  key={time}
                  onClick={() => addScheduleTime(time, 'Dosis')}
                  className="p-4 bg-pink-50 border border-pink-200 rounded-lg hover:bg-pink-100 transition-colors duration-200"
                >
                  <span className="font-medium text-pink-600">
                    {new Date(`2000-01-01T${time}`).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </button>
              ))}
            </div>
            
            <div className="flex items-center mt-4">
              <input
                type="time"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <button 
                onClick={() => {
                  if (customTime) {
                    addScheduleTime(customTime, 'Dosis personalizada');
                    setCustomTime('');
                  }
                }}
                className="ml-2 px-4 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors duration-200"
              >
                Añadir
              </button>
            </div>
            
            {treatmentData.schedule.length > 0 && (
              <div className="mt-4 p-3 bg-pink-50 rounded-lg">
                <p className="font-medium text-pink-700 mb-2">Horarios configurados:</p>
                <ul className="list-disc pl-5">
                  {treatmentData.schedule.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {new Date(`2000-01-01T${item.time}`).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} - {item.label}
                      <button 
                        onClick={() => removeScheduleTime(item.id)}
                        className="ml-2 text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">¡Configuración Completa!</h3>
            <p className="text-gray-600">
              Estás listo para comenzar a usar tu recordatorio de medicación.
            </p>
            <div className="bg-pink-50 p-4 rounded-lg">
              <p><span className="font-medium">Medicación:</span> {treatmentData.name}</p>
              <p><span className="font-medium">Pastillas totales:</span> {treatmentData.totalPills}</p>
              <p className="font-medium mt-2">Horarios:</p>
              <ul className="list-disc pl-5 mt-1">
                {treatmentData.schedule.map((item, index) => (
                  <li key={index}>
                    {new Date(`2000-01-01T${item.time}`).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} - {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-pink-600">Paso {step} de 4</span>
            <span className="text-sm text-gray-500">{step * 25}% completado</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-pink-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${step * 25}%` }}
            ></div>
          </div>
        </div>
        
        <div className="py-4">
          {renderStep()}
        </div>
        
        <div className="flex justify-between mt-4">
          <button
            onClick={() => step > 1 && setStep(step - 1)}
            disabled={step === 1}
            className={`px-4 py-2 rounded-lg ${step === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-pink-600 hover:bg-pink-50'}`}
          >
            Atrás
          </button>
          
          <button
            onClick={() => {
              if (step === 1 && treatmentData.name.trim() === '') {
                setValidationError('Por favor ingresa el nombre de tu medicación');
                return;
              }
              
              if (step < 4) {
                setStep(step + 1);
              } else {
                onComplete(treatmentData);
              }
            }}
            disabled={step === 1 && treatmentData.name.trim() === ''}
            className={`px-4 py-2 bg-pink-500 text-white rounded-lg transition-colors duration-200 ${
              step === 1 && treatmentData.name.trim() === '' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-600'
            }`}
          >
            {step === 4 ? 'Comenzar' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupWizard;
