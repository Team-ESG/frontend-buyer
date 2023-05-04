/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from 'react-native';

import useFocus from '@hooks/useFocus';
import color from '@lib/img/color/color';

const ID_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const ID_ERROR_MESSAGE = '올바른 이메일 형식을 입력해주세요.';
const DUPLICATE_ID_ERROR_MESSAGE = '이미 가입된 이메일 이에요.';

function IdInputScreen({ id, setId, goToNextStep }: any): JSX.Element {
  const [idErrorMessage, setIdErrorMessage] = useState('');
  const idRef = useFocus<TextInput>();

  // 유효성 검사
  useEffect(() => {
    setIdErrorMessage('');

    if (id && !ID_REGEX.test(id)) {
      setIdErrorMessage(ID_ERROR_MESSAGE);
    }
  }, [id]);

  const handleCheckDuplicateId = async () => {
    try {
      /* Todo: 아이디 중복 확인 코드 */
      // const response = await axios.get(`http://localhost:8080/register/check/id/${id}`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      // if (response.state >= 400) throw new Error();
      goToNextStep();
    } catch (error) {
      setIdErrorMessage(DUPLICATE_ID_ERROR_MESSAGE);
    }
  };

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
          style={id && !idErrorMessage ? styles.button : styles.button_disabled}
          onPress={handleCheckDuplicateId}
          disabled={idErrorMessage === ID_ERROR_MESSAGE || !id}
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
export default IdInputScreen;
