import { Text, View, StyleSheet, Pressable } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Header(): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.locationText}>영통구</Text>
        <Icon name="keyboard-arrow-down" size={25} color="#333" />
      </View>
      <Pressable
        onPress={() => {
          console.log('Search');
        }}
      >
        <Icon name="search" size={25} color="#333" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 5,
  },
  rightContainer: {},
});
