import React from 'react';

const HeatmapTable = ({ heatmaps = [] }) => {
  const tableHeaders = [
    'ID',
    'Departamento',
    'Latitud',
    'Longitud',
    'Riesgo',
    'Fecha'
  ];

  const cellStyles = "px-4 py-3 text-center text-sm";

  const formatCoordinate = (value) => {
    const num = Number(value);
    return isNaN(num) ? value : num.toFixed(4);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('es-ES');
    } catch (error) {
      return dateString;
    }
  };

  if (heatmaps.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg">No se encontraron datos.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse mt-4">
        <thead>
          <tr className="bg-gray-50">
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left border-b border-gray-200 text-gray-700 font-semibold text-sm uppercase tracking-wide"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {heatmaps.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100"
            >
              <td className={cellStyles}>{item.id}</td>
              <td className={cellStyles}>{item.departamento}</td>
              <td className={cellStyles}>{formatCoordinate(item.latitud)}</td>
              <td className={cellStyles}>{formatCoordinate(item.longitud)}</td>
              <td className={cellStyles}>{item.riesgo}</td>
              <td className={cellStyles}>{formatDate(item.fecha)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HeatmapTable;
