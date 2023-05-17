import { userState } from '@recoil/auth';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import testImg from '@lib/img/testImg.jpeg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRecoilValue } from 'recoil';
import axios from 'axios';

export default function CartCard(params) {
  const {
    itemId,
    isSold,
    discountPrice,
    itemQuantity,
    marketName,
    name,
    originalPrice,
    shoppingCartListedItemQuantity,
    index,
    setTotalCount,
    setTotalPrice,
    setData,
  } = params;
  const [buyCount, setBuyCount] = useState(shoppingCartListedItemQuantity);
  const user = useRecoilValue(userState);

  const onPressCountMinus = () => {
    if (buyCount > 1) {
      axios
        .post(
          `http://localhost:8080/main/item/cart`,
          {
            itemId: itemId,
            quantity: buyCount - 1,
          },
          {
            headers: {
              authorization: `Bearer ${user?.accessToken}`,
            },
          }
        )
        .then((res) => {
          setTotalCount((prev: number) => prev - 1);
          setTotalPrice((prev: number) => prev - discountPrice);
          setBuyCount(buyCount - 1);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onPressCountPlus = () => {
    if (buyCount !== itemQuantity) {
      axios
        .post(
          `http://localhost:8080/main/item/cart`,
          {
            itemId: itemId,
            quantity: buyCount + 1,
          },
          {
            headers: {
              authorization: `Bearer ${user?.accessToken}`,
            },
          }
        )
        .then((res) => {
          setTotalCount((prev: number) => prev + 1);
          setTotalPrice((prev: number) => prev + discountPrice);
          setBuyCount(buyCount + 1);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onPressCartClear = () => {
    axios
      .post(
        `http://localhost:8080/main/cart/delete/${index + 1}`,
        {},
        {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        }
      )
      .then((res) => {
        setData((prev: any) => prev.filter((el: any) => el.itemId !== itemId));
        setTotalCount((prev: number) => prev - buyCount);
        setTotalPrice((prev: number) => prev - discountPrice * buyCount);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onPressCartSoldOutClear = () => {
    axios
      .post(
        `http://localhost:8080/main/cart/delete/${index + 1}`,
        {},
        {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        }
      )
      .then((res) => {
        setData((prev: any) => prev.filter((el: any) => el.itemId !== itemId));
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
          <Text style={{ color: '#787878' }}>{marketName}</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{name}</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Text
              style={{
                color: '#787878',
                textDecorationLine: 'line-through',
                textDecorationColor: '#787878',
              }}
            >
              {originalPrice?.toLocaleString('ko-KR')}원
            </Text>
            <Text style={{ color: 'red' }}>
              {100 - ((discountPrice / originalPrice) * 100).toFixed(0)}%
            </Text>
          </View>
          <Text
            style={{
              color: '#433518',
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            {discountPrice?.toLocaleString('ko-KR')}원
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
              color={buyCount === itemQuantity ? '#78787850' : '#787878'}
              onPress={onPressCountPlus}
            />
            <Text
              style={{
                color: '#433518',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              {(discountPrice * buyCount).toLocaleString('ko-KR')}원
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
      {isSold === 'True' && (
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
            onPress={onPressCartSoldOutClear}
          />
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
            SOLD OUT
          </Text>
        </View>
      )}
    </View>
  );
}
