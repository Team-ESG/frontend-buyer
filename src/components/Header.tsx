import { Text, View, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Header(): JSX.Element {
  return (
    <View style={styles.background}>
      <SafeAreaView edges={['top']}>
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Text style={styles.locationText}>영통구</Text>
            <Icon name="keyboard-arrow-down" size={24} color="#333" />
          </View>
          <Pressable
            onPress={() => {
              console.log('Search');
            }}
          >
            <Icon name="search" size={24} color="#333" />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: '#787878',
    shadowOpacity: 0.25,
    shadowOffset: {
      height: 5,
      width: 0,
    },
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
