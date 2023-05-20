import React, { useState, useEffect } from 'react';
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

import color from '@lib/color/color';
import kakaoLogo from '@lib/img/kakaoLogo.png';
import naverLogo from '@lib/img/naverLogo.png';
import { userState } from '@recoil/auth';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { getTokens, setTokens } from 'src/utils/storageHelper';

function Login({ navigation }: any): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const tokens = await getTokens();
        if (!tokens) throw new Error('No tokens');
        const response = await axios.post('http://localhost:8080/autoLogin', {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        });
        setUser({
          address: response.data.data.address,
          birthDate: response.data.data.birthDate,
          discountPrice: response.data.data.discountPrice,
          id: email,
          name: response.data.data.name,
          nickname: response.data.data.nickName,
          phoneNumber: response.data.data.phoneNumber,
          sex: response.data.data.sex,
          social: response.data.data.social,
          wishList: response.data.data.wishList,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
        setTokens(response.data.accessToken, response.data.refreshToken);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUser();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        id: email,
        pwd: password,
      });
      setUser({
        address: response.data.info.address,
        birthDate: response.data.info.birthDate,
        discountPrice: response.data.info.discountPrice,
        id: email,
        name: response.data.info.name,
        nickname: response.data.info.nickName,
        phoneNumber: response.data.info.phoneNumber,
        sex: response.data.info.sex,
        social: response.data.info.social,
        wishList: response.data.info.wishList,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
      setTokens(response.data.accessToken, response.data.refreshToken);
    } catch (e) {
      Alert.alert('로그인 실패!', '아이디 혹은 비밀번호를 확인해주세요.');
    }
  };

  const handleKakaoLogin = () => {
    navigation.navigate('WebView', {
      url: 'http://localhost:8080/oauth2/authorization/kakao',
    });
  };

  const handleNaverLogin = () => {
    navigation.navigate('WebView', {
      url: 'http://localhost:8080/oauth2/authorization/naver',
    });
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
          onPress={handleNaverLogin}
        >
          <Image style={styles.socialLogo} source={naverLogo} />
          <Text style={styles.naverTextColor}>네이버로 로그인</Text>
        </Pressable>
        <Pressable
          style={[styles.socialLoginButton, styles.kakaoBackgroundColor]}
          onPress={handleKakaoLogin}
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
    height: '100%',
    paddingTop: 70,
    alignItems: 'center',
    backgroundColor: color.white,
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
    width: '100%',
    marginTop: 70,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: color.green,
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
    fontSize: 20,
    fontFamily: 'Inter-Bold',
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
    elevation: 3,
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
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
  },
  kakaoTextColor: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    opacity: 0.85,
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
  },
  socialLogo: {
    height: 36,
    width: 36,
    resizeMode: 'contain',
  },
});

export default Login;
