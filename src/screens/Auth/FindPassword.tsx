/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from 'react-native';

import color from '@lib/color/color';
import axios from 'axios';

import useFocus from '../../hooks/useFocus';

const ID_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const ID_ERROR_MESSAGE = '올바른 이메일 형식을 입력해주세요.';
const PHONE_NUMBER_REGEX = /^(010)[0-9]{4}[0-9]{4}$/;
const PHONE_NUMBER_ERROR_MESSAGE =
  '숫자로만 휴대폰 번호를 정확히 입력해주세요.';

export default function PhoneNumberInputScreen({
  navigation,
}: any): JSX.Element {
  const [id, setId] = useState('');
  const [idErrorMessage, setIdErrorMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');

  const idRef = useFocus<TextInput>();
  const phoneNumberRef = useRef<TextInput>(null);

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/info/check/pwd',
        {
          id,
          phone: phoneNumber,
        }
      );
      if (response.status >= 400) throw new Error();
      console.log(response.data.data);
      Alert.alert(
        '임시 비밀번호가 발급 되었습니다.',
        `발급된 비밀번호: ${response.data.data}\n로그인 후 비밀번호를 변경해주세요.`
      );
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('비밀번호 찾기 실패!', '일치하는 회원 정보가 없습니다.');
    }
  };

  useEffect(() => {
    setIdErrorMessage('');
    setPhoneNumberErrorMessage('');

    if (id && !ID_REGEX.test(id)) {
      setIdErrorMessage(ID_ERROR_MESSAGE);
    }
    if (phoneNumber && !PHONE_NUMBER_REGEX.test(phoneNumber)) {
      setPhoneNumberErrorMessage(PHONE_NUMBER_ERROR_MESSAGE);
    }
  }, [id, phoneNumber]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>비밀번호 찾기</Text>
        <Text style={styles.subTitle}>
          본인의 아이디와 휴대폰 번호를 입력해주세요.
        </Text>
        <Text style={styles.label}>아이디</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            ref={idRef}
            value={id}
            onChangeText={setId}
            maxLength={50}
            placeholder="esg@ajou.ac.kr"
            placeholderTextColor="rgb(200,200,200)"
          />
        </View>
        {idErrorMessage !== '' && (
          <Text style={styles.errorMessage}>{idErrorMessage}</Text>
        )}
        <Text style={styles.label}>휴대폰 번호</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            ref={phoneNumberRef}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={11}
            keyboardType="phone-pad"
            placeholder="01012345678"
            placeholderTextColor="rgb(200,200,200)"
          />
        </View>
        {phoneNumberErrorMessage !== '' && (
          <Text style={styles.errorMessage}>{phoneNumberErrorMessage}</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={
            phoneNumber.length === 11 ? styles.button : styles.button_disabled
          }
          onPress={handleResetPassword}
          disabled={
            phoneNumber.length !== 11
            // idErrorMessage === ID_ERROR_MESSAGE ||
            // !id
          }
        >
          <Text style={styles.buttonText}>다음</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: color.white,
  },
  topContainer: {
    paddingTop: 30,
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 1.5,
    color: color.brown,
  },
  title_disabled: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 1.5,
    color: color.disabled_01,
  },
  subTitle: {
    fontSize: 17,
    fontWeight: 'normal',
    marginBottom: 15,
    color: '#444',
  },
  inputContainer: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: color.offBlack,
    paddingHorizontal: 5,
  },
  input: {
    borderWidth: 1.5,
    borderColor: color.offBlack,
    borderRadius: 3.5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    color: color.offBlack,
    flex: 1,
  },
  buttonContainer: {
    marginTop: 5,
  },
  button: {
    backgroundColor: color.green,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 18,
    alignItems: 'center',
  },
  button_disabled: {
    backgroundColor: color.disabled_02,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 18,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginHorizontal: 5,
    marginBottom: 10,
  },
});
