// home screen component with tsx
import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import color from '@lib/color/color';
import { userState } from '@recoil/auth';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useRecoilState } from 'recoil';

const menuList = [
  {
    id: 1,
    icon: 'bag',
    title: '구매내역',
    target: 'PurchaseHistory',
  },
  {
    id: 2,
    icon: 'settings',
    title: '환경설정',
  },
];

const systemList = [
  {
    id: 1,
    title: '공지사항',
    target: 'Notice',
  },
  {
    id: 2,
    title: '약관 및 정책',
    target: 'Policy',
  },
  {
    id: 3,
    title: '버전정보',
  },
];

export default function MyPage({ navigation }: any) {
  const [user, setUser] = useRecoilState(userState);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>마이 페이지</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.topContainer}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#eee' : '#fff',
              },
              styles.profileContainer,
            ]}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <View style={styles.profileLeft}>
              <Icon2 name="user-circle" size={64} color={color.green} />
              <Text style={styles.profileText} numberOfLines={1}>
                {user?.nickname}
              </Text>
            </View>
            <Icon name="arrow-right" size={24} />
          </Pressable>
          <View style={styles.menuContainer}>
            {menuList.map((menu) => (
              <Pressable
                key={menu.id}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#eee' : '#fff',
                  },
                  styles.menu,
                ]}
                onPress={
                  menu.id === 1
                    ? () => navigation.navigate(menu.target)
                    : () => setUser(null)
                }
              >
                <Icon name={menu.icon} size={24} color="#333" />
                <Text style={{ color: '#333', fontWeight: 'bold' }}>
                  {menu.title}
                </Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.disCountContainer}>
            <Text style={styles.disCountText}>
              현재까지 총 {user?.discountPrice}원 할인 받았어요!
            </Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.menuContainer}>
            {systemList.map((menu) => (
              <Pressable
                key={menu.id}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#eee' : '#fff',
                  },
                  styles.systemMenu,
                ]}
                onPress={
                  menu.id === 3
                    ? () => {}
                    : () => navigation.navigate(menu.target)
                }
              >
                <Text style={{ color: '#333' }}>{menu.title}</Text>
                {menu.id === 3 ? (
                  <Text style={{ color: '#333' }}>1.0.0</Text>
                ) : (
                  <Icon name="arrow-right" size={14} />
                )}
              </Pressable>
            ))}
          </View>
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
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: color.brown,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topContainer: {
    flex: 0.5,
  },
  bottomContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
    paddingVertical: 20,
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
  },
  profileText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  menuContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  menu: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 10,
  },
  systemMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  disCountContainer: {
    alignItems: 'center',
    backgroundColor: color.green,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginVertical: 30,
    marginHorizontal: 10,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  disCountText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
