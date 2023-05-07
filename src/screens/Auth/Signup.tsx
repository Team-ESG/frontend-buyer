/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from 'react-native';

// eslint-disable-next-line import/no-extraneous-dependencies
import AddressInputScreen from '@components/Signup/AddressInput';
import IdInputScreen from '@components/Signup/IdInput';
import InfoInputScreen from '@components/Signup/InfoInput';
import PasswordInputScreen from '@components/Signup/PasswordInput';
import PhoneNumberInputScreen from '@components/Signup/PhoneNumberInput';
import color from '@lib/color/color';
import axios from 'axios';

function Signup({ navigation }: any): JSX.Element {
  const [step, setStep] = useState(1);
  // 1단계
  const [phoneNumber, setPhoneNumber] = useState('');
  // 2단계
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [nickname, setNickname] = useState('');
  // 3단계
  const [id, setId] = useState('');
  // 4단계
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  // 5단계
  const [address, setAddress] = useState('');

  const goToNextStep = () => {
    setStep((prev) => prev + 1);
  };

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

  const formatGender = (num: string) => {
    if (num === '1' || num === '3') return 'MAN';
    if (num === '2' || num === '4') return 'WOMAN';
    return '';
  };

  const handleSignUp = async () => {
    try {
      const formattedBirthDate = await formatBirthDate(birthDate);
      const formattedGender = await formatGender(gender);

      const response = await axios.post('http://localhost:8080/register', {
        memberId: id,
        password,
        name,
        nickname,
        address: {
          firstAddr: address.split(' ')[0],
          secondAddr: address.split(' ')[1],
          thirdAddr: address.split(' ')[2],
        },
        sex: formattedGender,
        birthDate: formattedBirthDate,
        phoneNumber,
        social: false,
      });
      if (response.state >= 400) throw new Error();
      Alert.alert('회원가입 성공', '로그인 페이지로 이동합니다.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('회원가입 실패', '다시 시도해주세요');
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
              <PhoneNumberInputScreen
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                goToNextStep={goToNextStep}
              />
            );
          case 2:
            return (
              <InfoInputScreen
                name={name}
                setName={setName}
                birthDate={birthDate}
                setBirthDate={setBirthDate}
                gender={gender}
                setGender={setGender}
                nickname={nickname}
                setNickname={setNickname}
                goToNextStep={goToNextStep}
              />
            );
          case 3:
            return (
              <IdInputScreen
                id={id}
                setId={setId}
                goToNextStep={goToNextStep}
              />
            );
          case 4:
            return (
              <PasswordInputScreen
                password={password}
                setPassword={setPassword}
                passwordConfirmation={passwordConfirmation}
                setPasswordConfirmation={setPasswordConfirmation}
                goToNextStep={goToNextStep}
              />
            );
          case 5:
            return (
              <SafeAreaView style={styles.wrapper}>
                <AddressInputScreen address={address} setAddress={setAddress} />
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
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default Signup;
