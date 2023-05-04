import { View, Text, StyleSheet } from 'react-native';

export default function FindPassword(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>FindPassword</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
