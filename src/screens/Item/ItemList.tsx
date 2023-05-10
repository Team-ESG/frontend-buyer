// home screen component with tsx
import React, { useEffect, useState } from 'react';
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

export default function ItemList({ navigation }: any) {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/main/list')
      .then((res) => {
        console.log(res.data.data);
        setItemList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {itemList?.map((item, index) => (
          <Pressable
            key={index}
            onPress={() =>
              navigation.navigate('ItemDetail', { id: item.itemId })
            }
          >
            <View style={styles.card}>
              <ImageBackground
                source={testImg}
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
                    <Text style={styles.alarmText}>
                      {`${(
                        ((item.expirationDate - Date.now()) / 1000 / 60 / 60) %
                        24
                      )
                        .toFixed(0)
                        .padStart(2, '0')}:${(
                        ((item.expirationDate - Date.now()) / 1000 / 60) %
                        60
                      )
                        .toFixed(0)
                        .padStart(2, '0')}`}
                    </Text>
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
                          {item.originalPrice.toLocaleString('ko-KR')}
                        </Text>
                        <Text style={{ color: 'red', fontSize: 12 }}>
                          {100 -
                            (
                              (item.discountPrice / item.originalPrice) *
                              100
                            ).toFixed(0)}
                          %
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: '#433518',
                          fontWeight: 'bold',
                          fontSize: 18,
                        }}
                      >
                        {item.discountPrice.toLocaleString('ko-KR')}원
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
    paddingLeft: 10,
    paddingRight: 10,
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
