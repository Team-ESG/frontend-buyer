import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import color from '@lib/color/color';
import { userState } from '@recoil/auth';
import axios from 'axios';
import BackIcon from 'react-native-vector-icons/MaterialIcons';
import { useRecoilValue } from 'recoil';

export default function NoticeDetail({ navigation, route }: any): JSX.Element {
  const user = useRecoilValue(userState);
  const [noticeInfo, setNoticeInfo] = useState<any>({});

  useEffect(() => {
    const getNoticeInfo = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/notice/${route.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          }
        );
        if (res.data.state !== 200) throw new Error();
        setNoticeInfo(res.data.data);
      } catch (e) {
        Alert.alert('공지사항을 불러오는데 실패했습니다.');
        navigation.goBack();
      }
    };
    getNoticeInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackIcon
          name="arrow-back-ios"
          style={styles.headerIcon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>공지사항</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.noticeTitle}>
          <Text style={styles.noticeTitleText}>{noticeInfo.title}</Text>
          <Text style={styles.noticeDateText}>
            {new Date(noticeInfo.writeDate).toLocaleDateString('ko-KR')}
          </Text>
        </View>
        <View style={styles.noticeContent}>
          <Text style={styles.noticeContentText}>{noticeInfo.content}</Text>
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
  },
  profileList: {
    width: '100%',
    marginTop: 10,
  },
  noticeTitle: {
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    gap: 10,
  },
  noticeTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  noticeDateText: {
    fontSize: 14,
    color: '#333',
  },
  noticeContent: {
    width: '100%',
    paddingVertical: 20,
    // paddingHorizontal: 20,
    paddingLeft: 20,
    paddingRight: 40,
  },
  noticeContentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
