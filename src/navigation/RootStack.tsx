import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemDetail from '@screens/Item/ItemDetail';
import MarketDetail from '@screens/Market/MarketDetail';
import BottomTab from 'src/navigation/BottomTab';
import Search from '@screens/Search';
import EditProfile from '@screens/User/EditProfile';
import Edit from '@screens/User/Edit';

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
    </Stack.Navigator>
  );
}
