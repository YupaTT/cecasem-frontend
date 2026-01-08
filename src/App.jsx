import React, { useState, useEffect, useCallback } from 'react';
import FilterControls from './components/FilterControls';
import HeatmapTable from './components/HeatmapTable';
import HeatmapMap from './components/HeatmapMap';
import { getHeatmapsWithFilters } from './services/heatmap';

function App() {
  const [heatmapData, setHeatmapData] = useState({ items: [], total: 0, totalPaginas: null });
  const [filters, setFilters] = useState({ departamento: '', riesgo: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('map');

  const fetchData = async (currentFilters = filters) => {
    try {
      setLoading(true);
      setError(null);
      setHeatmapData(await getHeatmapsWithFilters(currentFilters));
    } catch (err) {
      setError('Error al cargar los datos. Asegúrese de que el backend esté funcionando en http://localhost:3000');
      console.error('Error fetching data:', err);
      setHeatmapData({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = useCallback((filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    fetchData(newFilters);
  }, [filters]);

  const handleClearFilters = () => {
    const clearedFilters = { departamento: '', riesgo: '' };
    setFilters(clearedFilters);
    fetchData(clearedFilters);
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">Cargando datos del heatmap...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 font-sans">
      <header className="text-center mb-12 p-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl shadow-xl">
        <h1 className="text-3xl md:text-4xl font-semibold mb-2">🌡️ Sistema de Prevención y Alerta Temprana de Incendios</h1>
        <p className="text-base md:text-lg opacity-90">Visualización de datos de riesgo por ubicación geográfica en Bolivia</p>
      </header>

      <main className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filtros</h2>
          <FilterControls filters={filters} onFilterChange={handleFilterChange} />
          <button onClick={handleClearFilters} className="mt-4 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200">
            Limpiar Filtros
          </button>
        </section>

        {error && (
          <div className="bg-yellow-100 border-2 border-yellow-300 text-orange-600 p-4 rounded-lg">
            <p>⚠️ {error}</p>
          </div>
        )}

        <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
            <h2 className="text-xl font-semibold text-gray-800">Datos del Heatmap</h2>
            <div className="flex space-x-2">
              {[
                { mode: 'map', icon: '🗺️', label: 'Vista Mapa' },
                { mode: 'table', icon: '📊', label: 'Vista Tabla' }
              ].map(({ mode, icon, label }) => (
                <button
                  key={mode}
                  className={`flex items-center space-x-2 px-4 py-2 border-2 rounded-lg transition-all duration-200 ${
                    viewMode === mode
                      ? 'bg-indigo-500 text-white border-indigo-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-500 hover:bg-gray-50'
                  }`}
                  onClick={() => setViewMode(mode)}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
          {viewMode === 'map' ? <HeatmapMap heatmaps={heatmapData.items} /> : <HeatmapTable heatmaps={heatmapData.items} />}
        </section>
      </main>
    </div>
  );
}

export default App;