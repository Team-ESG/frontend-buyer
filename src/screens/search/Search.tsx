// home screen component with tsx
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Search({ navigation }: any) {
  const [searchWord, setSearchWord] = React.useState<string>('');
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Icon
          name="arrow-back-ios"
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.imageContainer}>
          <View style={styles.section}>
            <Icon name="search" size={24} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="오늘 뭐먹지?"
              value={searchWord}
              onChangeText={setSearchWord}
              onSubmitEditing={() => {
                if (searchWord !== '') {
                  navigation.navigate('SearchResults', { searchWord });
                }
              }}
            />
          </View>
        </View>
        <View style={styles.searchWordContainer}>
          <View style={styles.searchWordCircle}>
            <Text
              onPress={() => {
                navigation.navigate('SearchResults', { searchWord: '사과' });
              }}
              style={styles.searchWordText}
            >
              사과
            </Text>
          </View>
          <View style={styles.searchWordCircle}>
            <Text
              onPress={() => {
                navigation.navigate('SearchResults', {
                  searchWord: '파인애플',
                });
              }}
              style={styles.searchWordText}
            >
              파인애플
            </Text>
          </View>
          <View style={styles.searchWordCircle}>
            <Text
              onPress={() => {
                navigation.navigate('SearchResults', { searchWord: '모카빵' });
              }}
              style={styles.searchWordText}
            >
              모카빵
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backBtn: {
    position: 'absolute',
    top: 25,
    left: 20,
    zIndex: 1,
    color: '#ffffff',
    fontSize: 24,
  },
  imageContainer: {
    backgroundColor: 'rgba(73,172,106,0.7)',
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
    height: 150,
    justifyContent: 'flex-end',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 45,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 2.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  input: {
    fontSize: 14,
    color: '#433518',
    flex: 0.9,
  },
  icon: {
    flex: 0.1,
    color: '#80c597',
  },
  searchWordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  searchWordCircle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#80c597',
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
    flex: 0.3,
    backgroundColor: '#fff',
    shadowColor: '#787878',
    shadowOpacity: 0.25,
    shadowOffset: {
      height: 5,
      width: 0,
    },
    zIndex: 99,
    elevation: 5,
  },
  searchWordText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#787878',
  },
});
