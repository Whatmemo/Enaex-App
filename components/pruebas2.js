// Tu archivo principal (pruebas2.js u otro)
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchApiData, calcularDiferenciaDias, obtenerFecha } from './apiData';


const pruebas2 = ({ nombre }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Llama a la función para obtener los datos de la API
    fetchApiData()
      .then((result) => {
        // Calcula la diferencia de días para cada fecha
        const dataWithDateDifference = result.map((item) => ({
          ...item,
          rev_fecha_expiracion: calcularDiferenciaDias(item.rev_fecha_expiracion),
          ser_fecha_expiracion: calcularDiferenciaDias(item.ser_fecha_expiracion),
          dgmn_fecha_expiracion: calcularDiferenciaDias(item.dgmn_fecha_expiracion),
          template_fecha_inicio: calcularDiferenciaDias(item.template_fecha_inicio),
        }));

        setData(dataWithDateDifference);
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
      });
  }, []);

  const faena = data.find(item => item.nombre === nombre);
  return (
    <View>
      {faena ? (
        <>
          <Text style={styles.headerText}>Faena: {faena.nombre_faena}</Text>
          <View style={styles.circleContainer}>
            <View style={styles.circleTextContainer}>
              <View style={getCircleStyle(faena.rev_fecha_expiracion)} />
              <Text style={styles.circleText}>RT</Text>
              <Text style={styles.circleText}>{faena.rev_fecha_expiracion}</Text>
            </View>
            <View style={styles.circleTextContainer}>
              <View style={getCircleStyle(faena.ser_fecha_expiracion)} />
              <Text style={styles.circleText}>SGMN</Text>
              <Text style={styles.circleText}>{faena.ser_fecha_expiracion}</Text>
            </View>
            <View style={styles.circleTextContainer}>
              <View style={getCircleStyle(faena.dgmn_fecha_expiracion)} />
              <Text style={styles.circleText}>DGMN</Text>
              <Text style={styles.circleText}>{faena.dgmn_fecha_expiracion}</Text>
            </View>
            <View style={styles.circleTextContainer}>
              <View style={getCircle_horas(faena.horas_ult, faena.prox_mantencion)} />
              <Text style={styles.circleText}>Hrs/Kms</Text>
              <Text style={styles.circleText}>{faena.horas_ult}</Text>
            </View>
          </View>

          {faena.template_fecha_inicio && (
            <View style={{ marginTop: 50 }} >
              <Text style={styles.circleText} >Días fuera de servicio: {faena.template_fecha_inicio}</Text>
            </View>
          )}
          {faena.template_fecha_termino && obtenerFecha(faena.template_fecha_termino) && (
            <View>
              <Text style={styles.circleText} >Fecha Retorno Operación: {obtenerFecha(faena.template_fecha_termino)}</Text>
            </View>
          )}
        </>
      ) : (
        <Text> </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#25292e',
  },
  headerText: {
    textAlign: 'center',
    color: "white",
    marginBottom: 30,
    fontFamily: "Georgia, serif",
    fontSize: 20,
  },
  circleTextContainer: {
    alignItems: "center",
    width: 80,
    height: 70,
  },
  circleText: {
    marginTop:5,
    color: "white",
  },
  row: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  circleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'space-around',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
});
const getCircleStyle = (fecha) => {
  let circleColor = '#2CFF00';
  let addStyles ={
    marginLeft:0,
    borderWidth: 1,  
    borderColor: '#4A4444', 
    width: 40,  
    height: 40,  
    borderRadius: 40 / 2, 
  }
  if (fecha > 0 && fecha <= 30) {
    circleColor = '#FFB630';
  } else if (fecha < 0) {
    circleColor = 'red';
  }

  return {
    ...styles.circle,
    ...addStyles,
    backgroundColor: circleColor,
  };
};

const getCircle_horas = (horas_ult, prox_mantencion) => {
  let circleColor = '#2CFF00'; 
  let addStyles ={
    marginLeft:0,
    borderWidth: 1,  
    borderColor: '#4A4444', 
    width: 40,  
    height: 40,  
    borderRadius: 40 / 2, 
  }

  if (horas_ult >= prox_mantencion) {
    circleColor = '#FF0000';
  } else if (horas_ult < prox_mantencion && horas_ult * 1.13 >= prox_mantencion) {
    circleColor = '#FFB630'; 
  }

  return {
    ...addStyles,
    backgroundColor: circleColor,
  };
};

export default pruebas2;