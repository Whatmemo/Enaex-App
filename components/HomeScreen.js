import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Buttons from './buttons';


// Importa la pantalla Get_data
import Get_data from './Get_data';

export default function HomeScreen({ navigation }) {
  return (

      <View style={styles.container}>
        <View style={styles.footerContainer}>
          <Buttons label="Faena" onPress={() => navigation.navigate('pruebas')} />
          <Buttons label="Equipos" onPress={() => navigation.navigate('Alertas')} />
          <Buttons label="Alertas" onPress={() => navigation.navigate('pruebas3')} />
        </View>
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  footerContainer: {
    marginTop: 0,
    flex: 1 / 3,
    alignItems: 'center',
  },
});
