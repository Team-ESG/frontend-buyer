// home screen component with tsx
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
} from 'react-native';

import mapImg from '@lib/img/map.png';
import marketImg from '@lib/img/market.png';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function MarketDetail({ navigation }: any) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={25} color="#fff" />
        </Pressable>
        <Image source={marketImg} style={{ width: '100%', height: '100%' }} />
      </View>

      <ScrollView style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>미스터 쉐프</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>위치정보</Text>
          <Text style={styles.textDetail}>
            경기도 수원시 우만동 아주로 47번길 18
          </Text>
        </View>
        <View style={styles.mapContainer}>
          <Image source={mapImg} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>영업정보</Text>
        </View>
        <View style={styles.subTextContainer}>
          <Text style={styles.subTextTitle}>운영시간</Text>
          <Text style={styles.subTextDetail}>
            평일, 토요일 오전 11시 ~ 오후 9시
          </Text>
        </View>
        <View style={styles.subTextContainer}>
          <Text style={styles.subTextTitle}>휴무일</Text>
          <Text style={styles.subTextDetail}>매주 일요일</Text>
        </View>
        <View style={styles.subTextContainer}>
          <Text style={styles.subTextTitle}>전화번호</Text>
          <Text style={styles.subTextDetail}>031-7777-7777</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 0.7,
    // marginBottom: 20,
  },
  backBtn: {
    position: 'absolute',
    top: 35,
    left: 20,
    zIndex: 1,
  },
  infoContainer: {
    flex: 0.3,
    // padding: 20,
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
    marginBottom: 20,
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
