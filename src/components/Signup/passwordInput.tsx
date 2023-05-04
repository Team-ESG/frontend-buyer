import { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from 'react-native';

import color from '@lib/color/color';

import useFocus from '../../hooks/useFocus';

const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
const PASSWORD_ERROR_MESSAGE =
  '영문, 숫자, 특수문자를 포함한 8~16자리로 입력해주세요.';
const PASSWORD_CONFIRMATION_ERROR_MESSAGE = '비밀번호가 일치하지 않아요.';

function PasswordInputScreen({
  password,
  setPassword,
  passwordConfirmation,
  setPasswordConfirmation,
  goToNextStep,
}: any): JSX.Element {
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [
    passwordConfirmationErrorMessage,
    setPasswordConfirmationErrorMessage,
  ] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const passwordRef = useFocus<TextInput>();
  const passwordConfirmationRef = useRef<TextInput>(null);

  // 유효성 검사
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

  useEffect(() => {
    if (
      password &&
      passwordConfirmation &&
      !passwordErrorMessage &&
      password === passwordConfirmation
    ) {
      setIsPasswordValid(true);
    }
  }, [password, passwordConfirmation, passwordErrorMessage]);

  useEffect(() => {
    if (isPasswordValid) goToNextStep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPasswordValid]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>비밀번호 입력</Text>
        <Text style={styles.subTitle}>비밀번호를 입력해주세요.</Text>
        <Text style={styles.label}>비밀번호</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            ref={passwordRef}
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
        {passwordConfirmationErrorMessage !== '' && (
          <Text style={styles.errorMessage}>
            {passwordConfirmationErrorMessage}
          </Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={
            password &&
            passwordConfirmation &&
            !passwordErrorMessage &&
            !passwordConfirmationErrorMessage
              ? styles.button
              : styles.button_disabled
          }
          onPress={goToNextStep}
          disabled={
            !password ||
            !passwordConfirmation ||
            passwordErrorMessage !== '' ||
            passwordConfirmationErrorMessage !== ''
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
  },
  topContainer: {
    paddingTop: 30,
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: color.brown,
  },
  title_disabled: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: color.disabled_01,
  },
  subTitle: {
    fontSize: 17,
    fontWeight: 'normal',
    marginBottom: 15,
    color: color.disabled_02,
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
    color: color.brown,
    paddingHorizontal: 5,
  },
  label_disabled: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    color: color.disabled_01,
    paddingHorizontal: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: color.brown,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    color: color.brown,
    flex: 1,
  },
  input_disabled: {
    borderWidth: 2,
    borderColor: color.disabled_01,
    borderRadius: 5,
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
    // borderRadius: 5,
    paddingHorizontal: 25,
    paddingVertical: 14,
    alignItems: 'center',
  },
  button_disabled: {
    backgroundColor: color.disabled_02,
    paddingHorizontal: 25,
    paddingVertical: 14,
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
export default PasswordInputScreen;
