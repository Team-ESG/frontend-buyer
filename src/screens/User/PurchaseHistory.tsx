import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import color from '@lib/color/color';
import testImg from '@lib/img/testImg.jpeg';
import { useFocusEffect } from '@react-navigation/native';
import { userState } from '@recoil/auth';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRecoilValue } from 'recoil';

export default function PurchaseHistory({ navigation }: any) {
  const [data, setData] = useState([]);
  const user = useRecoilValue(userState);

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get('http://localhost:8080/main/reserveList', {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        })
        .then((res) => {
          setData(res.data.data);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      return () => {};
    }, [])
  );

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <SafeAreaView edges={['top']}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            paddingVertical: 15,
            shadowColor: '#787878',
            shadowOpacity: 0.25,
            shadowOffset: {
              height: 5,
              width: 0,
            },
          }}
        >
          <Pressable
            style={{
              marginLeft: 20,
              width: 24,
              height: 24,
            }}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back-ios" size={24} color="#000" />
          </Pressable>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>주문내역</Text>
          <Pressable
            style={{
              marginLeft: 'auto',
              marginRight: 20,
              width: 24,
              height: 24,
            }}
            onPress={() => navigation.navigate('Search')}
          >
            <Icon name="search" size={24} color="#000" />
          </Pressable>
        </View>
      </SafeAreaView>
      <ScrollView>
        {data.map((item: any, index: number) => (
          <View
            key={index}
            style={{
              padding: 40,
              borderBottomColor: '#78787850',
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#787878', fontSize: 14 }}>
                {`${item.reserveDate[0]}.${item.reserveDate[1].toLocaleString(
                  'ko-KR',
                  {
                    minimumIntegerDigits: 2,
                  }
                )}.${item.reserveDate[2].toLocaleString('ko-KR', {
                  minimumIntegerDigits: 2,
                })}(${
                  ['일', '월', '화', '수', '목', '금', '토'][
                    new Date(
                      `${item.reserveDate[0]}-${item.reserveDate[1]}-${item.reserveDate[2]}`
                    ).getDay()
                  ]
                })` +
                  ` ${
                    item.isSuccess === 'RESERVED'
                      ? '픽업예정'
                      : item.isSuccess === 'RESERVE_FAIL'
                      ? '구매실패'
                      : '구매완료'
                  }`}
              </Text>
              <Pressable
                onPress={() =>
                  navigation.navigate('PurchaseHistoryDetail', {
                    reserveId: item.reserveId,
                  })
                }
                style={{
                  backgroundColor: '#fff',
                  padding: 8,
                  borderRadius: 16,
                  borderColor: color.green,
                  borderWidth: 1,
                  shadowColor: '#787878',
                  shadowOpacity: 0.5,
                  shadowOffset: {
                    height: 4,
                    width: 0,
                  },
                }}
              >
                <Text style={{ color: color.green }}>주문상세</Text>
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                style={{
                  flex: 0.75,
                  aspectRatio: 1,
                  borderRadius: 32,
                }}
                source={testImg}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View style={{ gap: 5 }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {item.marketName}
                  </Text>
                  <Text style={{ color: '#787878' }}>{item.itemName}</Text>
                  <Text style={{ color: '#787878' }}>
                    {item.quantity}개 {item.price.toLocaleString('ko-KR')}원
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 0.5,
                  backgroundColor: color.green,
                  padding: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                  opacity: item.isSuccess === 'RESERVED' ? 1 : 0.5,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: color.white,
                  }}
                >
                  {item.isSuccess === 'RESERVED'
                    ? '예약중'
                    : item.isSuccess === 'RESERVE_FAIL'
                    ? '구매실패'
                    : '구매완료'}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
