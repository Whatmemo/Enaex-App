import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import Pruebas2 from './pruebas2';
import dataCamion from './Get_data_camionLimitacion';
import { Table, Row } from 'react-native-table-component';
import { fetchApiData, nombre_camiones } from './apiData';

const Alertas = ({ route }) => {
  const { equipo: initialEquipo = '' } = route.params || {};
  const [limitaciones, setLimitaciones] = useState([]);
  const [selectedCamion, setSelectedCamion] = useState(initialEquipo);
  const [nombresCamiones, setNombresCamiones] = useState([]);

  useEffect(() => {
    const obtenerDataCamion = async (nombreCamion) => {
      const dataCamionResponse = await dataCamion.fetchDataForCamion(nombreCamion);
      setLimitaciones(dataCamionResponse || []);
    };

    if (selectedCamion) {
      obtenerDataCamion(selectedCamion);
    }

    const fetchData = async () => {
      const processedData = await fetchApiData();

      if (processedData.length > 0) {
        const nombres = nombre_camiones(processedData); // Usamos la función nombre_camiones
        setNombresCamiones(nombres);
      }
    };

    fetchData();
  }, [selectedCamion]);


  const tableHead = ['Descripción', 'Fecha Inicio', 'Fecha Termino'];

  const tableData = limitaciones.map((limitacion, index) => [
    limitacion.descripcion,
    limitacion.fecha_inicio,
    limitacion.fecha_termino,
  ]);

  const handlePickerChange = (nombreCamion) => {
    setSelectedCamion(nombreCamion);
    route.params?.equipo && route.params.equipo !== nombreCamion && route.params.setEquipo(nombreCamion);
  };

  const tableDataConFechaTermino = tableData.filter(row => row[2] !== null);
  const tableDataSinFechaTermino = tableData.filter(row => row[2] === null);

  return (
    <View style={styles.container}>
      <Picker
        style={styles.pickerContainer}
        selectedValue={selectedCamion}
        onValueChange={(itemValue) => handlePickerChange(itemValue)}
      >
        <Picker.Item label="Seleccionar camión" value={null} />
        {nombresCamiones.map((nombre, index) => (
          <Picker.Item key={index} label={nombre} value={nombre} />
        ))}
      </Picker>
      {selectedCamion && (
        <View style={styles.infoContainer}>
          <Pruebas2 nombre={selectedCamion} />

          <View style={styles.informacionCamionContainer}>
            {tableDataSinFechaTermino.length === 0 ? (
              <Text style={[styles.headerText, { color: 'white', textAlign: 'center' }]}>
                No existen alertas sin fecha de término para este equipo
              </Text>
            ) : (
              <React.Fragment>
                <Text style={styles.headerText}>Tabla de Información sin Fecha de Término para el Camión {selectedCamion}:</Text>
                <Table borderStyle={{ borderWidth: 0, borderColor: '#c8e1ff' }}>
                  <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                  {tableDataSinFechaTermino.map((rowData, index) => (
                    <Row key={index} data={rowData} style={styles.row} textStyle={styles.text} />
                  ))}
                </Table>
              </React.Fragment>
            )}
            {tableDataConFechaTermino.length === 0 ? (
              <Text style={[styles.headerText, { color: 'white', textAlign: 'center' }]}>
                No existen alertas con fecha de término para este equipo
              </Text>
            ) : (
              <React.Fragment>
                <Text style={styles.headerText}>Tabla de Información con Fecha de Término para el Camión {selectedCamion}:</Text>
                <Table borderStyle={{ borderWidth: 0, borderColor: '#c8e1ff' }}>
                  <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                  {tableDataConFechaTermino.map((rowData, index) => (
                    <Row key={index} data={rowData} style={styles.row} textStyle={styles.text} />
                  ))}
                </Table>
              </React.Fragment>
            )}

          </View>
        </View>
      )}
    </View>
  );


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  pickerContainer: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  infoContainer: {
    backgroundColor: '#25292e',
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
  },
  informacionCamionContainer: {
    flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#25292e', marginTop: 50,
  },
  headerText: { fontSize: 20, marginBottom: 10, color: "white" },
  head: { height: 40, backgroundColor: '#25292e', color: "white" },
  text: { margin: 6, color: "white" },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1, // Borde inferior
    borderColor: '#ccc', backgroundColor: '#25292e'
  },
});
export default Alertas;