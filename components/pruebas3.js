import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import dataCamion from './Get_data_camionLimitacion';
import { Table, Row } from 'react-native-table-component';
import { fetchApiData, nombre_camiones } from './apiData';
import { Alertas } from './Alertas'
import { useNavigation } from '@react-navigation/native';

const CamionesComponent = () => {
    const navigation = useNavigation();
    const [camionesData, setCamionesData] = useState([]);
    const [nombresCamiones, setNombresCamiones] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const nombres = await fetchNombresCamiones();
                if (nombres.length > 0) {
                    setNombresCamiones(nombres);
                    const data = await obtenerInformacionCamionesFiltrada(nombres);
                    if (data) {
                        setCamionesData(data);
                    }
                }
            } catch (error) {
                console.error(`Error fetching camiones data: ${error.message}`);
            }
        };

        fetchData();
    }, []);

    const fetchNombresCamiones = async () => {
        try {
            const processedData = await fetchApiData();
            if (processedData.length > 0) {
                const nombres = nombre_camiones(processedData);
                return nombres;
            }
            return [];
        } catch (error) {
            console.error(`Error fetching camion names: ${error.message}`);
            return [];
        }
    };

    const obtenerInformacionCamionesFiltrada = async (nombres) => {
        try {
            const data = await dataCamion.obtenerInformacionCamiones();
            const camionesFiltrados = data.filter((camion) =>
                nombres.includes(camion.nombre_camion)
            );
            return camionesFiltrados;
        } catch (error) {
            console.error(`Error fetching filtered camiones data: ${error.message}`);
            return [];
        }
    };

    // Preparar los datos para la tabla
    const tableHead = ['Nombre del camión', 'Descripción', 'Estado'];
    const tableData = camionesData.map((camion) => [
        camion.nombre_camion,
        camion.descripcion,
        (
          <View style={styles.buttonContainer} key={camion.nombre_camion}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('Alertas', { equipo: camion.nombre_camion });
              }}
            >
              <Text style={styles.buttonText}>Ver Alertas</Text>
            </TouchableOpacity>
          </View>
        ),
      ]);
      

    return (
        <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 0, borderColor: '#c8e1ff' }}>
                <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                {tableData.map((rowData, index) => (
                    <Row key={index} data={rowData} style={styles.row} textStyle={styles.text} />
                ))}
            </Table>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    head: { height: 40, backgroundColor: '#25292e', color: 'white', padding: 30, },
    text: { margin: 6, color: 'white' },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        backgroundColor: '#25292e',
    },
    buttonContainer: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#ec5353',
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CamionesComponent;
