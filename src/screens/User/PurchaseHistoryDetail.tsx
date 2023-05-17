import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function PurchaseHistoryDetail({ navigation }: any) {
  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <SafeAreaView edges={['top']}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            paddingBottom: 15,
            shadowColor: '#787878',
            shadowOpacity: 0.25,
            shadowOffset: {
              height: 5,
              width: 0,
            },
          }}
        >
          <Pressable
            style={{
              marginLeft: 20,
              width: 24,
              height: 24,
            }}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back-ios" size={24} color="#000" />
          </Pressable>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>주문내역</Text>
          <Pressable
            style={{
              marginLeft: 'auto',
              marginRight: 20,
              width: 24,
              height: 24,
            }}
            onPress={() => navigation.navigate('Search')}
          >
            <Icon name="search" size={24} color="#000" />
          </Pressable>
        </View>
      </SafeAreaView>
      <ScrollView></ScrollView>
    </View>
  );
}
