import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationConfig from './components/NavigationConfig';

const App = () => {
  return (
    <NavigationContainer>
      <NavigationConfig />
    </NavigationContainer>
  );
};

export default App;