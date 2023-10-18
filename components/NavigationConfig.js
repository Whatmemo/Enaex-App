import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import { View, StyleSheet } from 'react-native';
import Details from './Details';
import Get_data from './Get_data';  // Cambio en la importación
import Alertas from './Alertas'
import AppBar from './AppBar';
import pruebas3 from './pruebas3'

const Stack = createNativeStackNavigator();

const NavigationConfig = () => {

  return (
    <View style={styles.container}>
    <AppBar/>
    <Stack.Navigator  initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="pruebas" component={Get_data} />
      <Stack.Screen name="Alertas" component={Alertas} />
      <Stack.Screen name="pruebas3" component={pruebas3} />
    </Stack.Navigator>
    </View>
  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default NavigationConfig;
