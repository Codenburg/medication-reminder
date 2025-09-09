# 💊 Medication Reminder App

Una aplicación web moderna para recordar cuándo tomar tu medicación, construida con React, Vite y TailwindCSS.

## ✨ Características

- **Visualización de Blister**: Representación visual de la tableta de pastillas con contador en tiempo real
- **Recordatorios Inteligentes**: Notificaciones del navegador en horarios personalizados
- **Gestión de Tratamientos**: Añadir, editar y reiniciar tratamientos fácilmente
- **Persistencia Local**: Los datos se guardan automáticamente en el navegador
- **Diseño Moderno**: Interfaz limpia y minimalista con TailwindCSS
- **Responsive**: Funciona perfectamente en móviles y escritorio

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador**:
   - La aplicación estará disponible en `http://localhost:5173`

### Comandos disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter de código

## 📱 Cómo usar la aplicación

### 1. Configurar tu tratamiento
- Al abrir la app, verás un tratamiento por defecto de 28 pastillas
- Usa el botón "⚙️ Gestionar" para personalizar tu medicación
- Puedes cambiar el nombre, número de pastillas y usar plantillas predefinidas

### 2. Configurar horarios
- Haz clic en "⏰ Horarios" para añadir recordatorios
- Añade horarios personalizados o usa los presets comunes
- Cada horario puede tener una etiqueta descriptiva (ej: "Desayuno", "Cena")

### 3. Activar notificaciones
- La app te pedirá permiso para enviar notificaciones
- Acepta para recibir recordatorios automáticos
- Puedes probar las notificaciones con el botón "Probar"

### 4. Tomar medicación
- Usa el botón "💊 Tomar dosis" cuando tomes tu medicación
- El contador se actualizará automáticamente
- La visualización del blister mostrará las pastillas tomadas

### 5. Gestionar tratamientos
- **Reiniciar**: Restablece el contador a la cantidad original
- **Nueva caja**: Comienza un tratamiento completamente nuevo
- **Editar**: Modifica detalles del tratamiento actual

## 🎨 Características del diseño

- **Colores suaves**: Paleta de azules y verdes para una experiencia relajante
- **Tipografía clara**: Fuentes legibles y bien espaciadas
- **Botones redondeados**: Diseño moderno y amigable
- **Animaciones sutiles**: Transiciones suaves para mejor UX
- **Iconos intuitivos**: Emojis y símbolos claros para cada función

## 🔧 Tecnologías utilizadas

- **React 18**: Framework de JavaScript para la interfaz
- **Vite**: Herramienta de build rápida y moderna
- **TailwindCSS**: Framework de CSS utilitario
- **Notifications API**: API nativa del navegador para notificaciones
- **LocalStorage**: Persistencia de datos en el navegador

## 📊 Estructura del proyecto

```
src/
├── components/
│   ├── PillBlister.jsx          # Visualización del blister
│   ├── MedicationSchedule.jsx   # Gestión de horarios
│   ├── TreatmentManager.jsx     # Gestión de tratamientos
│   └── NotificationManager.jsx  # Sistema de notificaciones
├── App.jsx                      # Componente principal
├── main.jsx                     # Punto de entrada
└── index.css                    # Estilos globales
```

## 🔒 Privacidad y seguridad

- **Datos locales**: Toda la información se almacena únicamente en tu navegador
- **Sin servidor**: No se envían datos a servidores externos
- **Sin registro**: No requiere cuentas ni información personal
- **Offline**: Funciona sin conexión a internet (excepto notificaciones)

## ⚠️ Importante

Esta aplicación es una herramienta de recordatorio y **NO sustituye el consejo médico profesional**. Siempre consulta con tu médico sobre tu tratamiento y medicación.

## 🤝 Contribuir

Si encuentras algún problema o tienes sugerencias de mejora, no dudes en reportarlo.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**¡Mantén tu salud al día con recordatorios inteligentes! 💊✨**
