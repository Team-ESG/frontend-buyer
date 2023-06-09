import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';

import color from '@lib/color/color';
import { Picker } from '@react-native-picker/picker';
import { userState } from '@recoil/auth';
import axios from 'axios';
import { useRecoilState } from 'recoil';

export default function EditAddress({ setIsSubmitting }: any) {
  const [user, setUser] = useRecoilState(userState);
  const [address, setAddress] = useState('수원시 영통구 원천동');

  useEffect(() => {
    console.log(address.split(' ')[0]);
  }, []);

  const handleEditAddress = async () => {
    try {
      const response = await axios.patch(
        'http://52.78.81.8:8080/auth/info/reset/address',
        {
          firstAddr: address.split(' ')[0],
          secondAddr: address.split(' ')[1],
          thirdAddr: address.split(' ')[2],
        },
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      if (response.state >= 400) throw new Error();
      setUser({
        ...user,
        address: {
          firstAddr: address.split(' ')[0],
          secondAddr: address.split(' ')[1],
          thirdAddr: address.split(' ')[2],
        },
      });
      setIsSubmitting(true);
    } catch (err) {
      Alert.alert('주소 변경 오류', '다시 시도해주세요');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>새로운 주소를 입력해주세요</Text>

        <Picker
          selectedValue={address}
          onValueChange={(itemValue) => {
            setAddress(itemValue);
          }}
        >
          <Picker.Item
            label="수원시 영통구 원천동"
            value="수원시 영통구 원천동"
          />
        </Picker>
      </View>
      <Pressable style={styles.button} onPress={handleEditAddress}>
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
    fontWeight: '600',
    color: '#FFF',
  },
});
