import React, { useState, useRef, useEffect } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';

import { userState } from '@recoil/auth';
import { useSetRecoilState } from 'recoil';
import { setTokens } from 'src/utils/storageHelper';

export default function WebViewScreen({ navigation, route }: any) {
  const { url } = route.params;
  const [webViewData, setWebViewData] = useState(null);
  const webViewRef = useRef(null);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    if (webViewData) {
      navigation.navigate('SignUpSocial', { webViewData });
    }
  }, [webViewData]);

  const handleWebViewMessage = (event: any) => {
    const jsonData = event.nativeEvent.data;
    try {
      const parsedData = JSON.parse(jsonData);
      if (parsedData.accessToken) {
        if (parsedData.info) {
          setUser({
            address: parsedData.info.address,
            birthDate: parsedData.info.birthDate,
            discountPrice: parsedData.info.discountPrice,
            id: parsedData.info.memberId,
            name: parsedData.info.name,
            nickname: parsedData.info.nickName,
            phoneNumber: parsedData.info.phoneNumber,
            sex: parsedData.info.sex,
            social: parsedData.info.social,
            wishList: parsedData.info.wishList,
            accessToken: parsedData.accessToken,
            refreshToken: parsedData.refreshToken,
          });
          setTokens(parsedData.accessToken, parsedData.refreshToken);
        }
        setWebViewData(parsedData);
      }
    } catch (e) {}
  };

  const runJSInWebView = () => {
    webViewRef.current.injectJavaScript(`
      const result = document.body.textContent;
      window.ReactNativeWebView.postMessage(result);
    `);
  };

  const runJSInWebView2 = () => {
    // url에 code=가 있으면 디스플레이를 none으로 바꿔준다.
    webViewRef.current.injectJavaScript(`
      if (document.URL.includes('code=')) {
        document.body.style.display = 'none';
      }
    `);
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        onMessage={handleWebViewMessage}
        onLoadEnd={runJSInWebView}
        onLoadStart={runJSInWebView2}
      />
    </View>
  );
}
