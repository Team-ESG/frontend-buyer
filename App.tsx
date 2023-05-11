import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import AuthStack from '@navigation/AuthStack';
import RootStack from '@navigation/RootStack';
import { NavigationContainer } from '@react-navigation/native';
import { useRecoilState } from 'recoil';

import { userState } from './src/recoil/auth';

export default function App(): JSX.Element {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <NavigationContainer>
      {user ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
