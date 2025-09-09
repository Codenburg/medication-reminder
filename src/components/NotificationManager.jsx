import React, { useEffect, useState } from 'react'

const NotificationManager = ({ schedule, treatmentName, onResetDaily }) => {
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission)
  const [activeReminders, setActiveReminders] = useState([])

  // Verificar si el navegador soporta notificaciones
  const isNotificationSupported = () => {
    return "Notification" in window;
  };

  useEffect(() => {
    if (!isNotificationSupported()) return;
    
    // Check notification permission on mount
    setNotificationPermission(Notification.permission)
  }, [])

  useEffect(() => {
    if (!isNotificationSupported()) return;
    
    // Clear existing timeouts
    activeReminders.forEach(timeout => clearTimeout(timeout))
    setActiveReminders([])

    if (schedule.length === 0 || notificationPermission !== 'granted') {
      return
    }

    // Set up new reminders
    const newReminders = []
    
    schedule.forEach(scheduleItem => {
      const [hours, minutes] = scheduleItem.time.split(':').map(Number)
      
      // Calculate next occurrence of this time
      const now = new Date()
      const scheduledTime = new Date()
      scheduledTime.setHours(hours, minutes, 0, 0)
      
      // If the time has passed today, schedule for tomorrow
      if (scheduledTime <= now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1)
      }
      
      const timeUntilNotification = scheduledTime.getTime() - now.getTime()
      
      if (timeUntilNotification > 0) {
        const timeoutId = setTimeout(() => {
          showNotification(scheduleItem)
          // Reset daily status at first notification of the day
          if (scheduleItem === schedule[0]) {
            onResetDaily()
          }
        }, timeUntilNotification)
        
        newReminders.push(timeoutId)
      }
    })
    
    setActiveReminders(newReminders)

    // Cleanup function
    return () => {
      newReminders.forEach(timeout => clearTimeout(timeout))
    }
  }, [schedule, notificationPermission, treatmentName])

  const requestNotificationPermission = async () => {
    if (!isNotificationSupported()) {
      alert("¡Tu navegador no soporta notificaciones!");
      return;
    }
    
    try {
      const permission = await Notification.requestPermission()
      setNotificationPermission(permission)
      
      if (permission === 'granted') {
        // Show a test notification
        showNotification({
          id: 'test',
          label: 'Prueba',
          time: new Date().toTimeString().slice(0, 5)
        })
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error)
      alert("Error al solicitar permisos para notificaciones");
    }
  }

  const showNotification = (scheduleItem) => {
    if (notificationPermission === 'granted') {
      try {
        const notification = new Notification(`💊 Hora de tu medicación`, {
          body: `Es hora de tomar tu ${treatmentName} - ${scheduleItem.label}`,
          icon: '💊',
          tag: `medication-${scheduleItem.id}`,
        });

        // Handle notification click
        notification.onclick = () => {
          window.focus()
          notification.close()
        };

        // Auto-close after 30 seconds if not interacted with
        setTimeout(() => {
          notification.close()
        }, 30000);
      } catch (error) {
        console.error("Error al mostrar notificación:", error);
        alert("Error al mostrar notificación. Asegúrate de que tu navegador soporta notificaciones.");
      }
    }
  }

  const testNotification = () => {
    if (notificationPermission === 'granted') {
      showNotification({
        id: 'test',
        label: 'Prueba',
        time: new Date().toTimeString().slice(0, 5)
      })
    } else {
      requestNotificationPermission();
    }
  }

  const getNextReminder = () => {
    if (schedule.length === 0) return null
    
    const now = new Date()
    const today = now.toDateString()
    
    // Find next scheduled time today
    for (const item of schedule) {
      const [hours, minutes] = item.time.split(':').map(Number)
      const scheduledTime = new Date()
      scheduledTime.setHours(hours, minutes, 0, 0)
      
      if (scheduledTime > now && scheduledTime.toDateString() === today) {
        return {
          ...item,
          scheduledTime
        }
      }
    }
    
    // If no more times today, get first time tomorrow
    if (schedule.length > 0) {
      const firstItem = schedule[0]
      const [hours, minutes] = firstItem.time.split(':').map(Number)
      const scheduledTime = new Date()
      scheduledTime.setDate(scheduledTime.getDate() + 1)
      scheduledTime.setHours(hours, minutes, 0, 0)
      
      return {
        ...firstItem,
        scheduledTime
      }
    }
    
    return null
  }

  const nextReminder = getNextReminder()

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        🔔 Notificaciones
      </h3>

      {/* Notification Permission Status */}
      <div className="mb-6">
        {notificationPermission === 'default' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-yellow-800">
                  Activar Notificaciones
                </h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Permite las notificaciones para recibir recordatorios automáticos.
                </p>
              </div>
              <button
                onClick={requestNotificationPermission}
                className="notification-permission-btn ml-4"
              >
                Activar
              </button>
            </div>
          </div>
        )}

        {notificationPermission === 'denied' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-medium text-red-800">
              Notificaciones Bloqueadas
            </h4>
            <p className="text-sm text-red-700 mt-1">
              Las notificaciones están bloqueadas. Puedes activarlas en la configuración de tu navegador.
            </p>
          </div>
        )}

        {notificationPermission === 'granted' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-green-800">
                  ✅ Notificaciones Activas
                </h4>
                <p className="text-sm text-green-700 mt-1">
                  Recibirás recordatorios automáticos según tu horario.
                </p>
              </div>
              <button
                onClick={testNotification}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Probar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Next Reminder Info */}
      {nextReminder && notificationPermission === 'granted' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">
            Próximo Recordatorio
          </h4>
          <div className="text-sm text-blue-700">
            <p>
              <strong>{nextReminder.label}</strong> - {' '}
              {nextReminder.scheduledTime.toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
            <p className="text-xs mt-1">
              {nextReminder.scheduledTime.toLocaleDateString('es-ES', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      )}

      {/* Schedule Summary */}
      {schedule.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium text-gray-700 mb-3">
            Horarios Configurados
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {schedule.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 rounded-lg p-2 text-center"
              >
                <div className="font-medium text-gray-800">
                  {new Date(`2000-01-01T${item.time}`).toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div className="text-xs text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {schedule.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No hay horarios configurados.</p>
          <p className="text-sm mt-1">
            Configura tus horarios de medicación para recibir recordatorios automáticos.
          </p>
        </div>
      )}
    </div>
  )
}

export default NotificationManager
