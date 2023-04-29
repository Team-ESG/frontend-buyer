import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemDetail from '@screens/Item/ItemDetail';
import MarketDetail from '@screens/Market/MarketDetail';
import BottomTab from 'src/navigation/BottomTab';

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
        options={{ title: '상품 상세' }}
      />
      <Stack.Screen
        name="MarketDetail"
        component={MarketDetail}
        options={{ title: '가게 상세', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
