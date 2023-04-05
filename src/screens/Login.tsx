import React, { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Login({ navigation }: any): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginInputSection}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="이메일"
          placeholderTextColor={'#433518'}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="비밀번호"
          placeholderTextColor={'#433518'}
        />
        <Pressable
          style={styles.loginButton}
          onPress={() => Alert.alert('로그인을 시도하였습니다.')}
        >
          <Text style={styles.buttonText}>로그인</Text>
        </Pressable>
      </View>
      <View style={styles.helpSection}>
        <Pressable
          style={styles.findButton}
          onPress={() => Alert.alert('아이디 찾기를 실행하였습니다.')}
        >
          <Text style={styles.boldText}>아이디 찾기</Text>
        </Pressable>
        <Text style={styles.boldText}>|</Text>
        <Pressable
          style={styles.findButton}
          onPress={() => Alert.alert('비밀번호 찾기를 실행하였습니다.')}
        >
          <Text style={styles.boldText}>비밀번호 찾기</Text>
        </Pressable>
      </View>
      <View style={styles.socialLoginSection}>
        <Pressable
          style={[styles.socialLoginButton, styles.naverBackgroundColor]}
          onPress={() => Alert.alert('네이버 로그인을 실행하였습니다.')}
        >
          <Image
            style={styles.socialLogo}
            source={require('../lib/img/naverLogo.png')}
          />
          <Text style={styles.naverTextColor}>네이버로 로그인</Text>
        </Pressable>
        <Pressable
          style={[styles.socialLoginButton, styles.kakaoBackgroundColor]}
          onPress={() => Alert.alert('카카오 로그인을 실행하였습니다.')}
        >
          <Image
            style={[styles.socialLogo, { height: 18 }]}
            source={require('../lib/img/kakaoLogo.png')}
          />
          <Text style={styles.kakaoTextColor}>카카오 로그인</Text>
        </Pressable>
        <Pressable
          style={[styles.socialLoginButton, styles.googleBackgroundColor]}
          onPress={() => Alert.alert('구글 로그인을 실행하였습니다.')}
        >
          <Image
            style={styles.socialLogo}
            source={require('../lib/img/googleLogo.png')}
          />
          <Text style={styles.googleTextColor}>구글계정으로 로그인</Text>
        </Pressable>
      </View>
      <View style={styles.signupSection}>
        <Text style={styles.commonText}>혹시, 처음이시라면?</Text>
        <Pressable
          style={styles.signupButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.boldText}>회원가입</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 70,
    alignItems: 'center',
  },
  loginInputSection: {
    width: '60%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#433518',
  },
  loginButton: {
    width: '90%',
    marginTop: 70,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#433518',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  helpSection: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  findButton: {
    marginHorizontal: 10,
  },
  signupSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
    marginTop: 70,
  },
  signupButton: {
    marginLeft: 10,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#433518',
  },
  commonText: {
    color: '#433518',
  },
  socialLoginSection: {
    marginTop: 60,
    width: '100%',
    alignItems: 'center',
  },
  socialLoginButton: {
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    height: 50,
    width: '65%',
    borderRadius: 12,
    padding: 8,
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  naverBackgroundColor: {
    backgroundColor: '#03C75A',
  },
  kakaoBackgroundColor: {
    backgroundColor: '#FEE500',
  },
  googleBackgroundColor: {
    backgroundColor: '#fff',
  },
  naverTextColor: {
    flex: 1,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  kakaoTextColor: {
    flex: 1,
    fontSize: 20,
    color: '#000',
    opacity: 0.85,
    textAlign: 'center',
  },
  googleTextColor: {
    flex: 1,
    fontSize: 20,
    color: '#757575',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  socialLogo: {
    height: 36,
    width: 36,
    resizeMode: 'contain',
  },
});

export default Login;
