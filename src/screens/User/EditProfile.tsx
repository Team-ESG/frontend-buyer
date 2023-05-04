import { View, Text, StyleSheet } from 'react-native';

export default function EditProfile(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>EditProfile</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
