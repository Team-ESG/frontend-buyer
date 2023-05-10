import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FindAccount from '@screens/Auth/FindAccount';
import FindPassword from '@screens/Auth/FindPassword';
import WebViewScreen from '@screens/Auth/WebViewScreen';

import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';

const Stack = createNativeStackNavigator();

export default function AuthStack(): JSX.Element {
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
      <Stack.Screen
        name="FindAccount"
        component={FindAccount}
        options={{ title: '아이디 찾기' }}
      />
      <Stack.Screen
        name="FindPassword"
        component={FindPassword}
        options={{ title: '비밀번호 찾기' }}
      />
      <Stack.Screen
        name="WebView"
        component={WebViewScreen}
        options={{ title: '카카오 로그인', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
