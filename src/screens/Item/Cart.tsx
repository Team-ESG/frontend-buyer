// home screen component with tsx
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import testImg from '@lib/img/testImg.jpeg';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/auth';
import { useFocusEffect } from '@react-navigation/native';
import color from '@lib/color/color';

function CartCard(params: any) {
  const { item, setTotalCount, setTotalPrice, setData } = params;
  const [buyCount, setBuyCount] = useState(item.shoppingCartListedItemQuantity);
  const user = useRecoilValue(userState);

  const onPressCountMinus = () => {
    if (buyCount > 1) {
      setTotalCount((prev: number) => prev - 1);
      setTotalPrice((prev: number) => prev - item.discountPrice);
      setBuyCount(buyCount - 1);
    }
  };

  const onPressCountPlus = () => {
    if (buyCount !== item.itemQuantity) {
      setTotalCount((prev: number) => prev + 1);
      setTotalPrice((prev: number) => prev + item.discountPrice);
      setBuyCount(buyCount + 1);
    }
  };

  const onPressCartClear = () => {
    axios
      .post(
        `http://localhost:8080/main/cart/delete/${item.index}`,
        {},
        {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        }
      )
      .then((res) => {
        setData((prev: any) =>
          prev.filter((el: any) => el.index !== item.index)
        );
        setTotalCount((prev: number) => prev - buyCount);
        setTotalPrice((prev: number) => prev - item.discountPrice * buyCount);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#78787850',
        }}
      >
        <Image
          source={testImg}
          style={{ borderRadius: 18, flex: 1, aspectRatio: 1 }}
        />
        <View style={{ flex: 1, gap: 5, padding: 20 }}>
          <Text style={{ color: '#787878' }}>{item.marketName}</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Text
              style={{
                color: '#787878',
                textDecorationLine: 'line-through',
                textDecorationColor: '#787878',
              }}
            >
              {item.originalPrice?.toLocaleString('ko-KR')}원
            </Text>
            <Text style={{ color: 'red' }}>
              {100 -
                ((item.discountPrice / item.originalPrice) * 100).toFixed(0)}
              %
            </Text>
          </View>
          <Text
            style={{
              color: '#433518',
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            {item.discountPrice?.toLocaleString('ko-KR')}원
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              marginTop: 20,
              alignItems: 'center',
            }}
          >
            <Icon
              name="remove-circle-outline"
              size={24}
              color={buyCount === 1 ? '#78787850' : '#787878'}
              onPress={onPressCountMinus}
            />
            <Text style={{ fontWeight: 'bold' }}>{buyCount}</Text>
            <Icon
              name="add-circle-outline"
              size={24}
              color={buyCount === item.itemQuantity ? '#78787850' : '#787878'}
              onPress={onPressCountPlus}
            />
            <Text
              style={{
                color: '#433518',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              {(item.discountPrice * buyCount).toLocaleString('ko-KR')}원
            </Text>
          </View>
        </View>
        <Icon
          style={{ position: 'absolute', top: 20, right: 20 }}
          name="clear"
          size={24}
          color="#787878"
          onPress={onPressCartClear}
        />
      </View>
      {item.isSold === 'True' && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: '#00000090',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon
            style={{ position: 'absolute', top: 20, right: 20 }}
            name="clear"
            size={24}
            color="white"
          />
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
            SOLD OUT
          </Text>
        </View>
      )}
    </View>
  );
}

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
          const data = res.data.data;
          data.forEach((item: any) => {
            setTotalCount((prev) => prev + item.shoppingCartListedItemQuantity);
            setTotalPrice((prev) => prev + item.totalPrice);
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
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ marginBottom: 120 }}>
          {data?.map((item, index) => (
            <CartCard
              key={index}
              item={item}
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
        <View
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
        </View>
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
