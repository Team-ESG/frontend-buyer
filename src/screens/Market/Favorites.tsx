// home screen component with tsx
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  Alert,
} from 'react-native';

import marketImg from '@lib/img/market.png';
import { userState } from '@recoil/auth';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRecoilValue } from 'recoil';

export default function Favorites({ navigation }: any) {
  const user = useRecoilValue(userState);
  const [ItemList, setItemList] = useState<any>(null);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/main/wishList',
          {
            headers: {
              authorization: `Bearer ${user?.accessToken}`,
            },
          }
        );
        if (response.data.state !== 200) throw new Error();
        console.log(response.data);
        setItemList(response.data.data);
      } catch (e) {
        Alert.alert('잘못된 접근입니다.', '홈 화면으로 이동합니다.');
        navigation.navigate('Home');
      }
    };
    fetchList();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.outerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>찜한 가게</Text>
          <View style={styles.totalCountCircle}>
            <Text style={styles.totalCountText}>총 {ItemList?.length}개</Text>
          </View>
        </View>
      </View>

      <ScrollView>
        {ItemList &&
          ItemList.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#eee' : '#fff',
                },
                styles.itemContainer,
              ]}
              onPress={() => navigation.navigate('MarketDetail')}
            >
              <View style={styles.imageContainer}>
                <Image style={styles.itemImage} source={marketImg} />
              </View>
              <View style={styles.itemTextContainer}>
                <Text numberOfLines={1} style={styles.itemText}>
                  {item.title}
                </Text>
                <Text numberOfLines={1} style={styles.descText}>
                  {item.desc}
                </Text>
                {/* <Text numberOfLines={1} style={styles.descText}>
                {item.desc}
              </Text> */}
              </View>
              {/* <View style={styles.itemHeartContainer}>
              <Icon name="heart" size={25} color="red" />
            </View> */}
            </Pressable>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  outerContainer: {
    shadowColor: '#000',
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#80c597',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 3,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFF',
  },
  totalCountCircle: {
    height: 23,
    borderRadius: 15,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginLeft: 15,
  },
  totalCountText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#80c597',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#eee',
    paddingHorizontal: 20,
    paddingVertical: 23,
  },
  imageContainer: {
    flex: 0.3,
    width: 90,
    height: 90,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  itemTextContainer: {
    height: '95%',
    flex: 0.7,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#433518',
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 2.5,
  },
  descText: {
    fontSize: 13,
    color: '#7e7e7e',
    marginHorizontal: 15,
    marginVertical: 5,
  },
  itemHeartContainer: {
    flex: 0.1,
    alignItems: 'flex-end',
  },
});
