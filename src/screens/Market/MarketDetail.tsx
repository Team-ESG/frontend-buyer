// home screen component with tsx
import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function MarketDetail({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text>MarketDetail Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  signupButton: {
    borderWidth: 1,
    margin: 10,
  },
});
