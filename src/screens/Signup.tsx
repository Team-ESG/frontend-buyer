import { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Pressable,
} from 'react-native';

const PHONE_NUMBER_REGEX = /^(010)[0-9]{4}[0-9]{4}$/;
const ID_REGEX = /^[a-zA-Z0-9]{4,12}$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

function Signup({ navigation }: any): JSX.Element {
  const [step, setStep] = useState(1);
  // 1단계
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [isSendAuthCode, setIsSendAuthCode] = useState(false);
  // 2단계
  const [id, setId] = useState('');
  const [idErrorMessage, setIdErrorMessage] = useState('');
  const [isNotDuplicateId, setIsNotDuplicateId] = useState(false);
  // 3단계
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [
    passwordConfirmationErrorMessage,
    setPasswordConfirmationErrorMessage,
  ] = useState('');
  // 4단계
  const [nickname, setNickname] = useState('');
  const [isNotDuplicateNickname, setIsNotDuplicateNickname] = useState(false);

  const phoneNumberRef = useRef<TextInput>(null);
  const authCodeRef = useRef<TextInput>(null);
  const idRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const nicknameRef = useRef<TextInput>(null);

  useEffect(() => {
    const fisrtInputRefs = [phoneNumberRef, idRef, passwordRef, nicknameRef];
    if (fisrtInputRefs[step - 1].current) {
      setTimeout(() => {
        fisrtInputRefs[step - 1].current?.focus();
      }, 100);
    }
  }, [step]);

  // 유효성 검사
  useEffect(() => {
    setPhoneNumberErrorMessage('');
    setIdErrorMessage('');
    setPasswordErrorMessage('');
    setPasswordConfirmationErrorMessage('');

    if (phoneNumber && !PHONE_NUMBER_REGEX.test(phoneNumber)) {
      setPhoneNumberErrorMessage('휴대폰 번호를 정확히 입력해주세요.');
    }
    if (id && !ID_REGEX.test(id)) {
      setIdErrorMessage(
        '아이디는 영문, 숫자를 포함한 4~12자리로 입력해주세요.'
      );
    }
    if (password && !PASSWORD_REGEX.test(password)) {
      setPasswordErrorMessage(
        '비밀번호는 영문, 숫자, 특수문자를 포함한 8~16자리로 입력해주세요.'
      );
    }
    if (passwordConfirmation && password !== passwordConfirmation) {
      setPasswordConfirmationErrorMessage('비밀번호가 일치하지 않습니다.');
    }
  }, [phoneNumber, authCode, id, password, passwordConfirmation]);

  useEffect(() => {
    if (authCode.length === 6) {
      setAuthCode('');
      goToNextStep();
    }
    if (
      password !== '' &&
      passwordConfirmation !== '' &&
      password === passwordConfirmation
    ) {
      goToNextStep();
    }
  }, [authCode, password, passwordConfirmation]);

  const goToNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleSendAuthCode = async () => {
    try {
      /* Todo: 인증번호 발송 요청 코드 */
      setIsSendAuthCode(true);
      if (authCodeRef.current) {
        setTimeout(() => {
          authCodeRef.current?.focus();
        }, 200);
      }
    } catch (error) {
      Alert.alert('Error', 'Error confirming code');
    }
  };

  const handleCheckDuplicateId = async () => {
    try {
      /* Todo: 아이디 중복 확인 코드 */
      setIsNotDuplicateId(true);
    } catch (error) {
      Alert.alert('Error', 'Error confirming code');
    }
  };

  const handleCheckDuplicateNickname = async () => {
    try {
      setIsNotDuplicateNickname(true);
    } catch (error) {
      Alert.alert('Error', 'Error confirming code');
    }
  };

  const handleSignUp = async () => {
    try {
      /* Todo: 회원가입 요청 코드 */
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Error confirming code');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {(() => {
        switch (step) {
          case 1:
            return (
              <>
                <Text style={styles.title}>휴대폰 인증</Text>
                <Text style={styles.subTitle}>
                  본인의 휴대폰 번호를 입력해주세요.
                </Text>
                <Text
                  style={isSendAuthCode ? styles.disabledLabel : styles.label}
                >
                  휴대폰 번호
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={isSendAuthCode ? styles.disabledInput : styles.input}
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    ref={phoneNumberRef}
                    placeholder="01012345678"
                    placeholderTextColor="rgb(200,200,200)"
                    maxLength={11}
                    editable={!isSendAuthCode}
                    selectTextOnFocus={!isSendAuthCode}
                  />
                </View>
                {phoneNumberErrorMessage !== '' && (
                  <Text style={styles.errorMessage}>
                    {phoneNumberErrorMessage}
                  </Text>
                )}
                <View style={styles.buttonContainer}>
                  <Pressable
                    style={
                      !isSendAuthCode && phoneNumber && !phoneNumberErrorMessage
                        ? styles.button
                        : styles.disabledButton
                    }
                    onPress={handleSendAuthCode}
                    disabled={
                      isSendAuthCode ||
                      phoneNumberErrorMessage !== '' ||
                      !phoneNumber
                    }
                  >
                    <Text style={styles.buttonText}>인증번호 받기</Text>
                  </Pressable>
                </View>
                {isSendAuthCode && (
                  <>
                    <Text style={styles.label}>인증번호</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        keyboardType="phone-pad"
                        value={authCode}
                        onChangeText={setAuthCode}
                        ref={authCodeRef}
                        placeholder="인증번호 6자리 입력"
                        placeholderTextColor="rgb(200,200,200)"
                        maxLength={6}
                      />
                    </View>
                  </>
                )}
              </>
            );
          case 2:
            return (
              <>
                <Text style={styles.title}>아이디 입력</Text>
                <Text style={styles.subTitle}>
                  로그인 시 사용될 아이디입니다.
                </Text>
                <Text style={styles.label}>아이디</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={id}
                    onChangeText={setId}
                    ref={idRef}
                  />
                  <Pressable
                    style={
                      id && !idErrorMessage && !isNotDuplicateId
                        ? styles.checkButton
                        : styles.disabledCheckButton
                    }
                    onPress={handleCheckDuplicateId}
                    disabled={idErrorMessage !== '' || !id}
                  >
                    <Text style={styles.buttonText}>중복 확인</Text>
                  </Pressable>
                </View>
                {idErrorMessage !== '' && (
                  <Text style={styles.errorMessage}>{idErrorMessage}</Text>
                )}
                {isNotDuplicateId && (
                  <View style={styles.buttonContainer}>
                    <Pressable
                      style={
                        id && !idErrorMessage
                          ? styles.button
                          : styles.disabledButton
                      }
                      onPress={goToNextStep}
                      disabled={idErrorMessage !== '' || !id}
                    >
                      <Text style={styles.buttonText}>다음</Text>
                    </Pressable>
                  </View>
                )}
              </>
            );
          case 3:
            return (
              <>
                <Text style={styles.title}>비밀번호 입력</Text>
                <Text style={styles.subTitle}>비밀번호를 입력해주세요.</Text>
                <Text style={styles.label}>비밀번호</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    ref={passwordRef}
                    secureTextEntry
                  />
                </View>
                {passwordErrorMessage !== '' && (
                  <Text style={styles.errorMessage}>
                    {passwordErrorMessage}
                  </Text>
                )}
                <Text style={styles.label}>비밀번호 확인</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={passwordConfirmation}
                    onChangeText={setPasswordConfirmation}
                    secureTextEntry
                  />
                </View>
                {passwordConfirmationErrorMessage !== '' && (
                  <Text style={styles.errorMessage}>
                    {passwordConfirmationErrorMessage}
                  </Text>
                )}
              </>
            );
          case 4:
            return (
              <>
                <Text style={styles.title}>추가 정보 입력</Text>
                <Text style={styles.subTitle}>마지막 단계에요</Text>
                <Text style={styles.label}>닉네임</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={nickname}
                    onChangeText={setNickname}
                  />
                  <Pressable
                    style={
                      nickname ? styles.checkButton : styles.disabledCheckButton
                    }
                    onPress={handleCheckDuplicateNickname}
                    disabled={idErrorMessage !== '' || !id}
                  >
                    <Text style={styles.buttonText}>중복 확인</Text>
                  </Pressable>
                </View>
                <View style={styles.buttonContainer}>
                  <Pressable style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>다음</Text>
                  </Pressable>
                </View>
              </>
            );
          default:
            return null;
        }
      })()}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#433518',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'rgb(200,200,200)',
  },
  inputContainer: {
    marginBottom: 5,
    flexDirection: 'row',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#433518',
    paddingHorizontal: 5,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#433518',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    color: '#433518',
    flex: 1,
  },
  buttonContainer: {
    marginTop: 5,
    marginBottom: 20,
  },
  checkButton: {
    borderRadius: 10,
    paddingVertical: 14,
    backgroundColor: '#433518',
    alignItems: 'center',
    flex: 0.5,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#433518',
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  secondaryButton: {
    backgroundColor: '#CCCCCC',
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: 'rgb(200,200,200)',
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabledLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'rgb(150,150,150)',
    paddingHorizontal: 5,
  },
  disabledInput: {
    borderWidth: 1.5,
    borderColor: 'rgb(150,150,150)',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    color: 'rgb(150,150,150)',
    flex: 1,
  },
  disabledCheckButton: {
    borderRadius: 10,
    paddingVertical: 14,
    backgroundColor: 'rgb(200,200,200)',
    alignItems: 'center',
    flex: 0.5,
    marginLeft: 10,
  },
});

export default Signup;
