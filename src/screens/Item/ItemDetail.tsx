import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ImageBackground,
  ScrollView,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import testMarket from '@lib/img/market.png';
import testImg from '@lib/img/testImg.jpeg';
import { userState } from '@recoil/auth';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRecoilValue } from 'recoil';

export default function ItemDetail({ navigation, route }: any) {
  const user = useRecoilValue(userState);
  const [item, setItem] = useState({} as any);
  const [buyCount, setBuyCount] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/main/item/${route.params.id}`)
      .then((res) => {
        setItem(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onPressCountMinus = () => {
    if (buyCount > 1) {
      setBuyCount(buyCount - 1);
    }
  };

  const onPressCountPlus = () => {
    if (buyCount !== item.itemQuantity) {
      setBuyCount(buyCount + 1);
    }
  };

  const onPressAddCart = () => {
    axios
      .post(
        'http://localhost:8080/main/item/cart',
        {
          itemId: route.params.id,
          quantity: buyCount,
        },
        {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        }
      )
      .then((res) => {
        Alert.alert('장바구니에 추가되었습니다.');
        console.log(res.data);
      })
      .catch((err) => {
        Alert.alert('장바구니 담기에 실패하였습니다.');
        console.log(err);
      });
  };

  const onPressBuy = () => {
    axios
      .post(
        `http://localhost:8080/main/item/reserve`,
        {
          itemId: route.params.id,
          quantity: buyCount,
        },
        {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        }
      )
      .then((res) => {
        Alert.alert('예약이 완료되었습니다.');
        console.log(res.data);
      })
      .catch((err) => {
        Alert.alert('예약에 실패하였습니다.');
        console.log(err);
      });
  };
  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          position: 'absolute',
          zIndex: 9999,
          marginLeft: 20,
        }}
      >
        <Pressable
          style={{
            width: 24,
            height: 24,
            top: 15,
          }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back-ios" size={24} color="#fff" />
        </Pressable>
      </SafeAreaView>
      <ScrollView>
        <View>
          <ImageBackground
            style={{ width: '100%', aspectRatio: 1 }}
            source={testImg}
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              height: 80,
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              borderBottomLeftRadius: 18,
              borderBottomRightRadius: 18,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderBottomWidth: 1,
              borderBottomColor: '#787878',
              borderLeftColor: '#787878',
              borderRightColor: '#787878',
              backgroundColor: '#fff',
              shadowColor: '#787878',
              shadowOpacity: 0.25,
              shadowOffset: {
                height: 5,
                width: 0,
              },
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image
                style={{ width: 48, height: 48 }}
                borderRadius={24}
                source={testMarket}
              />
              <View style={{ marginLeft: 20, gap: 5 }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#433518',
                    fontWeight: 'bold',
                  }}
                >
                  {item.marketName}
                </Text>
                <Text style={{ fontSize: 14, color: '#787878' }}>
                  {`${item.address?.firstAddr} ${item.address?.secondAddr} ${item.address?.thirdAddr}`}
                </Text>
              </View>
            </View>
            <Pressable
              style={{
                width: 100,
                height: 48,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 24,
                backgroundColor: '#80C597',
              }}
              onPress={() =>
                navigation.navigate('MarketDetail', { marketId: item.marketId })
              }
            >
              <Text
                style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}
              >
                매장정보
              </Text>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            padding: 20,
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 14, color: '#787878' }}>
            {item.marketName}
          </Text>
          <Text style={{ fontSize: 16, color: '#433518', fontWeight: 'bold' }}>
            {item.name}
          </Text>
          <Text style={{ fontSize: 14, marginBottom: 40 }}>
            {item.itemDetail}
          </Text>
        </View>
      </ScrollView>
      <View>
        <View
          style={{
            position: 'absolute',
            top: -40,
            backgroundColor: '#80C597',
            width: 150,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            marginLeft: 40,
          }}
        >
          <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
            {`유통기한 ${
              item.expirationDate?.length &&
              `${item.expirationDate[0]}.${item.expirationDate[1]}.${item.expirationDate[2]}`
            }`}
          </Text>
        </View>
        <View
          style={{
            borderTopColor: '#78787850',
            borderTopWidth: 1,
            backgroundColor: '#fff',
            shadowOffset: {
              height: -5,
              width: 0,
            },
            shadowColor: '#787878',
            shadowOpacity: 0.25,
            padding: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ gap: 5, marginLeft: 20 }}>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Text
                style={{
                  textDecorationLine: 'line-through',
                  textDecorationColor: '#787878',
                  textDecorationStyle: 'solid',
                }}
              >
                {item.originalPrice?.toLocaleString('ko-KR')}원
              </Text>
              <Text style={{ color: 'red', fontSize: 12 }}>
                {(
                  100 -
                  (item.discountPrice / item.originalPrice) * 100
                )?.toFixed(0)}
                %
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#433518',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                {item.discountPrice?.toLocaleString('ko-KR')}원
              </Text>
            </View>
          </View>
          <View
            style={{
              marginRight: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Icon
              name="remove-circle-outline"
              size={24}
              color={buyCount === 1 ? '#78787850' : '#787878'}
              onPress={onPressCountMinus}
            />
            <Text style={{ fontSize: 16 }}>{buyCount}</Text>
            <Icon
              name="add-circle-outline"
              size={24}
              color={buyCount === item.itemQuantity ? '#78787850' : '#787878'}
              onPress={onPressCountPlus}
            />
          </View>
        </View>
        <View
          style={{
            borderTopColor: '#78787850',
            borderTopWidth: 1,
            flexDirection: 'row',
            padding: 20,
            paddingLeft: 40,
            paddingRight: 40,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              borderRightColor: '#78787850',
              borderRightWidth: 1,
              paddingRight: 30,
            }}
          >
            <Pressable onPress={onPressAddCart}>
              <Icon name="add-shopping-cart" size={24} color="#787878" />
            </Pressable>
          </View>
          <View>
            <Text
              style={{ color: '#433518', fontSize: 20, fontWeight: 'bold' }}
            >
              {`총 ${(item.discountPrice * buyCount).toLocaleString(
                'ko-KR'
              )}원`}
            </Text>
          </View>
          <Pressable
            onPress={onPressBuy}
            style={{
              backgroundColor: '#80C597',
              padding: 10,
              paddingLeft: 15,
              paddingRight: 15,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              구매하기
            </Text>
          </Pressable>
        </View>
      </View>
      <SafeAreaView edges={['bottom']} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
