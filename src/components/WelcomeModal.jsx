import React from 'react';

const WelcomeModal = ({ onNext }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            💊
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Bienvenido a tu Recordatorio de Medicación!</h2>
          <p className="text-gray-600 mb-6">
            Esta aplicación te ayudará a llevar un control sencillo de tu tratamiento médico, con recordatorios personalizados y seguimiento de tus dosis.
          </p>
          
          <div className="space-y-3 text-left mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
                  <span className="text-white text-xs">1</span>
                </div>
              </div>
              <p className="ml-3 text-gray-700">Configura tu medicación y horarios</p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
                  <span className="text-white text-xs">2</span>
                </div>
              </div>
              <p className="ml-3 text-gray-700">Recibe notificaciones cuando sea hora de tomar tu medicación</p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
                  <span className="text-white text-xs">3</span>
                </div>
              </div>
              <p className="ml-3 text-gray-700">Registra tus dosis tomadas y lleva un control visual</p>
            </div>
          </div>
          
          <button
            onClick={onNext}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Comenzar Configuración
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
