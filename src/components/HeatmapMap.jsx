import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapBounds = ({ data }) => {
  const map = useMap();
  useEffect(() => {
    if (data?.length > 0) {
      map.fitBounds(data.map(item => [+item.latitud, +item.longitud]), { padding: [20, 20] });
    }
  }, [data, map]);
  return null;
};

const HeatmapMap = ({ heatmaps = [] }) => {
  const riskConfig = {
    bajo: { color: '#198754', radius: 12 },
    medio: { color: '#fd7e14', radius: 16 },
    alto: { color: '#dc2626', radius: 20 },
    default: { color: '#495057', radius: 14 }
  };

  const getRiskData = (riesgo) => riskConfig[riesgo?.toLowerCase()] || riskConfig.default;
  const formatCoord = (val) => (+val).toFixed(4);
  const formatDate = (date) => new Date(date).toLocaleDateString('es-ES');

  if (!heatmaps.length) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="h-96 flex flex-col justify-center items-center bg-gray-50 text-gray-500 text-center">
          <p className="text-lg mb-2">🗺️ No hay datos para mostrar en el mapa</p>
          <p className="text-base">Selecciona diferentes filtros para ver los datos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h4 className="text-base font-semibold text-gray-800 mb-3">Mapa</h4>
        <div className="flex flex-wrap items-center gap-6">
          {Object.entries(riskConfig).slice(0, 3).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 shadow-md" style={{ backgroundColor: config.color }} />
              <span className="text-sm text-gray-700">Riesgo {key.charAt(0).toUpperCase() + key.slice(1)}</span>
            </div>
          ))}
        </div>
      </div>

      <MapContainer center={[-16.5, -64.0]} zoom={6} className="h-96 md:h-[500px] w-full z-10" scrollWheelZoom={true}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapBounds data={heatmaps} />
        {heatmaps.map(item => {
          const risk = getRiskData(item.riesgo);
          return (
            <CircleMarker
              key={item.id}
              center={[+item.latitud, +item.longitud]}
              radius={risk.radius}
              fillColor={risk.color}
              color="#fcfcfcff"
              weight={3}
              opacity={1}
              fillOpacity={0.9}
            >
              <Popup>
                <div className="popup-content min-w-52">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">📍 {item.departamento}</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong className="text-gray-700">ID:</strong> <span className="text-gray-600">{item.id}</span></p>
                    <p><strong className="text-gray-700">Coordenadas:</strong><br/>
                      <span className="font-mono text-gray-600">Lat: {formatCoord(item.latitud)}</span><br/>
                      <span className="font-mono text-gray-600">Lng: {formatCoord(item.longitud)}</span>
                    </p>
                    <p><strong className="text-gray-700">Nivel de Riesgo:</strong> <span className={`ml-2 risk-badge ${risk.class}`}>{item.riesgo}</span></p>
                    <p><strong className="text-gray-700">Fecha:</strong> <span className="text-gray-600">{formatDate(item.fecha)}</span></p>
                    <p><strong className="text-gray-700">Registrado:</strong> <span className="text-gray-600">{formatDate(item.createdAt)}</span></p>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default HeatmapMap;
