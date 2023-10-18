// apiData.js
import axios from 'axios';

// Función para obtener y procesar los datos de las APIs
export async function fetchApiData() {
  const apiUrl1 = 'http://40.65.224.42/api/dashboard/estado/27/3?key=CX92wBe9wV2NLUMyFE6PzvcyqTWyBPr5';
  const apiUrl2 = 'http://40.65.224.42/api/dashboard/estado/27/4?key=CX92wBe9wV2NLUMyFE6PzvcyqTWyBPr5';
  const apiUrl3 = 'http://40.65.224.42/api/dashboard/estado/27/5?key=CX92wBe9wV2NLUMyFE6PzvcyqTWyBPr5';
  const apiUrl4 = 'http://40.65.224.42/api/dashboard/estado/27/6?key=CX92wBe9wV2NLUMyFE6PzvcyqTWyBPr5';

  try {
    const [response1, response2, response3, response4] = await Promise.all([
      axios.get(apiUrl1),
      axios.get(apiUrl2),
      axios.get(apiUrl3),
      axios.get(apiUrl4),
    ]);

    // Combina los datos de las cuatro respuestas en una sola lista
    const combinedData = [
      ...response1.data,
      ...response2.data,
      ...response3.data,
      ...response4.data,
    ];

    // Filtra y procesa los datos que necesitas
    const processedData = combinedData.map((item) => ({
      nombre_faena: item.nombre_faena,
      nombre: item.nombre,
      rev_fecha_expiracion: item.rev_fecha_expiracion,
      ser_fecha_expiracion: item.ser_fecha_expiracion,
      dgmn_fecha_expiracion: item.dgmn_fecha_expiracion,
      template_fecha_termino: item.template_fecha_termino,
      template_fecha_inicio: item.template_fecha_inicio,
      horas_ult: item.horas_ult,
      prox_mantencion: item.prox_mantencion,
    }));

    return processedData;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return [];
  }
}

// Función para calcular la diferencia en días entre una fecha y la fecha actual
export function calcularDiferenciaDias(dateString) {
  if (!dateString) {
    return false;
  }

  const currentDate = new Date();
  const expirationDate = new Date(dateString.replace(' 00:00:00', '')); // Quita la hora
  const timeDifference = expirationDate.getTime() - currentDate.getTime();
  const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Calcula la diferencia en días

  return dayDifference;
}


export function obtenerFecha(dateString) {
  if (!dateString) {
    return false;
  }

  const fechaHoraArray = dateString.split(' ');
  return fechaHoraArray[0]; 
}

export function nombre_camiones(processedData) {
  return processedData.map(item => item.nombre);
}
