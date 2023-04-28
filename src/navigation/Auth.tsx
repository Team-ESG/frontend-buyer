import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';

const Stack = createNativeStackNavigator();

export default function Auth(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: '로그인', headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: '회원가입' }}
      />
    </Stack.Navigator>
  );
}
