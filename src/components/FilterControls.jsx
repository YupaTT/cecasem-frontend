import React from 'react';

const DEPARTAMENTOS = [
  "La Paz", 
  "Santa Cruz", 
  "Cochabamba", 
  "Potosí", 
  "Chuquisaca", 
  "Oruro", 
  "Tarija", 
  "Beni", 
  "Pando"
];
const RIESGOS = ["Bajo", "Medio", "Alto"];

const FilterControls = ({ filters, onFilterChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-wrap">
      <select 
        name="departamento" 
        value={filters.departamento} 
        onChange={handleInputChange}
        className="px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-gray-700 min-w-0 md:min-w-52 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200"
      >
        <option value="">Todos los departamentos</option>
        {DEPARTAMENTOS.map(dep => (
          <option key={dep} value={dep}>{dep}</option>
        ))}
      </select>
      <select 
        name="riesgo" 
        value={filters.riesgo} 
        onChange={handleInputChange}
        className="px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-gray-700 min-w-0 md:min-w-52 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200"
      >
        <option value="">Todos los riesgos</option>
        {RIESGOS.map(riesgo => (
          <option key={riesgo} value={riesgo}>{riesgo}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterControls;
