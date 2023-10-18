import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import PieChart from 'react-native-pie-chart';

export default function Grafico({ titulo, ceros, unos }) {
  const widthAndHeight = 250;
  const series = [ceros, unos]; // Utiliza directamente los valores pasados como parámetros
  const sliceColor = ['#d81012', 'white'];

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>{titulo}</Text>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          doughnut={true} // Esto convierte el gráfico en un donut
          coverRadius={0.8} // Esto controla el tamaño del agujero (0.4 para un agujero más grande, 0.5 para un agujero más pequeño)
          coverFill={'#FFF'}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    margin: 10,
    color: 'white'
  },
});
