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
  SafeAreaView,
} from 'react-native';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Picker } from '@react-native-picker/picker';

const PHONE_NUMBER_REGEX = /^(010)[0-9]{4}[0-9]{4}$/;
const NAME_REGEX = /^[가-힣a-zA-Z]{2,10}$/;
const BIRTH_DATE_REGEX = /^\d{2}([0]\d|[1][0-2])([0][1-9]|[1-2]\d|[3][0-1])$/;
const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9]{2,10}$/;
const GENDER_REGEX = /^[1-4]$/;
const ID_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

const PHONE_NUMBER_ERROR_MESSAGE =
  '숫자로만 휴대폰 번호를 정확히 입력해주세요.';
const NAME_ERROR_MESSAGE = '이름을 두 글자 이상 입력해주세요.';
const BIRTH_DATE_ERROR_MESSAGE = '올바른 생년월일과 성별을 입력해주세요.';
const NICKNAME_ERROR_MESSAGE = '닉네임을 두 글자 이상 입력해주세요.';
const DUPLICATE_NICKNAME_ERROR_MESSAGE = '이미 사용중인 닉네임 입니다.';
const ID_ERROR_MESSAGE = '올바른 이메일 형식을 입력해주세요.';
const DUPLICATE_ID_ERROR_MESSAGE = '이미 가입된 이메일 입니다.';
const PASSWORD_ERROR_MESSAGE =
  '영문, 숫자, 특수문자를 포함한 8~16자리로 입력해주세요.';
const PASSWORD_CONFIRMATION_ERROR_MESSAGE = '비밀번호가 일치하지 않습니다.';

