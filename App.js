/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useRef} from 'react';
import {BackHandler, Platform} from 'react-native';

import {WebView} from 'react-native-webview';

const App = () => {
  const webView = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  const URL = 'https://sip-gardan.com/infractions';

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', HandleBackPressed);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', HandleBackPressed);
      };
    }
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // Success goes here
      },
      function (error) {
        alert.error('Please turn on location for this feature');
        setTimeout(function () {
          window.location.href = '/';
        }, 2000);
      },
      [],
    );
  }, []); // INITIALIZE ONLY ONCE

  const HandleBackPressed = () => {
    if (webView.current) {
      webView.current.goBack();
      return true; // PREVENT DEFAULT BEHAVIOUR (EXITING THE APP)
    }
    return false;
  };

  return (
    <>
      <WebView
        geolocationEnabled={true}
        // javaScriptCanOpenWindowsAutomatically={true}
        directionalLockEnabled
        ref={webView}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback
        domStorageEnabled={true}
        useWebKit
        // originWhitelist={['*']}
        originWhitelist={['https://*', 'http://*', 'file://*', 'sms://*']}
        allowUniversalAccessFromFileURLs={true}
        userAgent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"
        source={{
          uri: URL,
        }}
        onNavigationStateChange={navState => setCanGoBack(navState.canGoBack)}
      />
    </>
  );
};

export default App;
