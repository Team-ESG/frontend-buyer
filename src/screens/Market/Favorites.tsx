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
    title: '미스터쉐프프프프프프',
  },
  {
    id: 2,
    title: '미스터쉐프2',
  },
  {
    id: 3,
    title: '미스터쉐프3',
  },
  {
    id: 4,
    title: '미스터쉐프4',
  },
  {
    id: 5,
    title: '미스터쉐프5',
  },
  {
    id: 6,
    title: '미스터쉐프6',
  },
  {
    id: 7,
    title: '미스터쉐프7',
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
            </View>
            <View style={styles.itemHeartContainer}>
              <Icon name="heart" size={25} color="red" />
            </View>
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
    flex: 0.6,
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 17,
    fontWeight: 'bold',
    margin: 15,
  },
  itemHeartContainer: {
    flex: 0.1,
    alignItems: 'flex-end',
  },
});
