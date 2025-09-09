import React, { useState, useEffect } from 'react'
import PillBlister from './components/PillBlister'
import MedicationSchedule from './components/MedicationSchedule'
import TreatmentManager from './components/TreatmentManager'
import NotificationManager from './components/NotificationManager'
import WelcomeModal from './components/WelcomeModal';
import SetupWizard from './components/SetupWizard';

function App() {
  const [currentTreatment, setCurrentTreatment] = useState(() => {
    const saved = localStorage.getItem('currentTreatment')
    return saved ? JSON.parse(saved) : null
  })

  const [showWelcome, setShowWelcome] = useState(false);
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false)
  const [showTreatmentManager, setShowTreatmentManager] = useState(false)

  // Check first visit on component mount
  useEffect(() => {
    const isFirstVisit = localStorage.getItem('firstVisit') === null;
    const hasNoTreatment = !localStorage.getItem('currentTreatment');
    
    if (isFirstVisit || hasNoTreatment) {
      setShowWelcome(true);
      localStorage.setItem('firstVisit', 'completed');
    }
  }, []);

  // Save to localStorage whenever treatment changes
  useEffect(() => {
    if (currentTreatment) {
      localStorage.setItem('currentTreatment', JSON.stringify(currentTreatment))
    }
  }, [currentTreatment])

  const startSetupWizard = () => {
    setShowWelcome(false);
    setShowSetupWizard(true);
  };

  const completeSetup = (treatmentData) => {
    setCurrentTreatment({
      ...treatmentData,
      remainingPills: treatmentData.totalPills,
      takenToday: false,
      startDate: new Date().toISOString().split('T')[0]
    });
    setShowSetupWizard(false);
  };

  const takeDose = () => {
    if (currentTreatment.remainingPills > 0) {
      setCurrentTreatment(prev => ({
        ...prev,
        remainingPills: prev.remainingPills - 1,
        takenToday: true
      }))
    }
  }

  const updateSchedule = (newSchedule) => {
    setCurrentTreatment(prev => ({
      ...prev,
      schedule: newSchedule
    }))
  }

  const updateTreatment = (newTreatment) => {
    setCurrentTreatment(newTreatment)
  }

  const resetDailyStatus = () => {
    setCurrentTreatment(prev => ({
      ...prev,
      takenToday: false
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {showWelcome && <WelcomeModal onNext={startSetupWizard} />}
      {showSetupWizard && <SetupWizard onComplete={completeSetup} />}
      
      {currentTreatment ? (
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              💊 Recordatorio de Medicación
            </h1>
            <p className="text-gray-600">
              Mantén el control de tu tratamiento de forma sencilla
            </p>
          </header>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            {/* Treatment Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {currentTreatment.name}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowSchedule(!showSchedule)}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    ⏰ Horarios
                  </button>
                  <button
                    onClick={() => setShowTreatmentManager(!showTreatmentManager)}
                    className="bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    ⚙️ Gestionar
                  </button>
                </div>
              </div>

              {/* Pill Counter */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-100 rounded-full mb-4">
                  <span className="text-3xl font-bold text-primary-600">
                    {currentTreatment.remainingPills}
                  </span>
                </div>
                <p className="text-lg text-gray-600">
                  {currentTreatment.remainingPills === 1 ? 'pastilla restante' : 'pastillas restantes'}
                </p>
                {currentTreatment.remainingPills === 0 && (
                  <p className="text-red-500 font-medium mt-2">
                    ⚠️ Tratamiento completado - Considera renovar tu medicación
                  </p>
                )}
              </div>

              {/* Pill Blister Visualization */}
              <PillBlister 
                totalPills={currentTreatment.totalPills}
                remainingPills={currentTreatment.remainingPills}
              />

              {/* Take Dose Button */}
              <div className="text-center mt-6">
                <button
                  onClick={takeDose}
                  disabled={currentTreatment.remainingPills === 0 || currentTreatment.takenToday}
                  className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                    currentTreatment.remainingPills === 0 || currentTreatment.takenToday
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  {currentTreatment.takenToday 
                    ? '✅ Dosis tomada hoy' 
                    : currentTreatment.remainingPills === 0
                      ? '❌ Sin pastillas'
                      : '💊 Tomar dosis'
                  }
                </button>
              </div>
            </div>

            {/* Schedule Manager */}
            {showSchedule && (
              <MedicationSchedule
                schedule={currentTreatment.schedule}
                onUpdateSchedule={updateSchedule}
                onClose={() => setShowSchedule(false)}
              />
            )}

            {/* Treatment Manager */}
            {showTreatmentManager && (
              <TreatmentManager
                treatment={currentTreatment}
                onUpdateTreatment={updateTreatment}
                onClose={() => setShowTreatmentManager(false)}
              />
            )}

            {/* Notification Manager */}
            <NotificationManager 
              schedule={currentTreatment.schedule}
              treatmentName={currentTreatment.name}
              onResetDaily={resetDailyStatus}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-600">Cargando tu tratamiento...</p>
        </div>
      )}
    </div>
  )
}

export default App
