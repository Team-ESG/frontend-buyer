import { useState, useEffect, useRef } from 'react';
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

import useFocus from '@hooks/useFocus';
import color from '@lib/color/color';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const BIRTH_DATE_REGEX = /^\d{2}([0]\d|[1][0-2])([0][1-9]|[1-2]\d|[3][0-1])$/;
const GENDER_REGEX = /^[1-4]$/;
const PHONE_NUMBER_REGEX = /^(010)[0-9]{4}[0-9]{4}$/;

const PHONE_NUMBER_ERROR_MESSAGE =
  '숫자로만 휴대폰 번호를 정확히 입력해주세요.';
const BIRTH_DATE_ERROR_MESSAGE = '올바른 생년월일과 성별을 입력해주세요.';

export default function SignupSocial({ navigation, route }: any): JSX.Element {
  const { webViewData } = route.params;

  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');
  const [birthDateErrorMessage, setBirthDateErrorMessage] = useState('');

  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('수원시 영통구 원천동');
  const [isPhoneNumberInputCompleted, setIsPhoneNumberInputCompleted] =
    useState(false);
  const [isBirthDateInputCompleted, setIsBirthDateInputCompleted] =
    useState(false);

  const phoneNumberRef = useFocus<TextInput>();
  const birthDateRef = useRef<TextInput>(null);
  const genderRef = useRef<TextInput>(null);
  const addressRef = useRef(null);

  const birthDateOpacity = useRef(new Animated.Value(0)).current;
  const addressOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isPhoneNumberInputCompleted) {
      Animated.timing(birthDateOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isPhoneNumberInputCompleted]);

  useEffect(() => {
    if (isBirthDateInputCompleted) {
      Animated.timing(addressOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isBirthDateInputCompleted]);

  useEffect(() => {
    setPhoneNumberErrorMessage('');
    setBirthDateErrorMessage('');
    if (phoneNumber && !PHONE_NUMBER_REGEX.test(phoneNumber)) {
      setPhoneNumberErrorMessage(PHONE_NUMBER_ERROR_MESSAGE);
    }
    if (
      (birthDate && !BIRTH_DATE_REGEX.test(birthDate)) ||
      (gender && !GENDER_REGEX.test(gender))
    ) {
      setBirthDateErrorMessage(BIRTH_DATE_ERROR_MESSAGE);
    }
  }, [phoneNumber, birthDate, gender]);

  useEffect(() => {
    if (!isPhoneNumberInputCompleted) return;

    if (isBirthDateInputCompleted) {
      if (addressRef.current) addressRef.current?.focus();
    } else if (birthDate.length === 6) {
      if (genderRef.current) genderRef.current?.focus();
    } else if (birthDateRef.current) birthDateRef.current?.focus();
  }, [birthDate, isPhoneNumberInputCompleted, isBirthDateInputCompleted]);

  useEffect(() => {
    if (
      birthDate.length === 6 &&
      GENDER_REGEX.test(gender) &&
      birthDateErrorMessage === ''
    )
      setIsBirthDateInputCompleted(true);
  }, [birthDate, gender, birthDateErrorMessage]);

  const formatBirthDate = (yymmdd: string) => {
    const birthYear: string =
      parseInt(yymmdd.slice(0, 2), 10) > 25
        ? `19${yymmdd.slice(0, 2)}`
        : `20${yymmdd.slice(0, 2)}`;
    const formattedBirthDate = `${birthYear}-${yymmdd.slice(
      2,
      4
    )}-${yymmdd.slice(4, 6)}`;
    return formattedBirthDate;
  };

  const handleSignUp = async () => {
    try {
      const formattedBirthDate = await formatBirthDate(birthDate);

      const response = await axios.post('http://localhost:8080/register', {
        memberId: webViewData.data.memberId,
        password: webViewData.data.password,
        name: webViewData.data.name,
        nickname: webViewData.data.nickname,
        address: {
          firstAddr: address.split(' ')[0],
          secondAddr: address.split(' ')[1],
          thirdAddr: address.split(' ')[2],
        },
        sex: webViewData.data.sex,
        birthDate: formattedBirthDate,
        phoneNumber,
        social: true,
      });
      if (response.state >= 400) throw new Error();
      Alert.alert(
        '소셜 회원가입 성공!',
        '네이버 혹은 카카오 로그인 버튼을 눌러 로그인해주세요.'
      );
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('회원가입 실패', '다시 시도해주세요');
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>추가 정보 입력</Text>
        <Text style={styles.subTitle}>
          원활한 서비스 이용을 위해 추가 정보를 입력해주세요.
        </Text>

        {isPhoneNumberInputCompleted && isBirthDateInputCompleted && (
          <Animated.View
            style={{
              opacity: addressOpacity,
            }}
          >
            <Text style={styles.label}>주소지 설정</Text>
            <Picker
              ref={addressRef}
              selectedValue={address}
              onValueChange={(itemValue) => {
                setAddress(itemValue);
              }}
              style={styles.addressInput}
            >
              <Picker.Item
                label="수원시 영통구 원천동"
                value="수원시 영통구 원천동"
              />
            </Picker>
          </Animated.View>
        )}

        {isPhoneNumberInputCompleted && (
          <Animated.View
            style={{
              opacity: birthDateOpacity,
            }}
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

        <View>
          <Text
            style={
              isPhoneNumberInputCompleted ? styles.label_disabled : styles.label
            }
          >
            전화번호
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={
                isPhoneNumberInputCompleted
                  ? styles.input_disabled
                  : styles.input
              }
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              ref={phoneNumberRef}
              editable={!isPhoneNumberInputCompleted}
              selectTextOnFocus={!isPhoneNumberInputCompleted}
            />
          </View>
        </View>
        {phoneNumberErrorMessage !== '' && (
          <Text style={styles.errorMessage}>{phoneNumberErrorMessage}</Text>
        )}
      </View>

      {isPhoneNumberInputCompleted && isBirthDateInputCompleted ? (
        <View style={styles.buttonContainer}>
          <Pressable
            style={address ? styles.button : styles.button_disabled}
            disabled={!address && !isPhoneNumberInputCompleted && !birthDate}
            onPress={handleSignUp}
          >
            <Text style={styles.buttonText}>다음</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Pressable
            style={
              phoneNumber &&
              !phoneNumberErrorMessage &&
              !isPhoneNumberInputCompleted
                ? styles.button
                : styles.button_disabled
            }
            disabled={phoneNumberErrorMessage !== '' || !phoneNumber}
            onPress={() => {
              setIsPhoneNumberInputCompleted(true);
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
  label_disabled: {
    fontSize: 14,
    fontWeight: 'bold',
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
    borderWidth: 1.5,
    borderColor: color.offBlack,
    borderRadius: 3.5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    color: color.offBlack,
    flex: 0.05,
  },
  input_gender_disabled: {
    borderWidth: 1.5,
    borderColor: color.disabled_01,
    borderRadius: 3.5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    color: color.disabled_01,
    flex: 0.05,
  },
  genderContainer: {
    paddingTop: 10,
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressInput: {
    borderWidth: 1.5,
    borderColor: color.offBlack,
    borderRadius: 3.5,
    marginBottom: 10,
  },
});
