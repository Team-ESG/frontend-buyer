/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState, useRef } from 'react';
import {
  Animated,
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

const PHONE_NUMBER_REGEX = /^(010)[0-9]{4}[0-9]{4}$/;
const PHONE_NUMBER_ERROR_MESSAGE =
  '숫자로만 휴대폰 번호를 정확히 입력해주세요.';

export default function PhoneNumberInputScreen({
  navigation,
}: any): JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');

  const phoneNumberRef = useFocus<TextInput>();

  const handleFindAccount = async () => {
    try {
      const response = await axios.post('http://localhost:8080/info/id', {
        phone: phoneNumber,
      });
      if (response.status >= 400) throw new Error();
      Alert.alert('회원님의 아이디는 다음과 같아요.', response.data.data.id);
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('아이디 찾기 실패!', '일치하는 회원 정보가 없습니다.');
    }
  };

  useEffect(() => {
    setPhoneNumberErrorMessage('');
    if (phoneNumber && !PHONE_NUMBER_REGEX.test(phoneNumber)) {
      setPhoneNumberErrorMessage(PHONE_NUMBER_ERROR_MESSAGE);
    }
  }, [phoneNumber]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>아이디 찾기</Text>
        <Text style={styles.subTitle}>본인의 휴대폰 번호를 입력해주세요.</Text>
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
          onPress={handleFindAccount}
          disabled={phoneNumber.length !== 11}
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
