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
import { useRecoilState } from 'recoil';

const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9]{2,10}$/;
const NICKNAME_ERROR_MESSAGE = '닉네임을 두 글자 이상 입력해주세요.';
const DUPLICATE_NICKNAME_ERROR_MESSAGE = '이미 사용중인 닉네임 이에요.';

export default function EditNickname({ navigation }: any) {
  const [user, setUser] = useRecoilState(userState);
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');
  const [nickname, setNickname] = useState('');

  const handleEditNickname = async () => {
    try {
      const response = await axios.patch(
        'http://localhost:8080/auth/info/reset/nickname',
        {
          nickname,
        },
        {
          headers: {
            authorization: user?.accessToken,
          },
        }
      );
      setUser({
        ...user,
        nickname,
      });
      if (response.state >= 400) throw new Error();
    } catch (err) {
      console.log(err);
      setNicknameErrorMessage(DUPLICATE_NICKNAME_ERROR_MESSAGE);
    }
  };

  useEffect(() => {
    setNicknameErrorMessage('');
    if (nickname && !NICKNAME_REGEX.test(nickname)) {
      setNicknameErrorMessage(NICKNAME_ERROR_MESSAGE);
    }
  }, [nickname]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>새로운 닉네임을 입력해주세요</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
            placeholder="닉네임"
          />
        </View>
        {nicknameErrorMessage !== '' && (
          <Text style={styles.errorMessage}>{nicknameErrorMessage}</Text>
        )}
      </View>
      <Pressable
        style={
          nickname && !nicknameErrorMessage
            ? styles.button
            : styles.button_disabled
        }
        onPress={handleEditNickname}
        disabled={nicknameErrorMessage !== '' || !nickname}
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
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1.5,
    borderColor: color.brown,
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 16,
    color: color.brown,
    flex: 1,
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
    fontWeight: 'bold',
    color: '#FFF',
  },
});
