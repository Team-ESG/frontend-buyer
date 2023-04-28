// home screen component with tsx
import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function MyPage({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text>마이페이지</Text>
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
