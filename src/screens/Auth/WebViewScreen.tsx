import React, { useState } from 'react';
import { View, Text } from 'react-native';
import WebView, {
  WebViewMessageEvent,
  WebViewNavigation,
} from 'react-native-webview';

const INJECTED_JAVASCRIPT = `
  (function() {
    document.addEventListener('DOMContentLoaded', function() {
      const bodyElement = document.body;
      if (bodyElement && window.ReactNativeWebView) {
        const pageTextContent = bodyElement.textContent || bodyElement.innerText;
        window.ReactNativeWebView.postMessage(pageTextContent);
      }
    });
  })();
`;

export default function WebViewScreen({ navigation, route }: any) {
  const { url } = route.params;
  const [webViewData, setWebViewData] = useState(null);

  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log('Received JSON data:', data);
    setWebViewData(data);
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        javaScriptEnabled
        domStorageEnabled
        onMessage={handleWebViewMessage}
        injectedJavaScript={INJECTED_JAVASCRIPT}
      />
      {webViewData && (
        <View>
          {Object.entries(webViewData).map(([key, value], index) => (
            <Text key={index}>
              {key}: {JSON.stringify(value)}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}
