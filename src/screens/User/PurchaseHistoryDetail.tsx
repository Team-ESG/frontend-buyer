import React, { useState } from 'react';
import { Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import color from '@lib/color/color';
import { useFocusEffect } from '@react-navigation/native';
import { userState } from '@recoil/auth';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRecoilValue } from 'recoil';

export default function PurchaseHistoryDetail({ navigation, route }: any) {
  const [data, setData] = useState([]);
  const user = useRecoilValue(userState);

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(
          `http://52.78.81.8:8080/main/reserveList/${route.params.reserveId}`,
          {
            headers: {
              authorization: `Bearer ${user?.accessToken}`,
            },
          }
        )
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
          <Text style={{ fontSize: 16, fontWeight: '600' }}>주문내역</Text>
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
        <View
          style={{
            padding: 20,
            gap: 10,
          }}
        >
          <Text style={{ color: 'green', fontWeight: '600' }}>
            {data.reserveState === 'RESERVE_FAIL'
              ? '픽업을 대기중이에요'
              : '픽업을 완료했어요'}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>
            {data.marketName}
          </Text>
          <Text style={{ fontSize: 16, color: '#787878' }}>
            {data.itemName}
          </Text>
          <Text style={{ fontSize: 12, color: '#787878' }}>
            주문일시 :{' '}
            {data.reserveDate?.length &&
              `${data.reserveDate[0]}년 ${data.reserveDate[1]}월 ${data.reserveDate[2]}일 ${data.reserveDate[3]}:${data.reserveDate[4]}`}
          </Text>
          {data.pickUpDate && (
            <Text style={{ fontSize: 12, color: '#787878' }}>
              픽업시간 : 2023년 05월 03일 17:25
            </Text>
          )}
          <View style={{ flexDirection: 'row', gap: 15 }}>
            <Pressable
              onPress={() =>
                Linking.openURL(
                  `tel:${data.marketPhoneNumber.replaceAll('-', '')}`
                )
              }
              style={{
                gap: 5,
                flexDirection: 'row',
                borderColor: '#787878',
                borderWidth: 1,
                padding: 10,
                flex: 0.5,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}
            >
              <Icon name="call" size={24} color="#000" />
              <Text>전화</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate('MarketDetail', { marketId: data.marketId })
              }
              style={{
                gap: 5,
                flexDirection: 'row',
                borderColor: '#787878',
                borderWidth: 1,
                padding: 10,
                flex: 0.5,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}
            >
              <Icon name="storefront" size={24} color="#000" />
              <Text>가게보기</Text>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            gap: 10,
            backgroundColor: '#fff',
            shadowColor: '#787878',
            shadowOpacity: 0.25,
            shadowOffset: {
              height: -5,
              width: 0,
            },
            padding: 20,
          }}
        >
          <Text style={{ fontWeight: '600', fontSize: 16 }}>결제금액</Text>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ fontWeight: '600', fontSize: 14, color: '#787878' }}>
              {data.itemName} {data.quantity}개
            </Text>
            <Text style={{ fontWeight: '600', fontSize: 14, color: '#787878' }}>
              {data.price}원
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
