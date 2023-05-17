import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

export default function HeaderSocial(): JSX.Element {
  const navigation = useNavigation();

  const handleExitButtonPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.background}>
      <SafeAreaView edges={['top']}>
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Icon
              name="x"
              size={24}
              color="#333"
              onPress={handleExitButtonPress}
            />
          </View>
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
    elevation: 10,
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
