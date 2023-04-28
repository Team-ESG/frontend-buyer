/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from '@screens/Item/Cart';
import ItemList from '@screens/Item/ItemList';
import Favorites from '@screens/Market/Favorites';
import MyPage from '@screens/User/MyPage';
// eslint-disable-next-line import/no-extraneous-dependencies
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function BottomTab(): JSX.Element {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="홈"
        component={ItemList}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon name="home" size={25} />
            ) : (
              <Icon name="home-outline" size={25} />
            ),
        }}
      />
      <Tab.Screen
        name="찜"
        component={Favorites}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon name="heart" size={25} />
            ) : (
              <Icon name="heart-outline" size={25} />
            ),
        }}
      />
      <Tab.Screen
        name="장바구니"
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon name="cart" size={25} />
            ) : (
              <Icon name="cart-outline" size={25} />
            ),
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={MyPage}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon name="account" size={25} />
            ) : (
              <Icon name="account-outline" size={25} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
