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
const AUTH_CODE_ERROR_MESSAGE = '인증번호가 일치하지 않아요.';

function PhoneNumberInputScreen({
  phoneNumber,
  setPhoneNumber,
  goToNextStep,
}: any): JSX.Element {
  const [authCode, setAuthCode] = useState('');
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');
  const [isSendAuthCode, setIsSendAuthCode] = useState(false);
  const [authCodeErrorMessage, setAuthCodeErrorMessage] = useState('');

  const phoneNumberRef = useFocus<TextInput>();
  const authCodeRef = useRef<TextInput>(null);

  const [timer, setTimer] = useState(0);
  const timerIntervalRef = useRef<number>(0);

  // 인증번호 타이머
  useEffect(() => {
    if (timer > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [timer]);

  useEffect(() => {
    setPhoneNumberErrorMessage('');
    if (phoneNumber && !PHONE_NUMBER_REGEX.test(phoneNumber)) {
      setPhoneNumberErrorMessage(PHONE_NUMBER_ERROR_MESSAGE);
    }
  }, [phoneNumber]);

  const handleSendAuthCode = async () => {
    try {
      /* Todo: 인증번호 발송 요청 코드 */
      const response: any = await axios.post(
        `http://52.78.81.8:8080/register/send`,
        {
          phone: phoneNumber,
        }
      );
      if (response.state >= 400) throw new Error();
      await setIsSendAuthCode(true);
      if (authCodeRef.current) {
        setTimeout(() => {
          authCodeRef.current?.focus();
        }, 100);
      }
      setTimer(180);
    } catch (error: any) {
      Alert.alert(`${error}`, '다시 시도해주세요');
    }
  };

  const handleCheckAuthCode = async () => {
    try {
      const response: any = await axios.post(
        `http://52.78.81.8:8080/check/code`,
        {
          phone: phoneNumber,
          code: authCode,
        }
      );
      if (response.state >= 400) throw new Error();
      goToNextStep();
    } catch (error: any) {
      setAuthCodeErrorMessage(AUTH_CODE_ERROR_MESSAGE);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>휴대폰 인증</Text>
        <Text style={styles.subTitle}>본인의 휴대폰 번호를 입력해주세요.</Text>
        <Text style={isSendAuthCode ? styles.label_disabled : styles.label}>
          휴대폰 번호
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={isSendAuthCode ? styles.input_disabled : styles.input}
            ref={phoneNumberRef}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={11}
            keyboardType="phone-pad"
            placeholder="01012345678"
            placeholderTextColor="rgb(200,200,200)"
            editable={!isSendAuthCode}
            selectTextOnFocus={!isSendAuthCode}
          />
        </View>
        {phoneNumberErrorMessage !== '' && (
          <Text style={styles.errorMessage}>{phoneNumberErrorMessage}</Text>
        )}
        {isSendAuthCode && (
          <Animated.View
          // style={{
          //   opacity: fadeAnim,
          // }}
          >
            <Text style={styles.label}>인증번호</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                ref={authCodeRef}
                value={authCode}
                onChangeText={setAuthCode}
                maxLength={6}
                keyboardType="phone-pad"
                placeholder="인증번호 6자리 입력"
                placeholderTextColor="rgb(200,200,200)"
              />
              <Pressable
                onPress={handleSendAuthCode}
                style={
                  timer > 0 ? styles.reSendButton_disabled : styles.reSendButton
                }
                disabled={timer > 0}
              >
                {timer > 0 ? (
                  <Text style={styles.reSendButtonText}>
                    {Math.floor(timer / 60)
                      .toString()
                      .padStart(2, '0')}
                    :
                    {Math.floor(timer % 60)
                      .toString()
                      .padStart(2, '0')}
                  </Text>
                ) : (
                  <Text style={styles.reSendButtonText}>재발송</Text>
                )}
              </Pressable>
            </View>
            {authCodeErrorMessage !== '' && (
              <Text style={styles.errorMessage}>{authCodeErrorMessage}</Text>
            )}
          </Animated.View>
        )}
      </View>
      {!isSendAuthCode ? (
        <View style={styles.buttonContainer}>
          <Pressable
            style={
              !isSendAuthCode && phoneNumber && !phoneNumberErrorMessage
                ? styles.button
                : styles.button_disabled
            }
            onPress={handleSendAuthCode}
            disabled={
              isSendAuthCode || phoneNumberErrorMessage !== '' || !phoneNumber
            }
          >
            <Text style={styles.buttonText}>
              {isSendAuthCode ? '다음' : '인증번호 발송'}
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Pressable
            style={
              authCode.length === 6 ? styles.button : styles.button_disabled
            }
            onPress={handleCheckAuthCode}
            disabled={authCode.length !== 6}
          >
            <Text style={styles.buttonText}>다음</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topContainer: {
    paddingTop: 30,
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 1.5,
    color: color.brown,
  },
  title_disabled: {
    fontSize: 24,
    fontWeight: '600',
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
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: color.offBlack,
    paddingHorizontal: 5,
  },
  label_disabled: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 5,
    color: color.disabled_01,
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
  input_disabled: {
    borderWidth: 1.5,
    borderColor: color.disabled_01,
    borderRadius: 3.5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    color: color.disabled_01,
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
    fontWeight: '600',
    color: '#FFF',
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  reSendButton: {
    borderRadius: 1.5,
    paddingVertical: 12,
    marginLeft: 10,
    flexDirection: 'row',
    backgroundColor: color.green,
  },
  reSendButton_disabled: {
    borderRadius: 1.5,
    paddingVertical: 12,
    marginLeft: 10,
    flexDirection: 'row',
    backgroundColor: color.disabled_02,
  },
  reSendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    paddingHorizontal: 15,
  },
});
export default PhoneNumberInputScreen;
