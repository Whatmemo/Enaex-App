import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import Grafico from './Grafico'
import Alertas from './Alertas'
import { AppBar } from '@react-native-material/core';


export default function App() {
  const [faenaData, setFaenaData] = useState([]);
  const [selectedFaena, setSelectedFaena] = useState(null);
  const [selectedFaenaData, setSelectedFaenaData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    // URLs de las 4 APIs distintas
    const apiUrl1 = 'http://40.65.224.42/api/dashboard/estado/27/3?key=CX92wBe9wV2NLUMyFE6PzvcyqTWyBPr5';
    const apiUrl2 = 'http://40.65.224.42/api/dashboard/estado/27/4?key=CX92wBe9wV2NLUMyFE6PzvcyqTWyBPr5';
    const apiUrl3 = 'http://40.65.224.42/api/dashboard/estado/27/5?key=CX92wBe9wV2NLUMyFE6PzvcyqTWyBPr5';
    const apiUrl4 = 'http://40.65.224.42/api/dashboard/estado/27/6?key=CX92wBe9wV2NLUMyFE6PzvcyqTWyBPr5';

    // Función para obtener y procesar los datos de una API
    const fetchData = async (apiUrl) => {
      try {
        const response = await axios.get(apiUrl);
        return response.data;
      } catch (error) {
        console.error(`Error: ${error.message}`);
        return [];
      }
    };

    // Obtener y combinar los datos de las 4 APIs
    Promise.all([fetchData(apiUrl1), fetchData(apiUrl2), fetchData(apiUrl3), fetchData(apiUrl4)])
      .then((results) => {
        // Combina los arreglos de datos de las 4 APIs en uno solo
        const combined = [].concat(...results);

        // Agrupa los datos por nombre de faena y almacena los equipos
        const groupedData = combined.reduce((acc, item) => {
          const faenaName = item.nombre_faena;
          if (!acc[faenaName]) {
            acc[faenaName] = { data: [], count0: 0, count1: 0, equipos: [] };
          }
          acc[faenaName].data.push({
            es_template: item.es_template,
            estado_template: item.estado_template,
            equipo: item.nombre
          });
          acc[faenaName].count0 += item.es_template === 0 ? 1 : 0;
          acc[faenaName].count1 += item.es_template === 1 ? 1 : 0;
          acc[faenaName].equipos.push(item.nombre); // Agrega el nombre del equipo
          return acc;
        }, {});

        // Convierte los grupos en un arreglo
        const faenaArray = Object.entries(groupedData).map(([faenaName, faena]) => ({
          nombre_faena: faenaName,
          data: faena.data,
          count0: faena.count0,
          count1: faena.count1,
          equipos: faena.equipos,
        }));
        console.log('Faena Array:', faenaArray);

        // Establece el estado con los datos agrupados
        setFaenaData(faenaArray);
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
      });
  }, []);

  const handleFaenaSelect = (faenaName) => {
    setSelectedFaena(faenaName);
    if (faenaName) {
      const selectedFaenaData = faenaData.find((faena) => faena.nombre_faena === faenaName);
      setSelectedFaenaData(selectedFaenaData);
    }
  };
  const obtenerValorUnosPorFaena = (faenaName, ceros) => {
    const Mapa = {
      Andina: 4,
      Antucoya: 3,
      Centinela: 12,
      'Cerro Negro Norte': 2,
      Chuquicamata: 4,
      Collahuasi: 8,
      'El Romeral': 2,
      'El Soldado': 4,
      'Gabriela Mistral': 4,
      'Lomas Bayas': 4,
      'Los Bronces': 7,
      'Los Colorados': 5,
      'Los Pelambres': 7,
      'Manto Verde': 5,
      'Mantos Blancos': 4,
      Michilla: 2,
      Pleito: 2,
      'Radomiro Tomic': 6,
      'Rajo Inca': 4,
      'Salares Norte': 2,
      'Sierra Gorda': 6,
      Zaldivar: 4
    };
  
    // Realizar la resta y asegurarse de que el resultado no sea menor que 0
    const resultadoResta = Math.max((Mapa[faenaName] || 0) - ceros, 0);
  
    return resultadoResta;
  };

  return (
    <View style={styles.container}>
      <Text>Lista de Faenas:</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedFaena}
        onValueChange={(itemValue) => {
          handleFaenaSelect(itemValue);
        }}
      >
        <Picker.Item label="Seleccionar Faena" value="null" />
        {faenaData.map((faena, index) => (
          <Picker.Item key={index} label={faena.nombre_faena} value={faena.nombre_faena} />
        ))}
      </Picker>
      {selectedFaenaData && (
        <View style={styles.graficoContainer}>
          <Grafico
            titulo={`${selectedFaena}`}
            ceros={`${selectedFaenaData.count0}`}
            unos={obtenerValorUnosPorFaena(selectedFaena, selectedFaenaData.count0)}
          />
          <View style={styles.row}>

            <Text style={styles.text}>Equipos por contrato: {obtenerValorUnosPorFaena(selectedFaena, 0)}</Text>
            <Text style={styles.text}>Equipos operativos: {selectedFaenaData.count0}</Text>
            <Text style={styles.text}>Equipos fuera de servicio: {selectedFaenaData.count1}</Text>
          </View>
          <View style={styles.camionesContainer}>
            <Text>Equipos Operativos:</Text>
            {selectedFaenaData.equipos
              .filter((equipo) => {
                const equipoData = selectedFaenaData.data.find((data) => data.equipo === equipo);
                return equipoData && equipoData.es_template === 0;
              })
              .map((equipo, index) => {
                const equipoData = selectedFaenaData.data.find((data) => data.equipo === equipo);
                const esTemplate1 = equipoData && equipoData.es_template === 1;

                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.template0Button]}
                    onPress={() => {
                      navigation.navigate('Alertas', { equipo, faena: selectedFaena });
                    }}
                  >
                    <Text style={styles.equipoButtonText}>{equipo}</Text>
                  </TouchableOpacity>
                );
              })}

            <Text>Equipos Fuera de Servicio:</Text>
            {selectedFaenaData.equipos
              .filter((equipo) => {
                const equipoData = selectedFaenaData.data.find((data) => data.equipo === equipo);
                return equipoData && equipoData.es_template === 1;
              })
              .map((equipo, index) => {
                const equipoData = selectedFaenaData.data.find((data) => data.equipo === equipo);
                const esTemplate1 = equipoData && equipoData.es_template === 1;

                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.template1Button]}
                    onPress={() => {
                      navigation.navigate('Alertas', { equipo, faena: selectedFaena });
                    }}
                  >
                    <Text style={styles.equipoButtonText}>{equipo}</Text>
                  </TouchableOpacity>
                );
              })}
          </View>


        </View>
      )}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  picker: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  graficoContainer: {
    backgroundColor: '#25292e',
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
  },
  row: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  text: {
    color: 'white',
    fontFamily: 'Rubik-Regular',
    fontSize: 18,
  },
  camionesContainer: {
    marginTop: 16,
    backgroundColor: 'white', // Cambia el color de fondo de la lista de equipos
    padding: 16,
    borderRadius: 10, // Agrega bordes redondeados si lo deseas
  },
  equipoButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  template1Button: {
    backgroundColor: '#ff6961', 
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  template0Button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  equipoButtonText: {
    fontWeight: 'bold', 
  },
});