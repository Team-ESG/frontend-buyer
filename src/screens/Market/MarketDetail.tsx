// home screen component with tsx
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
} from 'react-native';

import mapImg from '@lib/img/map.png';
import marketImg from '@lib/img/market.png';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function MarketDetail({ navigation }: any) {
  const [marketInfo, setMarketInfo] = useState<any>(null);
  const [marketId, setMarketId] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/market/${marketId}`
        );
        if (response.data.state !== 200) throw new Error();
        setMarketInfo(response.data);
      } catch (error) {
        Alert.alert('잘못된 접근입니다.', '홈 화면으로 이동합니다.', [
          {
            text: '확인',
            onPress: () => navigation.navigate('Home'),
          },
        ]);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Icon
          name="arrow-back-ios"
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        />
        <Icon
          name="favorite-border"
          style={styles.heartBtn}
          onPress={() => console.log('heart')}
        />
        <Image source={marketImg} style={{ width: '100%', height: '100%' }} />
      </View>

      <ScrollView style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{marketInfo && marketInfo.data.name}</Text>
        </View>
        <View style={styles.locInfoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>위치정보</Text>
            <Text style={styles.textDetail}>
              {marketInfo &&
                `${marketInfo.data.address.firstAddr} ${marketInfo.data.address.secondAddr} ${marketInfo.data.address.thirdAddr}`}
            </Text>
          </View>
          <View style={styles.mapContainer}>
            <Image source={mapImg} />
          </View>
        </View>
        <View style={styles.salesInfoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>영업정보</Text>
          </View>
          <View style={styles.subTextContainer}>
            <Text style={styles.subTextTitle}>운영시간</Text>
            <Text style={styles.subTextDetail}>
              {marketInfo &&
                `${marketInfo.data.startTime} ~ ${marketInfo.data.endTime}`}
            </Text>
          </View>
          <View style={styles.subTextContainer}>
            <Text style={styles.subTextTitle}>휴무일</Text>
            <Text style={styles.subTextDetail}>매주 일요일</Text>
          </View>
          <View style={styles.subTextContainer}>
            <Text style={styles.subTextTitle}>전화번호</Text>
            <Text style={styles.subTextDetail}>
              {marketInfo && marketInfo.data.phoneNumber}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 0.7,
  },
  backBtn: {
    position: 'absolute',
    top: 35,
    left: 25,
    zIndex: 1,
    fontSize: 24,
    color: '#fff',
  },
  heartBtn: {
    position: 'absolute',
    top: 35,
    right: 25,
    zIndex: 1,
    fontSize: 24,
    color: '#fff',
  },
  infoContainer: {
    flex: 0.3,
    marginTop: 20,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  locInfoContainer: {
    marginBottom: 30,
    paddingBottom: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 25,
    marginBottom: 20,
  },
  textTitle: {
    flex: 0.2,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  textDetail: {
    flex: 0.8,
    fontSize: 14,
    color: '#333',
    marginLeft: 15,
  },
  mapContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  salesInfoContainer: {
    marginBottom: 30,
  },
  subTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 35,
    marginBottom: 10,
  },
  subTextTitle: {
    flex: 0.2,
    fontSize: 14,
    color: '#333',
  },
  subTextDetail: {
    flex: 0.8,
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
});
