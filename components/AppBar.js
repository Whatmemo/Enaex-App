import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';  // Asegúrate de tener este paquete instalado
import { useNavigation } from '@react-navigation/native';

const CustomAppBar = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.icon}>
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>Enaex</Text>
      <Image
        source={{ uri: "https://intranet.enaex.com/images/logos-mobile.svg?b4a9c1716ab4ac267d1686bdbde26c4b" }}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#25292e',
    padding: 16,
  },
  icon: {
    width: 100, 
  },
  title: {
    width: 100, 
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  logo: {
    width: 100,  
    height: 40,  
    resizeMode: 'contain',  
  },
  
});

export default CustomAppBar;
