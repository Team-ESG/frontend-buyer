import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ImageBackground,
  ScrollView,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import testMarket from '@lib/img/market.png';
import testImg from '@lib/img/testImg.jpeg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import axios from 'axios';

export default function ItemDetail({ navigation }: any) {
  useEffect(() => {
    axios
      .get('http://localhost:8080/main/item/1')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
          ></ImageBackground>
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
                  style={{ fontSize: 16, color: '#433518', fontWeight: 'bold' }}
                >
                  미스터쉐프
                </Text>
                <Text style={{ fontSize: 14, color: '#787878' }}>
                  우만동 아주로47번길 18
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
              onPress={() => navigation.navigate('MarketDetail')}
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
          <Text style={{ fontSize: 14, color: '#787878' }}>미스터쉐프</Text>
          <Text style={{ fontSize: 16, color: '#433518', fontWeight: 'bold' }}>
            초콜릿 레이어 케이크
          </Text>
          <Text style={{ fontSize: 14, marginBottom: 40 }}>
            미스터쉐프에서 오랜만에 케이크를 제작해 보았습니다. 저렴하게
            판매하니 많이 찾아와주세요.미스터쉐프에서 오랜만에 케이크를 제작해
            보았습니다. 저렴하게 판매하니 많이 찾아와주세요.미스터쉐프에서
            오랜만에 케이크를 제작해 보았습니다. 저렴하게 판매하니 많이
            찾아와주세요.미스터쉐프에서 오랜만에 케이크를 제작해 보았습니다.
            저렴하게 판매하니 많이 찾아와주세요.미스터쉐프에서 오랜만에 케이크를
            제작해 보았습니다. 저렴하게 판매하니 많이
            찾아와주세요.미스터쉐프에서 오랜만에 케이크를 제작해 보았습니다.
            저렴하게 판매하니 많이 찾아와주세요.미스터쉐프에서 오랜만에 케이크를
            제작해 보았습니다. 저렴하게 판매하니 많이
            찾아와주세요.미스터쉐프에서 오랜만에 케이크를 제작해 보았습니다.
            저렴하게 판매하니 많이 찾아와주세요.미스터쉐프에서 오랜만에 케이크를
            제작해 보았습니다. 저렴하게 판매하니 많이
            찾아와주세요.미스터쉐프에서 오랜만에 케이크를 제작해 보았습니다.
            저렴하게 판매하니 많이 찾아와주세요.미스터쉐프에서 오랜만에 케이크를
            제작해 보았습니다. 저렴하게 판매하니 많이
            찾아와주세요.미스터쉐프에서 오랜만에 케이크를 제작해 보았습니다.
            저렴하게 판매하니 많이 찾아와주세요.미스터쉐프에서 오랜만에 케이크를
            제작해 보았습니다. 저렴하게 판매하니 많이
            찾아와주세요.미스터쉐프에서 오랜만에 케이크를 제작해 보았습니다.
            저렴하게 판매하니 많이 찾아와주세요.미스터쉐프에서 오랜만에 케이크를
            제작해 보았습니다. 저렴하게 판매하니 많이
            찾아와주세요.미스터쉐프에서 오랜만에 케이크를 제작해 보았습니다.
            저렴하게 판매하니 많이 찾아와주세요.미스터쉐프에서 오랜만에 케이크를
            제작해 보았습니다. 저렴하게 판매하니 많이
            찾아와주세요.미스터쉐프에서 오랜만에 케이크를 제작해 보았습니다.
            저렴하게 판매하니 많이 찾아와주세요. 찾아와주세요.미스터쉐프에서
            오랜만에 케이크를 제작해 보았습니다. 저렴하게 판매하니 많이
            찾아와주세요.미스터쉐프에서 오랜만에 케이크를 제작해 보았습니다.
            저렴하게 판매하니 많이 찾아와주세요.미스터쉐프에서 오랜만에 케이크를
            제작해 보았습니다. 저렴하게 판매하니 많이
            찾아와주세요.미스터쉐프에서 오랜만에 케이크를 제작해 보았습니다.
            저렴하게 판매하니 많이
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
            유통기한:23.04.27
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
                19,000원
              </Text>
              <Text style={{ color: 'red', fontSize: 12 }}>20%</Text>
            </View>
            <View>
              <Text
                style={{ color: '#433518', fontSize: 16, fontWeight: 'bold' }}
              >
                15,200원
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
            <Icon name="remove-circle-outline" size={24} color="#78787850" />
            <Text style={{ fontSize: 16 }}>1</Text>
            <Icon name="add-circle-outline" size={24} color="#787878" />
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
            <Icon name="add-shopping-cart" size={24} color="#787878" />
          </View>
          <View>
            <Text
              style={{ color: '#433518', fontSize: 20, fontWeight: 'bold' }}
            >
              총 15,200원
            </Text>
          </View>
          <View
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
          </View>
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
