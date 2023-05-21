import { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';

import color from '@lib/color/color';
import { userState } from '@recoil/auth';
import axios from 'axios';
import { useRecoilValue } from 'recoil';

const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
const PASSWORD_ERROR_MESSAGE =
  '영문, 숫자, 특수문자를 포함한 8~16자리로 입력해주세요.';
const PASSWORD_CONFIRMATION_ERROR_MESSAGE = '비밀번호가 일치하지 않아요.';

export default function EditPassword({ setIsSubmitting }: any) {
  const user = useRecoilValue(userState);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [
    passwordConfirmationErrorMessage,
    setPasswordConfirmationErrorMessage,
  ] = useState('');
  const passwordConfirmationRef = useRef<TextInput>(null);

  const handleEditPassword = async () => {
    try {
      const response = await axios.patch(
        'http://52.78.81.8:8080/auth/info/reset/pwd',
        {
          pwd: password,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      if (response.state >= 400) throw new Error();
      setIsSubmitting(true);
    } catch (err) {
      Alert.alert('비밀번호 변경 실패', '다시 시도해주세요');
    }
  };

  useEffect(() => {
    setPasswordErrorMessage('');
    setPasswordConfirmationErrorMessage('');

    if (password && !PASSWORD_REGEX.test(password)) {
      setPasswordErrorMessage(PASSWORD_ERROR_MESSAGE);
    }
    if (passwordConfirmation && password !== passwordConfirmation) {
      setPasswordConfirmationErrorMessage(PASSWORD_CONFIRMATION_ERROR_MESSAGE);
    }
  }, [password, passwordConfirmation]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>새로운 비밀번호를 입력해주세요</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={() => {
              if (passwordConfirmationRef.current)
                passwordConfirmationRef.current.focus();
            }}
            secureTextEntry
          />
        </View>
        {passwordErrorMessage !== '' && (
          <Text style={styles.errorMessage}>{passwordErrorMessage}</Text>
        )}
        <Text style={styles.label}>비밀번호 확인</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
            ref={passwordConfirmationRef}
            secureTextEntry
          />
        </View>
      </View>
      <Pressable
        style={
          password &&
          passwordConfirmation &&
          !passwordErrorMessage &&
          !passwordConfirmationErrorMessage
            ? styles.button
            : styles.button_disabled
        }
        onPress={handleEditPassword}
        disabled={
          !password ||
          !passwordConfirmation ||
          passwordErrorMessage !== '' ||
          passwordConfirmationErrorMessage !== ''
        }
      >
        <Text style={styles.buttonText}>변경완료</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  topContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
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
    color: '#333',
  },
  input: {
    borderWidth: 1.5,
    borderColor: color.brown,
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 16,
    color: color.brown,
    flex: 1,
    borderRadius: 5,
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginHorizontal: 5,
    marginBottom: 10,
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
});
