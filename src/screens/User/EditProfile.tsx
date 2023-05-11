import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import color from '@lib/color/color';
import { userState } from '@recoil/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackIcon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import { useRecoilState } from 'recoil';

export default function EditProfile({ navigation }: any): JSX.Element {
  const [user, setUser] = useRecoilState(userState);
  const profileList = [
    {
      id: 1,
      title: '닉네임',
      content: user?.nickname,
    },
    {
      id: 2,
      title: '이메일',
      content: user?.id,
    },
    {
      id: 3,
      title: '비밀번호 변경',
    },
    {
      id: 4,
      title: '생년월일',
    },
    {
      id: 5,
      title: '휴대폰 번호',
    },
    {
      id: 6,
      title: '주소 변경',
      content: user?.address?.firstAddress,
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackIcon
          name="arrow-back-ios"
          style={styles.headerIcon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>마이 페이지</Text>
      </View>
      <View style={styles.content}>
        <Icon name="user-circle" size={64} color={color.green} />
        <View style={styles.profileList}>
          {profileList.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#eee' : '#fff',
                },
                styles.profileItem,
              ]}
              onPress={
                item.id === 1 || item.id === 3 || item.id === 6
                  ? () => navigation.navigate('Edit', { title: item.title })
                  : () => {}
              }
            >
              <Text style={styles.profileTitle}>{item.title}</Text>
              {item.id !== 2 ? (
                <View style={{ flexDirection: 'row', gap: 15 }}>
                  <Text style={styles.profileContent}>{item.content}</Text>
                  <Icon2 name="arrow-right" size={16} color="grey" />
                </View>
              ) : (
                <Text style={styles.profileContent}>{item.content}</Text>
              )}
            </Pressable>
          ))}
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
    fontWeight: 'bold',
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
    marginTop: 20,
    // justifyContent: 'center',
  },
  profileList: {
    width: '100%',
    marginTop: 20,
  },
  profileItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  profileTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  profileContent: {
    fontSize: 14,
    color: 'grey',
  },
});
