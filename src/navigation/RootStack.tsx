import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemDetail from '@screens/Item/ItemDetail';
import MarketDetail from '@screens/Market/MarketDetail';
import Search from '@screens/search/Search';
import Edit from '@screens/User/Edit';
import EditProfile from '@screens/User/EditProfile';
import NoticeDetail from '@screens/User/NoticeDetail';
import NoticeList from '@screens/User/NoticeList';
import BottomTab from 'src/navigation/BottomTab';
import PurchaseHistory from '@screens/User/PurchaseHistory';
import Settings from '@screens/User/Settings';
import PurchaseHistoryDetail from '@screens/User/PurchaseHistoryDetail';
import SearchResults from '@screens/search/SearchResults';

const Stack = createNativeStackNavigator();

export default function RootStack(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomTab}
        options={{ title: '홈', headerShown: false }}
      />
      <Stack.Screen
        name="ItemDetail"
        component={ItemDetail}
        options={{ title: '상품 상세', headerShown: false }}
      />
      <Stack.Screen
        name="MarketDetail"
        component={MarketDetail}
        options={{ title: '가게 상세', headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ title: '검색', headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ title: '프로필 수정', headerShown: false }}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        options={{ title: '회원정보 수정', headerShown: false }}
      />
      <Stack.Screen
        name="Notice"
        component={NoticeList}
        options={{ title: '공지사항', headerShown: false }}
      />
      <Stack.Screen
        name="NoticeDetail"
        component={NoticeDetail}
        options={{
          title: '공지사항',
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="PurchaseHistory"
        component={PurchaseHistory}
        options={{ title: '구매내역', headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ title: '환경설정', headerShown: false }}
      />
      <Stack.Screen
        name="PurchaseHistoryDetail"
        component={PurchaseHistoryDetail}
        options={{ title: '주문내역', headerShown: false }}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResults}
        options={{ title: '검색결과', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
