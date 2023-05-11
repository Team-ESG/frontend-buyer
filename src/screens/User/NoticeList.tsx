import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import color from '@lib/color/color';
import axios from 'axios';
import BackIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default function NoticeList({ navigation }: any): JSX.Element {
  const [noticeList, setNoticeList] = useState([]);

  useEffect(() => {
    const getNoticeList = async () => {
      const res = await axios.get('http://localhost:8080/notice/all');
      setNoticeList(res.data.data);
    };
    getNoticeList();
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
        <View style={styles.noticeList}>
          {noticeList.length > 0 &&
            noticeList.map((item) => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#eee' : '#fff',
                  },
                  styles.noticeItem,
                ]}
                onPress={() =>
                  navigation.navigate('NoticeDetail', { id: item.id })
                }
              >
                <Text style={styles.noticeTitle}>{item.title}</Text>
                <Icon name="arrow-right" size={16} color="grey" />
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
  },
  noticeList: {
    width: '100%',
  },
  noticeItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: '#eee',
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});
