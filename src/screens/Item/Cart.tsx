// home screen component with tsx
import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import testImg from '@lib/img/testImg.jpeg';
import axios from 'axios';

const data = [
  {
    marketName: '듀쿠플',
    name: '초콜릿 레이어 케이크',
    pthotoUrl: testImg,
    price: {
      original: 19000,
      discount: 20,
      current: 15200,
    },
    leftTime: 1800,
  },
  {
    marketName: '듀쿠플',
    name: '초콜릿 레이어 케이크',
    pthotoUrl: testImg,
    price: {
      original: 19000,
      discount: 20,
      current: 15200,
    },
    leftTime: 0,
  },
];

export default function Cart({ navigation }: any) {
  useEffect(() => {
    axios
      .get('http://localhost:8080/main/cart')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        {data?.map((item, index) => (
          <View key={index}>
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
                source={item.pthotoUrl}
                style={{ borderRadius: 18, flex: 1, aspectRatio: 1 }}
              />
              <View style={{ flex: 1, gap: 5, padding: 20 }}>
                <Text style={{ color: '#787878' }}>듀쿠플</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  초콜릿 레이어 케이크
                </Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Text
                    style={{
                      color: '#787878',
                      textDecorationLine: 'line-through',
                      textDecorationColor: '#787878',
                    }}
                  >
                    19,000원
                  </Text>
                  <Text style={{ color: 'red' }}>20%</Text>
                </View>
                <Text
                  style={{ color: '#433518', fontSize: 18, fontWeight: 'bold' }}
                >
                  15,200원
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
                    color="#78787850"
                  />
                  <Text style={{ fontWeight: 'bold' }}>1</Text>
                  <Icon name="add-circle-outline" size={24} color="#787878" />
                  <Text
                    style={{
                      color: '#433518',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}
                  >
                    15,200원
                  </Text>
                </View>
              </View>
              <Icon
                style={{ position: 'absolute', top: 20, right: 20 }}
                name="clear"
                size={24}
                color="#787878"
              />
            </View>
            {item.leftTime === 0 && (
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
                <Text
                  style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}
                >
                  SOLD OUT
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <View>
        <View
          style={{
            height: 70,
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
            총 1건
          </Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>15,200원</Text>
        </View>
        <View
          style={{
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#80C597',
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
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
