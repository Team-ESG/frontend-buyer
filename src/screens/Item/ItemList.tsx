// home screen component with tsx
import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  ImageBackground,
} from 'react-native';

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
    leftTime: 1800,
  },
];

export default function ItemList({ navigation }: any) {
  useEffect(() => {
    axios
      .get('http://localhost:8080/main/list')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        {data?.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => navigation.navigate('ItemDetail')}
          >
            <View style={styles.card}>
              <ImageBackground
                source={item.pthotoUrl}
                style={styles.image}
                imageStyle={{ borderRadius: 18 }}
              >
                <View
                  style={{
                    alignItems: 'flex-end',
                  }}
                >
                  <View style={styles.alarm}>
                    <Icon name="alarm" size={24} color="#433518" />
                    <Text style={styles.alarmText}>00:30</Text>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 'auto',
                    alignItems: 'center',
                  }}
                >
                  <View style={styles.dataDisplay}>
                    <View style={{ gap: 5 }}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#787878',
                          fontWeight: 'bold',
                        }}
                      >
                        {item.marketName}
                      </Text>
                    </View>
                    <View style={styles.priceDisplay}>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text
                          style={{
                            color: '#787878',
                            textDecorationLine: 'line-through',
                            textDecorationColor: '#787878',
                            textDecorationStyle: 'solid',
                          }}
                        >
                          {item.price.original.toLocaleString('ko-KR')}
                        </Text>
                        <Text style={{ color: 'red', fontSize: 12 }}>
                          {item.price.discount}%
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: '#433518',
                          fontWeight: 'bold',
                          fontSize: 18,
                        }}
                      >
                        {item.price.current.toLocaleString('ko-KR')}원
                      </Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 30,
  },
  card: {
    width: '90%',
    aspectRatio: 1,
    marginBottom: 20,
    shadowColor: '#787878',
    shadowOpacity: 1,
    shadowOffset: {
      height: 5,
      width: 0,
    },
  },
  image: {
    width: '100%',
    height: '100%',
  },
  alarm: {
    flexDirection: 'row',
    backgroundColor: '#ffffff99',
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 18,
  },
  alarmText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#433518',
  },
  dataDisplay: {
    alignItems: 'center',
    width: '90%',
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#ffffff99',
    flexDirection: 'row',
    borderRadius: 18,
    justifyContent: 'space-between',
  },

  priceDisplay: {
    width: 120,
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
