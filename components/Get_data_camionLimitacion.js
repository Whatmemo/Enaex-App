import axios from 'axios';

const fetchDataForCamion = async (nombreCamion) => {
  try {
    // Realizar la solicitud a la API para obtener las limitaciones
    const limitacionesResponse = await axios.get('http://40.65.224.42/api/limitacion/info?key=CX92wBe9wV2NLUMyFE6PzvcyqTWyBPr5');
    const limitaciones = limitacionesResponse.data;

    // Realizar la solicitud a la API para obtener la información de los camiones
    const camionesResponse = await axios.get('http://40.65.224.42/api/camion/all?key=CX92wBe9wV2NLUMyFE6PzvcyqTWyBPr5');
    const camiones = camionesResponse.data.items;

    // Filtrar las limitaciones para el camión específico
    const limitacionesDelCamion = limitaciones.filter(limitacion => {
      const camion = camiones.find(camion => camion.id === limitacion.id_camion);
      return camion && camion.nombre_camion === nombreCamion;
    });

    // Obtener las descripciones del camión
    const descripciones = limitacionesDelCamion.map(limitacion => ({
      descripcion: limitacion.descripcion,
      fecha_inicio: limitacion.fecha_inicio,
      fecha_termino: limitacion.fecha_termino,
    }));

    return descripciones;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    return null;
  }
};

const fetchAllCamionNames = async () => {
    try {
      const response = await axios.get('http://40.65.224.42/api/camion/all?key=CX92wBe9wV2NLUMyFE6PzvcyqTWyBPr5');
      const camiones = response.data.items;
      const nombresCamiones = camiones.map(camion => camion.nombre_camion);
      return nombresCamiones;
    } catch (error) {
      console.error(`Error fetching camion names: ${error.message}`);
      return [];
    }
  };

  const obtenerInformacionCamiones = async () => {
    try {
      const limitacionesResponse = await axios.get('http://40.65.224.42/api/limitacion/info?key=CX92wBe9wV2NLUMyFE6PzvcyqTWyBPr5');
      const limitaciones = limitacionesResponse.data;
  
      const camionesResponse = await axios.get('http://40.65.224.42/api/camion/all?key=CX92wBe9wV2NLUMyFE6PzvcyqTWyBPr5');
      const camiones = camionesResponse.data.items;
  
      // Filtrar las limitaciones con fecha_termino nulo
      const informacionCamiones = limitaciones
        .filter(limitacion => limitacion.fecha_termino === null)
        .map(limitacion => {
          const camion = camiones.find(cam => cam.id === limitacion.id_camion);
          return {
            descripcion: limitacion.descripcion,
            fecha_inicio: limitacion.fecha_inicio,
            fecha_termino: limitacion.fecha_termino,
            nombre_camion: camion ? camion.nombre_camion : 'Camión no encontrado',
          };
        });
  
      return informacionCamiones;
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
      return null;
    }
  };
  
  
  const dataCamion = {
    fetchDataForCamion,
    fetchAllCamionNames,
    obtenerInformacionCamiones,
  };
  
  export default dataCamion;