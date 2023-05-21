import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemDetail from '@screens/Item/ItemDetail';
import MarketDetail from '@screens/Market/MarketDetail';
import Search from '@screens/search/Search';
import SearchResults from '@screens/search/SearchResults';
import Edit from '@screens/User/Edit';
import EditProfile from '@screens/User/EditProfile';
import NoticeDetail from '@screens/User/NoticeDetail';
import NoticeList from '@screens/User/NoticeList';
import PurchaseHistory from '@screens/User/PurchaseHistory';
import PurchaseHistoryDetail from '@screens/User/PurchaseHistoryDetail';
import Settings from '@screens/User/Settings';
import BottomTab from 'src/navigation/BottomTab';

const Stack = createNativeStackNavigator();

export default function RootStack(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomTab}
        options={{
          title: '홈',
          headerShown: false,
          statusBarColor: '#fff',
          statusBarStyle: 'dark',
          statusBarAnimation: 'slide',
        }}
      />
      <Stack.Screen
        name="ItemDetail"
        component={ItemDetail}
        options={{
          title: '상품 상세',
          headerShown: false,
          statusBarTranslucent: true,
          statusBarColor: 'rgba(73,172,106,0.0)',
          statusBarAnimation: 'slide',
        }}
      />
      <Stack.Screen
        name="MarketDetail"
        component={MarketDetail}
        options={{
          title: '가게 상세',
          headerShown: false,
          statusBarTranslucent: true,
          statusBarColor: 'rgba(73,172,106,0.0)',
          statusBarAnimation: 'slide',
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: '검색',
          headerShown: false,
          statusBarColor: 'rgba(73,172,106,0.7)',
          statusBarStyle: 'dark',
          statusBarAnimation: 'slide',
        }}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResults}
        options={{
          title: '검색결과',
          headerShown: false,
          statusBarColor: 'rgba(73,172,106,0.7)',
          statusBarStyle: 'dark',
          statusBarAnimation: 'slide',
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: '프로필 수정',
          headerShown: false,
          statusBarColor: '#fff',
          statusBarStyle: 'dark',
        }}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        options={{
          title: '회원정보 수정',
          headerShown: false,
          statusBarColor: '#fff',
          statusBarStyle: 'dark',
        }}
      />
      <Stack.Screen
        name="Notice"
        component={NoticeList}
        options={{
          title: '공지사항',
          headerShown: false,
          statusBarColor: '#fff',
          statusBarStyle: 'dark',
        }}
      />
      <Stack.Screen
        name="NoticeDetail"
        component={NoticeDetail}
        options={{
          title: '공지사항',
          headerShown: false,
          animation: 'slide_from_right',
          statusBarColor: '#fff',
          statusBarStyle: 'dark',
        }}
      />
      <Stack.Screen
        name="PurchaseHistory"
        component={PurchaseHistory}
        options={{
          title: '구매내역',
          headerShown: false,
          statusBarColor: '#fff',
          statusBarStyle: 'dark',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: '환경설정',
          headerShown: false,
          statusBarColor: '#fff',
          statusBarStyle: 'dark',
        }}
      />
      <Stack.Screen
        name="PurchaseHistoryDetail"
        component={PurchaseHistoryDetail}
        options={{
          title: '주문내역',
          headerShown: false,
          statusBarColor: '#fff',
          statusBarStyle: 'dark',
        }}
      />
    </Stack.Navigator>
  );
}
