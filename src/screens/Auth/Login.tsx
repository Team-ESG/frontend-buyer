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

import kakaoLogo from '@lib/img/kakaoLogo.png';
import naverLogo from '@lib/img/naverLogo.png';
import { userState } from '@recoil/auth';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

function Login({ navigation }: any): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useSetRecoilState(userState);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        id: email,
        pwd: password,
      });
      setUser({
        id: email,
        nickname: response.data.info.nickName,
        address: response.data.info.address,
        discountPrice: response.data.info.discountPrice,
        sex: response.data.info.sex,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
    } catch (e) {
      Alert.alert('로그인 실패!', '아이디 혹은 비밀번호를 확인해주세요.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginInputSection}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="이메일"
          placeholderTextColor="#433518"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="비밀번호"
          placeholderTextColor="#433518"
          secureTextEntry
        />
        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>로그인</Text>
        </Pressable>
      </View>
      <View style={styles.helpSection}>
        <Pressable
          style={styles.findButton}
          onPress={() => {
            navigation.navigate('FindAccount');
          }}
        >
          <Text style={styles.boldText}>아이디 찾기</Text>
        </Pressable>
        <Text style={styles.boldText}>|</Text>
        <Pressable
          style={styles.findButton}
          onPress={() => {
            navigation.navigate('FindPassword');
          }}
        >
          <Text style={styles.boldText}>비밀번호 찾기</Text>
        </Pressable>
      </View>
      <View style={styles.socialLoginSection}>
        <Pressable
          style={[styles.socialLoginButton, styles.naverBackgroundColor]}
          onPress={() => Alert.alert('네이버 로그인을 실행하였습니다.')}
        >
          <Image style={styles.socialLogo} source={naverLogo} />
          <Text style={styles.naverTextColor}>네이버로 로그인</Text>
        </Pressable>
        <Pressable
          style={[styles.socialLoginButton, styles.kakaoBackgroundColor]}
          onPress={() => Alert.alert('카카오 로그인을 실행하였습니다.')}
        >
          <Image
            style={[styles.socialLogo, { height: 18 }]}
            source={kakaoLogo}
          />
          <Text style={styles.kakaoTextColor}>카카오 로그인</Text>
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
    elevation: 5,
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
