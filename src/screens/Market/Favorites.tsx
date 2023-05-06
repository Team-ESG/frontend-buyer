// home screen component with tsx
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';

import marketImg from '@lib/img/market.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ItemList = [
  {
    id: 1,
    title: '듀쿠플',
    desc: '초콜릿 레이어 케이크, 블루베리 치즈케이크',
  },
  {
    id: 2,
    title: '파리바게트',
    desc: '크로와상, 바게트, 초코케이크, 빵, 케이크',
  },
  {
    id: 3,
    title: '미스터쉐프',
    desc: '제육볶음, 불고기',
  },
];
export default function Favorites({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.outerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>찜한 가게</Text>
          <View style={styles.totalCountCircle}>
            <Text style={styles.totalCountText}>총 {ItemList.length}개</Text>
          </View>
        </View>
      </View>

      <ScrollView>
        {ItemList.map((item) => (
          <Pressable
            key={item.id}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#eee' : '#fff',
              },
              styles.itemContainer,
            ]}
            onPress={() => navigation.navigate('MarketDetail')}
          >
            <View style={styles.imageContainer}>
              <Image style={styles.itemImage} source={marketImg} />
            </View>
            <View style={styles.itemTextContainer}>
              <Text numberOfLines={1} style={styles.itemText}>
                {item.title}
              </Text>
              <Text numberOfLines={1} style={styles.descText}>
                {item.desc}
              </Text>
              {/* <Text numberOfLines={1} style={styles.descText}>
                {item.desc}
              </Text> */}
            </View>
            {/* <View style={styles.itemHeartContainer}>
              <Icon name="heart" size={25} color="red" />
            </View> */}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  outerContainer: {
    shadowColor: '#000',
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#80c597',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 3,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFF',
  },
  totalCountCircle: {
    height: 23,
    borderRadius: 15,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginLeft: 15,
  },
  totalCountText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#80c597',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#eee',
    paddingHorizontal: 20,
    paddingVertical: 23,
  },
  imageContainer: {
    flex: 0.3,
    width: 90,
    height: 90,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  itemTextContainer: {
    height: '95%',
    flex: 0.7,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#433518',
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 2.5,
  },
  descText: {
    fontSize: 13,
    color: '#7e7e7e',
    marginHorizontal: 15,
    marginVertical: 5,
  },
  itemHeartContainer: {
    flex: 0.1,
    alignItems: 'flex-end',
  },
});
