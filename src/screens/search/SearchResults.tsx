// home screen component with tsx
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Dimensions,
  Text,
  Pressable,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, TabBar } from 'react-native-tab-view';

import color from '@lib/color/color';
import marketImg from '@lib/img/market.png';
import testImg from '@lib/img/testImg.jpeg';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

function ItemView({ searchWord, navigation, setItemCount }: any) {
  const [itemList, setItemList] = React.useState<any>([]);

  useEffect(() => {
    const fetchItemList = async () => {
      try {
        const response = await axios.get(
          `http://52.78.81.8:8080/main/search/${searchWord}/item/all`
        );
        setItemList(response.data.data);
        setItemCount(response.data.data.length);
      } catch (error) {
        setItemList([]);
        setItemCount(0);
      }
    };
    fetchItemList();
  }, [searchWord]);

  return (
    <View style={{ flex: 1 }}>
      {itemList.length > 0 ? (
        itemList.map((item: any) => (
          <Pressable
            key={item.itemId}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#eee' : '#fff',
              },
              styles.itemContainer,
            ]}
            onPress={() =>
              navigation.navigate('ItemDetail', { id: item.itemId })
            }
          >
            <View style={styles.itemImageContainer}>
              <Image style={styles.itemImage} source={testImg} />
            </View>
            <View style={styles.itemTextContainer}>
              <Text numberOfLines={1} style={styles.itemText}>
                {item.name}
              </Text>
              <Text numberOfLines={2} style={styles.itemPrice}>
                1개 {item.discountPrice}원
              </Text>
            </View>
          </Pressable>
        ))
      ) : (
        <Text style={styles.noItemText}>검색 결과가 없습니다</Text>
      )}
    </View>
  );
}

function MarketView({ searchWord, navigation, setMarketCount }: any) {
  const [marketList, setMarketList] = useState<any>(null);

  useEffect(() => {
    const fetchMarketList = async () => {
      try {
        const response = await axios.get(
          `http://52.78.81.8:8080/main/search/${searchWord}/market/all`
        );
        setMarketList(response.data.data);
        setMarketCount(response.data.data.length);
      } catch (error) {
        setMarketList([]);
        setMarketCount(0);
      }
    };
    fetchMarketList();
  }, [searchWord]);

  return (
    <View style={{ flex: 1 }}>
      {marketList?.length > 0 ? (
        marketList.map((item: any) => (
          <Pressable
            key={item.marketId}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#eee' : '#fff',
              },
              styles.itemContainer,
            ]}
            onPress={() =>
              navigation.navigate('MarketDetail', { marketId: item.marketId })
            }
          >
            <View style={styles.itemImageContainer}>
              <Image style={styles.itemImage} source={marketImg} />
            </View>
            <View style={styles.itemTextContainer}>
              <Text numberOfLines={1} style={styles.itemText}>
                {item.name}
              </Text>
              <Text numberOfLines={2} style={styles.descText}>
                {item.address.firstAddr} {item.address.secondAddr}{' '}
                {item.address.thirdAddr}
              </Text>
            </View>
          </Pressable>
        ))
      ) : (
        <Text style={styles.noItemText}>검색 결과가 없습니다</Text>
      )}
    </View>
  );
}

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#333' }}
    style={{ backgroundColor: '#fff' }}
    labelStyle={{ color: '#333', fontWeight: '600', fontSize: 16 }}
    inactiveColor="#999"
  />
);

const initialLayout = { width: Dimensions.get('window').width };

export default function SearchResults({ navigation, route }: any) {
  const [searchWord, setSearchWord] = React.useState<string>(
    route.params.searchWord
  );
  const [searchText, setSearchText] = React.useState<string>(searchWord);
  const [index, setIndex] = React.useState(0);
  const [marketCount, setMarketCount] = useState<number>(0);
  const [itemCount, setItemCount] = useState<number>(0);
  const [routes, setRoutes] = React.useState([
    { key: 'market', title: `가게 ${marketCount}개` },
    { key: 'item', title: `상품 ${itemCount}개` },
  ]);

  useEffect(() => {
    setRoutes([
      { key: 'market', title: `가게 ${marketCount}개` },
      { key: 'item', title: `상품 ${itemCount}개` },
    ]);
  }, [marketCount, itemCount]);

  const handleSearch = () => {
    setSearchWord(searchText);
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'market':
        return (
          <MarketView
            searchWord={searchWord}
            navigation={navigation}
            setMarketCount={setMarketCount}
          />
        );
      case 'item':
        return (
          <ItemView
            searchWord={searchWord}
            navigation={navigation}
            setItemCount={setItemCount}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'rgb(73,172,106)',
      }}
    >
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.imageContainer}>
            <View style={styles.searchContainer}>
              <Icon
                name="arrow-back-ios"
                style={styles.backBtn}
                onPress={() => navigation.goBack()}
              />
              <View style={styles.section}>
                <Icon name="search" size={24} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  value={searchText}
                  onChangeText={setSearchText}
                  onSubmitEditing={handleSearch}
                />
              </View>
            </View>
          </View>
          <View style={styles.searchWordContainer}>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={initialLayout}
              renderTabBar={renderTabBar}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  imageContainer: {
    backgroundColor: 'rgb(73,172,106)',
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
    height: 85,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', // 'flex-end
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtn: {
    color: '#fff',
    flex: 0.12,
    fontSize: 24,
  },
  section: {
    // marginLeft: 10,
    flex: 0.88,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 2.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  input: {
    fontSize: 14,
    color: '#433518',
    flex: 0.9,
  },
  icon: {
    flex: 0.1,
    color: '#80c597',
  },
  searchWordContainer: {
    height: '100%',
    flexDirection: 'row',
  },
  searchWordText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#787878',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#eee',
    paddingHorizontal: 25,
    paddingVertical: 17,
  },
  itemImageContainer: {
    flex: 0.3,
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
    fontWeight: '600',
    color: '#433518',
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 2.5,
  },
  descText: {
    fontSize: 13,
    color: color.offBlack,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '400',
    color: '#999',
    marginHorizontal: 15,
  },
  noItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginVertical: 10,
    textAlign: 'center',
  },
});