function Signup({ navigation }: any): JSX.Element {
  const [step, setStep] = useState(1);
  // 1단계
  const [phoneNumber, setPhoneNumber] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');
  const [isSendAuthCode, setIsSendAuthCode] = useState(false);
  // 2단계
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [nickname, setNickname] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [birthDateErrorMessage, setBirthDateErrorMessage] = useState('');
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');
  const [isNameInputCompleted, setIsNameInputCompleted] = useState(false);
  const [isBirthDateInputCompleted, setIsBirthDateInputCompleted] =
    useState(false);
  // 3단계
  const [id, setId] = useState('');
  const [idErrorMessage, setIdErrorMessage] = useState('');
  // 4단계
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [
    passwordConfirmationErrorMessage,
    setPasswordConfirmationErrorMessage,
  ] = useState('');
  // 5단계
  const [address, setAddress] = useState('');

  const phoneNumberRef = useRef<TextInput>(null);
  const authCodeRef = useRef<TextInput>(null);
  const nameRef = useRef<TextInput>(null);
  const birthDateRef = useRef<TextInput>(null);
  const genderRef = useRef<TextInput>(null);
  const nicknameRef = useRef<TextInput>(null);
  const idRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const passwordConfirmationRef = useRef<TextInput>(null);
  // const addressRef = useRef<TextInput>(null);

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

  // 단계별 첫번째 input 포커스
  useEffect(() => {
    if (step === 5) return;
    const fisrtInputRefs = [phoneNumberRef, nameRef, idRef, passwordRef];
    if (fisrtInputRefs[step - 1].current) {
      setTimeout(() => {
        fisrtInputRefs[step - 1].current?.focus();
      }, 100);
    }
  }, [step]);

  // 2단계 input 포커스
  useEffect(() => {
    if (!isNameInputCompleted) return;

    if (isBirthDateInputCompleted) {
      if (nicknameRef.current) nicknameRef.current?.focus();
    } else if (birthDate.length === 6) {
      if (genderRef.current) genderRef.current?.focus();
    } else if (birthDateRef.current) birthDateRef.current?.focus();
  }, [birthDate, isNameInputCompleted, isBirthDateInputCompleted]);

  // 유효성 검사
  useEffect(() => {
    setPhoneNumberErrorMessage('');
    setNameErrorMessage('');
    setBirthDateErrorMessage('');
    setNicknameErrorMessage('');
    setIdErrorMessage('');
    setPasswordErrorMessage('');
    setPasswordConfirmationErrorMessage('');

    if (phoneNumber && !PHONE_NUMBER_REGEX.test(phoneNumber)) {
      setPhoneNumberErrorMessage(PHONE_NUMBER_ERROR_MESSAGE);
    }
    if (name && !NAME_REGEX.test(name)) {
      setNameErrorMessage(NAME_ERROR_MESSAGE);
    }
    if (
      (birthDate && !BIRTH_DATE_REGEX.test(birthDate)) ||
      (gender && !GENDER_REGEX.test(gender))
    ) {
      setBirthDateErrorMessage(BIRTH_DATE_ERROR_MESSAGE);
    }
    if (nickname && !NICKNAME_REGEX.test(nickname)) {
      setNicknameErrorMessage(NICKNAME_ERROR_MESSAGE);
    }
    if (id && !ID_REGEX.test(id)) {
      setIdErrorMessage(ID_ERROR_MESSAGE);
    }
    if (password && !PASSWORD_REGEX.test(password)) {
      setPasswordErrorMessage(PASSWORD_ERROR_MESSAGE);
    }
    if (passwordConfirmation && password !== passwordConfirmation) {
      setPasswordConfirmationErrorMessage(PASSWORD_CONFIRMATION_ERROR_MESSAGE);
    }
  }, [
    phoneNumber,
    authCode,
    name,
    birthDate,
    nickname,
    gender,
    id,
    password,
    passwordConfirmation,
  ]);

  // 1단계->2단계
  useEffect(() => {
    if (authCode.length === 6) goToNextStep();
  }, [authCode]);

  // Todo: gender 가 유효하지 않은데도 다음 단계로 넘어가는 문제
  useEffect(() => {
    if (
      birthDate.length === 6 &&
      gender.length === 1 &&
      birthDateErrorMessage !== BIRTH_DATE_ERROR_MESSAGE
    ) {
      setIsBirthDateInputCompleted(true);
      if (nicknameRef.current) {
        setTimeout(() => {
          nicknameRef.current?.focus();
        }, 100);
      }
    }
  }, [birthDate, gender, birthDateErrorMessage]);

  useEffect(() => {
    if (
      password !== '' &&
      passwordConfirmation !== '' &&
      password === passwordConfirmation
    ) {
      goToNextStep();
    }
  }, [password, passwordConfirmation]);

  const goToNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleSendAuthCode = async () => {
    try {
      /* Todo: 인증번호 발송 요청 코드 */
      await setIsSendAuthCode(true);
      if (authCodeRef.current) {
        setTimeout(() => {
          authCodeRef.current?.focus();
        }, 200);
      }
      setTimer(180);
    } catch (error) {
      Alert.alert('Error', 'Error confirming code');
    }
  };

  const handleCheckDuplicateNickname = async () => {
    try {
      /* Todo: 닉네임 중복 확인 코드  */
      goToNextStep();
    } catch (error) {
      setNicknameErrorMessage(DUPLICATE_NICKNAME_ERROR_MESSAGE);
    }
  };

  const handleCheckDuplicateId = async () => {
    try {
      /* Todo: 아이디 중복 확인 코드 */
      goToNextStep();
    } catch (error) {
      setIdErrorMessage(DUPLICATE_ID_ERROR_MESSAGE);
    }
  };

  const handleSignUp = async () => {
    try {
      /* Todo: 회원가입 요청 코드 
        axios.post('/api/auth/signup', {
          memberId: id,
          password,
          name,
          nickname,
          sex: gender,
          birthDate: 
          phoneNumber,
      */
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Error confirming code');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
    >
      {(() => {
        switch (step) {
          case 1:
            return (
              <SafeAreaView style={styles.wrapper}>
                <View style={styles.topContainer}>
                  <Text style={styles.title}>휴대폰 인증</Text>
                  <Text style={styles.subTitle}>
                    본인의 휴대폰 번호를 입력해주세요.
                  </Text>
                  <Text
                    style={
                      isSendAuthCode ? styles.label_disabled : styles.label
                    }
                  >
                    휴대폰 번호
                  </Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={
                        isSendAuthCode ? styles.input_disabled : styles.input
                      }
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
                    <Text style={styles.errorMessage}>
                      {phoneNumberErrorMessage}
                    </Text>
                  )}
                  {isSendAuthCode && (
                    <View>
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
                        {timer > 0 ? (
                          <Text style={{ fontSize: 16, marginHorizontal: 10 }}>
                            {Math.floor(timer / 60)
                              .toString()
                              .padStart(2, '0')}
                            :
                            {Math.floor(timer % 60)
                              .toString()
                              .padStart(2, '0')}
                          </Text>
                        ) : (
                          <Text style={{ fontSize: 16, marginHorizontal: 10 }}>
                            재발송
                          </Text>
                        )}
                      </View>
                    </View>
                  )}
                </View>
                <View style={styles.buttonContainer}>
                  <Pressable
                    style={
                      !isSendAuthCode && phoneNumber && !phoneNumberErrorMessage
                        ? styles.button
                        : styles.button_disabled
                    }
                    onPress={handleSendAuthCode}
                    disabled={
                      isSendAuthCode ||
                      phoneNumberErrorMessage !== '' ||
                      !phoneNumber
                    }
                  >
                    <Text style={styles.buttonText}>
                      {isSendAuthCode ? '다음' : '인증번호 발송'}
                    </Text>
                  </Pressable>
                </View>
              </SafeAreaView>
            );
          case 2:
            return (
              <SafeAreaView style={styles.wrapper}>
                <View style={styles.topContainer}>
                  <Text style={styles.title}>개인 정보 입력</Text>
                  <Text style={styles.subTitle}>
                    가입에 필요한 개인 정보를 입력해주세요
                  </Text>

                  {isNameInputCompleted && isBirthDateInputCompleted && (
                    <>
                      <Text style={styles.label}>닉네임</Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          style={styles.input}
                          value={nickname}
                          onChangeText={setNickname}
                          ref={nicknameRef}
                        />
                      </View>
                      {nicknameErrorMessage !== '' && (
                        <Text style={styles.errorMessage}>
                          {nicknameErrorMessage}
                        </Text>
                      )}
                    </>
                  )}

                  {isNameInputCompleted && (
                    <>
                      <Text
                        style={
                          isBirthDateInputCompleted
                            ? styles.label_disabled
                            : styles.label
                        }
                      >
                        생년월일 및 성별
                      </Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          style={
                            isBirthDateInputCompleted
                              ? styles.input_disabled
                              : styles.input
                          }
                          value={birthDate}
                          onChangeText={setBirthDate}
                          ref={birthDateRef}
                          placeholder="YYMMDD"
                          placeholderTextColor="rgb(200,200,200)"
                          maxLength={6}
                          keyboardType="phone-pad"
                          editable={!isBirthDateInputCompleted}
                          selectTextOnFocus={!isBirthDateInputCompleted}
                        />
                        <Text style={styles.title}> - </Text>
                        <TextInput
                          style={
                            isBirthDateInputCompleted
                              ? styles.input_gender_disabled
                              : styles.input_gender
                          }
                          value={gender}
                          onChangeText={setGender}
                          ref={genderRef}
                          maxLength={1}
                          keyboardType="phone-pad"
                          editable={!isBirthDateInputCompleted}
                          selectTextOnFocus={!isBirthDateInputCompleted}
                        />
                        <View style={styles.genderContainer}>
                          <Text
                            style={
                              isBirthDateInputCompleted
                                ? styles.title_disabled
                                : styles.title
                            }
                          >
                            ******
                          </Text>
                        </View>
                      </View>
                      {birthDateErrorMessage !== '' && birthDate && (
                        <Text style={styles.errorMessage}>
                          {birthDateErrorMessage}
                        </Text>
                      )}
                    </>
                  )}

                  <Text
                    style={
                      isNameInputCompleted
                        ? styles.label_disabled
                        : styles.label
                    }
                  >
                    이름
                  </Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={
                        isNameInputCompleted
                          ? styles.input_disabled
                          : styles.input
                      }
                      value={name}
                      onChangeText={setName}
                      ref={nameRef}
                      editable={!isNameInputCompleted}
                      selectTextOnFocus={!isNameInputCompleted}
                    />
                  </View>
                  {nameErrorMessage !== '' && (
                    <Text style={styles.errorMessage}>{nameErrorMessage}</Text>
                  )}
                </View>

                {isNameInputCompleted && isBirthDateInputCompleted ? (
                  <View style={styles.buttonContainer}>
                    <Pressable
                      style={
                        nickname && !nicknameErrorMessage
                          ? styles.button
                          : styles.button_disabled
                      }
                      disabled={nicknameErrorMessage !== '' || !nickname}
                      onPress={() => {
                        handleCheckDuplicateNickname();
                      }}
                    >
                      <Text style={styles.buttonText}>다음</Text>
                    </Pressable>
                  </View>
                ) : (
                  <View style={styles.buttonContainer}>
                    <Pressable
                      style={
                        name && !nameErrorMessage && !isNameInputCompleted
                          ? styles.button
                          : styles.button_disabled
                      }
                      disabled={nameErrorMessage !== '' || !name}
                      onPress={() => {
                        setIsNameInputCompleted(true);
                      }}
                    >
                      <Text style={styles.buttonText}>다음</Text>
                    </Pressable>
                  </View>
                )}
              </SafeAreaView>
            );
          case 3:
            return (
              <SafeAreaView style={styles.wrapper}>
                <View style={styles.topContainer}>
                  <Text style={styles.title}>이메일 입력</Text>
                  <Text style={styles.subTitle}>
                    로그인 시 사용될 이메일을 입력해주세요
                  </Text>
                  <Text style={styles.label}>이메일</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={id}
                      onChangeText={setId}
                      ref={idRef}
                      placeholder="abc@ajou.ac.kr"
                    />
                  </View>
                  {idErrorMessage !== '' && (
                    <Text style={styles.errorMessage}>{idErrorMessage}</Text>
                  )}
                </View>

                <View style={styles.buttonContainer}>
                  <Pressable
                    style={
                      id && !idErrorMessage
                        ? styles.button
                        : styles.button_disabled
                    }
                    onPress={() => {
                      handleCheckDuplicateId();
                    }}
                    disabled={idErrorMessage === ID_ERROR_MESSAGE || !id}
                  >
                    <Text style={styles.buttonText}>다음</Text>
                  </Pressable>
                </View>
              </SafeAreaView>
            );
          case 4:
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
          case 5:
            return (
              <SafeAreaView style={styles.wrapper}>
                <View style={styles.topContainer}>
                  <Text style={styles.title}>내 위치 설정</Text>
                  <Text style={styles.subTitle}>내 위치를 설정해주세요.</Text>
                  <Text style={styles.label}>주소지 설정</Text>
                  <Picker
                    selectedValue={address}
                    onValueChange={(itemValue) => {
                      setAddress(itemValue);
                    }}
                  >
                    <Picker.Item label="수원시 영통구" value="수원시 영통구" />
                  </Picker>
                </View>

                <View style={styles.buttonContainer}>
                  <Pressable style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>다음</Text>
                  </Pressable>
                </View>
              </SafeAreaView>
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
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
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
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    color: '#433518',
    flex: 1,
  },
  input_disabled: {
    borderWidth: 2,
    borderColor: 'rgb(150,150,150)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    color: 'rgb(150,150,150)',
    flex: 1,
  },
  input_gender: {
    borderWidth: 2,
    borderColor: '#433518',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    color: '#433518',
    flex: 0.05,
  },
  input_gender_disabled: {
    borderWidth: 2,
    borderColor: 'rgb(150,150,150)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    color: 'rgb(150,150,150)',
    flex: 0.05,
  },
  buttonContainer: {
    marginTop: 5,
  },
  button: {
    backgroundColor: '#433518',
    // borderRadius: 10,
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
  checkButton: {
    borderRadius: 10,
    paddingVertical: 14,
    backgroundColor: '#433518',
    alignItems: 'center',
    flex: 0.5,
    marginLeft: 10,
  },
  checkbutton_disabled: {
    borderRadius: 10,
    paddingVertical: 14,
    backgroundColor: 'rgb(200,200,200)',
    alignItems: 'center',
    flex: 0.5,
    marginLeft: 10,
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
  genderContainer: {
    paddingTop: 10,
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Signup;
