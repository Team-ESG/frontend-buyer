// home screen component with tsx
import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function Favorites({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text>Favorites Screen</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('MarketDetail')}
      >
        <Text style={styles.buttonText}>가게 상세</Text>
      </Pressable>
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
