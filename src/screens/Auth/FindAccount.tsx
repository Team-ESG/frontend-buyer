import { View, Text, StyleSheet } from 'react-native';

export default function FindAccount(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>FindAccount</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
