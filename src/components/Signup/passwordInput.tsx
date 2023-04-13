import { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from 'react-native';

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
    color: '#433518',
  },
  title_disabled: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'rgb(150,150,150)',
  },
  subTitle: {
    fontSize: 17,
    fontWeight: 'normal',
    marginBottom: 15,
    color: 'rgb(200,200,200)',
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
    color: '#433518',
    paddingHorizontal: 5,
  },
  label_disabled: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    color: 'rgb(150,150,150)',
    paddingHorizontal: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: '#433518',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    color: '#433518',
    flex: 1,
  },
  input_disabled: {
    borderWidth: 2,
    borderColor: 'rgb(150,150,150)',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    color: 'rgb(150,150,150)',
    flex: 1,
  },
  buttonContainer: {
    marginTop: 5,
  },
  button: {
    backgroundColor: '#433518',
    // borderRadius: 5,
    paddingHorizontal: 25,
    paddingVertical: 14,
    alignItems: 'center',
  },
  button_disabled: {
    backgroundColor: 'rgb(200,200,200)',
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
