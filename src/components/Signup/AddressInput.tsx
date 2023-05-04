import { View, Text, StyleSheet } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import color from '@lib/img/color/color';

function AddressInputScreen({ address, setAddress }: any): JSX.Element {
  return (
    <View style={styles.topContainer}>
      <Text style={styles.title}>내 위치 설정</Text>
      <Text style={styles.subTitle}>내 위치를 설정해주세요.</Text>
      <Text style={styles.label}>주소지 설정</Text>
      <Picker
        selectedValue={address}
        onValueChange={(itemValue) => {
          setAddress(itemValue);
        }}
      >
        <Picker.Item label="수원시 영통구" value="수원시 영통구" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topContainer: {
    paddingTop: 30,
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: color.brown,
  },
  subTitle: {
    fontSize: 17,
    fontWeight: 'normal',
    marginBottom: 15,
    color: color.disabled_02,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: color.brown,
    paddingHorizontal: 5,
  },
});

export default AddressInputScreen;
