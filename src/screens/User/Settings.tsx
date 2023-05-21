import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import color from '@lib/color/color';
import { userState } from '@recoil/auth';
import BackIcon from 'react-native-vector-icons/MaterialIcons';
import { useSetRecoilState } from 'recoil';
import { removeTokens } from 'src/utils/storageHelper';

export default function Settings({ navigation }: any): JSX.Element {
  const setUser = useSetRecoilState(userState);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackIcon
          name="arrow-back-ios"
          style={styles.headerIcon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>환경설정</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.settingList}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#eee' : '#fff',
              },
              styles.settingItem,
            ]}
            onPress={() => {
              removeTokens();
              setUser(null);
            }}
          >
            <Text style={styles.settingTitle}>로그아웃</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 19,
    fontWeight: '600',
    color: color.brown,
  },
  headerIcon: {
    position: 'absolute',
    left: 20,
    fontSize: 24,
    color: color.brown,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  settingList: {
    width: '100%',
  },
  settingItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: '#eee',
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
