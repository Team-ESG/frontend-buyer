// home screen component with tsx
import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

import { userState } from '@recoil/auth';
import { useSetRecoilState } from 'recoil';

export default function MyPage({ navigation }: any) {
  const setUser = useSetRecoilState(userState);
  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          console.log('로그아웃 버튼 클릭');
          setUser(null);
        }}
      >
        로그아웃
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#433518',
    // borderRadius: 5,
    paddingHorizontal: 25,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
