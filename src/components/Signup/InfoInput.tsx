/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState, useRef } from 'react';
import {
  Animated,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from 'react-native';

import axios from 'axios';

import useFocus from '../../hooks/useFocus';

const NAME_REGEX = /^[가-힣a-zA-Z]{2,10}$/;
const BIRTH_DATE_REGEX = /^\d{2}([0]\d|[1][0-2])([0][1-9]|[1-2]\d|[3][0-1])$/;
const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9]{2,10}$/;
const GENDER_REGEX = /^[1-4]$/;

const NAME_ERROR_MESSAGE = '이름을 두 글자 이상 입력해주세요.';
const BIRTH_DATE_ERROR_MESSAGE = '올바른 생년월일과 성별을 입력해주세요.';
const NICKNAME_ERROR_MESSAGE = '닉네임을 두 글자 이상 입력해주세요.';
const DUPLICATE_NICKNAME_ERROR_MESSAGE = '이미 사용중인 닉네임 이에요.';

function InfoInputScreen({
  name,
  setName,
  birthDate,
  setBirthDate,
  gender,
  setGender,
  nickname,
  setNickname,
  goToNextStep,
}: any): JSX.Element {
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [birthDateErrorMessage, setBirthDateErrorMessage] = useState('');
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');
  const [isNameInputCompleted, setIsNameInputCompleted] = useState(false);
  const [isBirthDateInputCompleted, setIsBirthDateInputCompleted] =
    useState(false);

  const nameRef = useFocus<TextInput>();
  const birthDateRef = useRef<TextInput>(null);
  const genderRef = useRef<TextInput>(null);
  const nicknameRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!isNameInputCompleted) return;

    if (isBirthDateInputCompleted) {
      if (nicknameRef.current) nicknameRef.current?.focus();
    } else if (birthDate.length === 6) {
      if (genderRef.current) genderRef.current?.focus();
    } else if (birthDateRef.current) birthDateRef.current?.focus();
  }, [birthDate, isNameInputCompleted, isBirthDateInputCompleted]);

  useEffect(() => {
    setNameErrorMessage('');
    setBirthDateErrorMessage('');
    setNicknameErrorMessage('');

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
  }, [name, birthDate, nickname, gender]);

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

  const handleCheckDuplicateNickname = async () => {
    try {
      /* Todo: 닉네임 중복 확인 코드  */
      // const response = await axios.get(
      //   `http://localhost:8080/register/check/nickname/${nickname}`,
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   }
      // );
      //   if (response.state >= 400) throw new Error();
      goToNextStep();
    } catch (error: any) {
      setNicknameErrorMessage(DUPLICATE_NICKNAME_ERROR_MESSAGE);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>개인 정보 입력</Text>
        <Text style={styles.subTitle}>
          가입에 필요한 개인 정보를 입력해주세요
        </Text>

        {isNameInputCompleted && isBirthDateInputCompleted && (
          <Animated.View
          // style={{
          //   opacity: fadeAnim,
          // }}
          >
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
              <Text style={styles.errorMessage}>{nicknameErrorMessage}</Text>
            )}
          </Animated.View>
        )}

        {isNameInputCompleted && (
          <Animated.View
          // style={{
          //   opacity: fadeAnim,
          // }}
          >
            <Text
              style={
                isBirthDateInputCompleted ? styles.label_disabled : styles.label
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
              <Text style={styles.errorMessage}>{birthDateErrorMessage}</Text>
            )}
          </Animated.View>
        )}

        <Text
          style={isNameInputCompleted ? styles.label_disabled : styles.label}
        >
          이름
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={isNameInputCompleted ? styles.input_disabled : styles.input}
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
            onPress={handleCheckDuplicateNickname}
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
  input_gender: {
    borderWidth: 2,
    borderColor: '#433518',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    color: '#433518',
    flex: 0.05,
  },
  input_gender_disabled: {
    borderWidth: 2,
    borderColor: 'rgb(150,150,150)',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    color: 'rgb(150,150,150)',
    flex: 0.05,
  },
  genderContainer: {
    paddingTop: 10,
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default InfoInputScreen;
