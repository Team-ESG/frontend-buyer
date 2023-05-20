// home screen component with tsx
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import CartCard from '@components/card/CartCard';
import color from '@lib/color/color';
import { useFocusEffect } from '@react-navigation/native';
import { userState } from '@recoil/auth';
import axios from 'axios';
import { useRecoilValue } from 'recoil';

export default function Cart({ navigation }: any) {
  const user = useRecoilValue(userState);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get('http://localhost:8080/main/cart', {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        })
        .then((res) => {
          const { data } = res.data;
          data.forEach((item: any) => {
            if (item.isSold === 'False') {
              setTotalCount(
                (prev) => prev + item.shoppingCartListedItemQuantity
              );
              setTotalPrice((prev) => prev + item.totalPrice);
              if (item.itemQuantity < item.shoppingCartListedItemQuantity) {
                const diff =
                  item.shoppingCartListedItemQuantity - item.itemQuantity;
                setTotalCount((prev) => prev - diff);
                setTotalPrice((prev) => prev - diff * item.discountPrice);
                Alert.alert(
                  `${item.name} 상품의 재고가 부족하여 개수를 조정하였습니다.`
                );
              }
            }
          });
          setData(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
      return () => {
        setTotalCount(0);
        setTotalPrice(0);
        setData([]);
      };
    }, [])
  );

  const onPressBuyAllItem = () => {
    if (totalCount === 0) {
      Alert.alert('구매할 상품이 없습니다.');
    } else {
      axios
        .post(
          `http://localhost:8080/main/cart/reserve`,
          {},
          {
            headers: {
              authorization: `Bearer ${user?.accessToken}`,
            },
          }
        )
        .then((res) => {
          Alert.alert('구매가 완료되었습니다.');
          console.log(res.data);
        })
        .catch((err) => {
          Alert.alert('구매에 실패하였습니다.');
          console.log(err.response.data);
        });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ marginBottom: 120 }}>
          {data?.map((item, index) => (
            <CartCard
              key={item.index}
              index={index}
              itemId={item.itemId}
              isSold={item.isSold}
              discountPrice={item.discountPrice}
              itemQuantity={item.itemQuantity}
              marketName={item.marketName}
              name={item.name}
              originalPrice={item.originalPrice}
              shoppingCartListedItemQuantity={
                item.shoppingCartListedItemQuantity
              }
              setTotalPrice={setTotalPrice}
              setTotalCount={setTotalCount}
              setData={setData}
            />
          ))}
        </View>
      </ScrollView>
      <View style={{ position: 'absolute', width: '100%', bottom: 0 }}>
        <View
          style={{
            height: 60,
            backgroundColor: 'white',
            shadowColor: '#000000',
            shadowOpacity: 0.1,
            shadowOffset: {
              width: 0,
              height: -3,
            },
            borderBottomWidth: 0,
            borderWidth: 1,
            borderColor: '#78787850',
            borderRadius: 18,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 14, color: '#787878', fontWeight: 'bold' }}>
            총 {totalCount}건
          </Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            {totalPrice.toLocaleString('ko-KR')}원
          </Text>
        </View>
        <Pressable
          onPress={onPressBuyAllItem}
          style={{
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: totalCount === 0 ? color.disabled_01 : color.green,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
            주문하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
