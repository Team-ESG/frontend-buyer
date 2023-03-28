import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Auth from './src/navigation/Auth';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Auth />
    </NavigationContainer>
  );
}

export default App;
