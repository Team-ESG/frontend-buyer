import React from 'react';

import AuthStack from '@navigation/AuthStack';
import RootStack from '@navigation/RootStack';
import { NavigationContainer } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';

import { userState } from './src/recoil/auth';

export default function App(): JSX.Element {
  const user = useRecoilValue(userState);
  return (
    <NavigationContainer>
      {user ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
