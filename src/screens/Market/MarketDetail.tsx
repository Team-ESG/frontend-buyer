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
import WebView from 'react-native-webview';

import mapImg from '@lib/img/map.png';
import marketImg from '@lib/img/market.png';
import { useIsFocused } from '@react-navigation/native';
import { userState } from '@recoil/auth';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRecoilState } from 'recoil';

const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <style type="text/css">
      html, body { height: 100%; margin: 0; padding: 0; }
      #map { height: 100%; }
    </style>
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=7f4af1e48d5ca958062eb8e5f2088353"></script>
  </head>
  <body>
    <div id="map" style="width:100%;height:100%;"></div>
    <script type="text/javascript">
      var mapContainer = document.getElementById('map'), 
          mapOption = { 
              center: new kakao.maps.LatLng(33.450701, 126.570667), // Initial coordinates for the map's center
              level: 3 // Initial zoom level
          };

      var map = new kakao.maps.Map(mapContainer, mapOption); // Create a map object
    </script>
  </body>
</html>
`;

export default function MarketDetail({ navigation, route }: any) {
  const [user, setUser] = useRecoilState(userState);
  const [marketInfo, setMarketInfo] = useState<any>(null);
  const { marketId } = route.params;
  // 찜 여부
  const [isFavorite, setIsFavorite] = useState(false);
  const isFocuesed = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://52.78.81.8:8080/market/${marketId}`,
          {
            headers: { authorization: `Bearer ${user?.accessToken}` },
          }
        );
        if (response.data.state !== 200) throw new Error();
        setMarketInfo(response.data.data);
      } catch (error) {
        Alert.alert('잘못된 접근입니다.', '홈 화면으로 이동합니다.', [
          {
            text: '확인',
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchFavorite = async () => {
      if (user?.wishList.includes(marketId)) setIsFavorite(true);
    };
    if (isFocuesed) fetchFavorite();
  }, [isFocuesed, user?.wishList]);

  const handleFavorite = async () => {
    try {
      const response = await axios.post(
        `http://52.78.81.8:8080/market/${marketId}/control`,
        {
          memberId: user?.id,
        },
        { headers: { authorization: `Bearer ${user?.accessToken}` } }
      );
      if (response.data.state !== 200) throw new Error();
      if (isFavorite) Alert.alert('찜 취소', '찜 목록에서 삭제 되었습니다.');
      else Alert.alert('찜 완료!', '찜 목록에서 확인할 수 있습니다.');
      setIsFavorite(!isFavorite);
      setUser((currentUser) => {
        if (currentUser) {
          let updatedWishList = [];
          if (currentUser.wishList.includes(marketId)) {
            updatedWishList = currentUser.wishList.filter(
              (id) => id !== marketId
            );
          } else {
            updatedWishList = [...currentUser.wishList, marketId];
          }
          return { ...currentUser, wishList: updatedWishList };
        }
        return currentUser;
      });
    } catch (e) {
      Alert.alert('찜 오류', '다시 시도해주세요.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Icon
          name="arrow-back-ios"
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        />
        {isFavorite ? (
          <Icon
            name="favorite"
            style={styles.heartBtnActive}
            onPress={handleFavorite}
          />
        ) : (
          <Icon
            name="favorite-border"
            style={styles.heartBtn}
            onPress={handleFavorite}
          />
        )}
        <Image source={marketImg} style={{ width: '100%', height: '100%' }} />
      </View>

      <ScrollView style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{marketInfo && marketInfo.name}</Text>
        </View>
        <View style={styles.locInfoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>위치정보</Text>
            <Text style={styles.textDetail}>
              {marketInfo &&
                `${marketInfo.address.firstAddr} ${marketInfo.address.secondAddr} ${marketInfo.address.thirdAddr}`}
            </Text>
          </View>
          <View style={styles.mapContainer}>
            {/* <WebView
              originWhitelist={['*']}
              source={{ html }}
              style={{ width: '90%', height: 300 }}
            /> */}
            {/* <Image source={mapImg} /> */}
          </View>
        </View>
        <View style={styles.salesInfoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>영업정보</Text>
          </View>
          <View style={styles.subTextContainer}>
            <Text style={styles.subTextTitle}>운영시간</Text>
            <Text style={styles.subTextDetail}>
              {marketInfo && `${marketInfo.startTime} ~ ${marketInfo.endTime}`}
            </Text>
          </View>
          <View style={styles.subTextContainer}>
            <Text style={styles.subTextTitle}>휴무일</Text>
            <Text style={styles.subTextDetail}>매주 일요일</Text>
          </View>
          <View style={styles.subTextContainer}>
            <Text style={styles.subTextTitle}>전화번호</Text>
            <Text style={styles.subTextDetail}>
              {marketInfo && marketInfo.phoneNumber}
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
    top: 45,
    left: 25,
    zIndex: 1,
    fontSize: 24,
    color: '#fff',
  },
  heartBtn: {
    position: 'absolute',
    top: 45,
    right: 25,
    zIndex: 1,
    fontSize: 24,
    color: '#fff',
  },
  heartBtnActive: {
    position: 'absolute',
    top: 45,
    right: 25,
    zIndex: 1,
    fontSize: 24,
    color: 'red',
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
    fontWeight: '600',
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
    fontWeight: '600',
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
