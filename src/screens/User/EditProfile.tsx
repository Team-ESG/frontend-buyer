import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import color from '@lib/color/color';
import kakaoLogo from '@lib/img/kakaoLogo.png';
import naverLogo from '@lib/img/naverLogo.png';
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
      content: user?.birthDate,
    },
    {
      id: 5,
      title: '휴대폰 번호',
      content: user?.phoneNumber,
    },
    {
      id: 6,
      title: '주소 변경',
      content: `${user?.address?.secondAddr} ${user?.address?.thirdAddr}`,
    },
    // {
    //   id: 7,
    //   title: '연동된 소셜 계정',
    // },
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
              {item.id === 2 || item.id === 4 || item.id === 5 ? (
                <Text style={styles.profileContent}>{item.content}</Text>
              ) : (
                <View style={styles.profileItemRight}>
                  <Text style={styles.profileContent} numberOfLines={1}>
                    {item.content}
                  </Text>
                  <Icon2 name="arrow-right" size={16} color="grey" />
                </View>
              )}
            </Pressable>
          ))}
          {user?.social && (
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#eee' : '#fff',
                },
                styles.profileItem,
              ]}
            >
              <Text style={styles.profileTitle}>연동된 소셜 계정</Text>
              <View style={styles.profileItemRight}>
                {user?.id.includes('naver') ? (
                  <Image source={naverLogo} style={styles.logo} />
                ) : (
                  <Image source={kakaoLogo} style={styles.logo} />
                )}
              </View>
            </Pressable>
          )}
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
    borderBottomWidth: 2,
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
    marginTop: 20,
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
  profileItemRight: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  profileTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  profileContent: {
    fontSize: 14,
    color: 'grey',
  },
  logo: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
