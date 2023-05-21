import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import EditAddress from '@components/Edit/editAddress';
import EditNickname from '@components/Edit/editNickname';
import EditPassword from '@components/Edit/editPassword';
import color from '@lib/color/color';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Edit({ navigation, route }: any): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      navigation.goBack();
    }
  }, [isSubmitting]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-back-ios"
          style={styles.headerIcon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>
          {route.params.title}
          {route.params.title === '닉네임' ? ' 변경' : ''}{' '}
        </Text>
      </View>
      {(() => {
        switch (route.params.title) {
          case '닉네임':
            return <EditNickname setIsSubmitting={setIsSubmitting} />;
          case '주소 변경':
            return <EditAddress setIsSubmitting={setIsSubmitting} />;
          case '비밀번호 변경':
            return <EditPassword setIsSubmitting={setIsSubmitting} />;
          default:
            return null;
        }
      })()}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 19,
    fontWeight: '600',
    color: color.brown,
  },
  headerIcon: {
    position: 'absolute',
    left: 20,
    fontSize: 24,
    color: color.brown,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginLeft: 20,
  },
});
