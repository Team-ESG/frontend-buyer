import React from 'react';
import {Button, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function Login({navigation}: any): JSX.Element {
  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Login</Text>
      <Button
        title="Signup"
        onPress={() => {
          navigation.navigate('Signup');
        }}
      />
    </SafeAreaView>
  );
}

export default Login;
