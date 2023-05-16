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

import color from '@lib/color/color';
import marketImg from '@lib/img/market.png';
import { useIsFocused } from '@react-navigation/native';
import { userState } from '@recoil/auth';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRecoilState } from 'recoil';

export default function Favorites({ navigation }: any) {
  const [user, setUser] = useRecoilState(userState);
  const [ItemList, setItemList] = useState<any>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchWishList = async () => {
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
        setItemList(response.data.data);
        // console.log(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    if (isFocused) fetchWishList();
  }, [isFocused, user?.accessToken]);

  const handleFavorite = async (marketId: any) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/market/${marketId}/control`,
        {
          memberId: user?.id,
        },
        { headers: { authorization: `Bearer ${user?.accessToken}` } }
      );
      if (response.data.state !== 200) throw new Error();
      setUser((currentUser) => {
        if (currentUser) {
          let updatedWishList = [];
          if (currentUser.wishList.includes(marketId)) {
            updatedWishList = currentUser.wishList.pop(marketId);
          } else {
            updatedWishList = [...currentUser.wishList, marketId];
          }
          return { ...currentUser, wishList: updatedWishList };
        }
        return currentUser;
      });
    } catch (e) {
      console.log(e);
      Alert.alert('찜 오류', '다시 시도해주세요.');
    }
  };

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
          ItemList.map((item: any) => (
            <Pressable
              key={item.marketId}
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
                  {item.name}
                </Text>
                <Text numberOfLines={2} style={styles.descText}>
                  {item.address.firstAddr} {item.address.secondAddr}{' '}
                  {item.address.thirdAddr}
                  {/* 수원시 영통구 원천동 원천동 104호 */}
                </Text>
              </View>
              <View style={styles.itemHeartContainer}>
                <Icon
                  name="heart"
                  size={24}
                  color="#dc143c"
                  onPress={() => handleFavorite(item.id)}
                />
              </View>
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
    paddingVertical: 17,
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
    color: color.offBlack,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  itemHeartContainer: {
    flex: 0.1,
    alignItems: 'flex-end',
    marginBottom: 60,
  },
});
