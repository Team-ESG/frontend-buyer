import React from 'react';

import RootStack from '@navigation/RootStack';
import { NavigationContainer } from '@react-navigation/native';

import Auth from './src/navigation/Auth';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      {/* <Auth /> */}
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
