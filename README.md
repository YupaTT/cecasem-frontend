# Frontend - cecasem


## Características

- Visualización de datos en forma de tabla heatmap
- Filtros por departamento y nivel de riesgo
- Interfaz moderna construida con React y Vite
- Comunicación con API backend

## Requisitos Previos

- Node.js 18+ 
- npm o yarn

## Configuración

1. **Clonar el repositorio** (si aplica)

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   
   Copia el archivo `.env` y ajusta la URL del backend si es necesario:
   ```bash
   cp .env .env.example
   ```
   
   El archivo `.env` contiene:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

## Comandos Disponibles

### Desarrollo
```bash
npm run dev
```
Ejecuta la aplicación en modo desarrollo. Abre [http://localhost:5173](http://localhost:5173) para verla en el navegador.

### Construcción para Producción
```bash
npm run build
```
Construye la aplicación para producción en la carpeta `dist`.

