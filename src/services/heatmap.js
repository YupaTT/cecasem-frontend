const API_URL = `${import.meta.env.VITE_API_URL}/heatmaps`;

export const getAllHeatmaps = async (params = {}) => {
  const url = new URL(API_URL);
  
  Object.keys(params).forEach(key => {
    if (params[key]) {
      url.searchParams.append(key, params[key]);
    }
  });

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error al obtener los datos del heatmap');
  }
  
  const data = await response.json();
  return data; 
};


export const getHeatmapsWithFilters = async (filters = {}) => {
  const params = {};
  
  if (filters.departamento) params.departamento = filters.departamento;
  if (filters.riesgo) params.riesgo = filters.riesgo;
  if (filters.limite) params.limite = filters.limite;
  if (filters.pagina) params.pagina = filters.pagina;
  
  return await getAllHeatmaps(params);
};
