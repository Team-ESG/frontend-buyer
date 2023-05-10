import { View } from 'react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';


export default function WebViewScreen({ navigation, route }: any) {
  const { url } = route.params;
  const onWebViewNavigationStateChange = (navState: WebViewNavigation) => {
    if (navState.url.startsWith(url)) {
      const code = new URL(navState.url).searchParams.get('code');
      navigation.navigate('Login', { code });
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        javaScriptEnabled
        domStorageEnabled
        onNavigationStateChange={onWebViewNavigationStateChange}
      />
    </View>
  );
}
