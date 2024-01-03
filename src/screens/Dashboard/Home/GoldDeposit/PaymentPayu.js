import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import { WebView } from "react-native-webview";
import { NativeBaseProvider } from "native-base";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import { LOADER } from "../../../../Redux/Constant";
import apis from "../../../../lib/apis";

function PaymentPayu(props) {
  const navigation = useNavigation();
  const dispath = useDispatch();
  const [transaction, settransactionList] = useState([])
  const [handleTransection, setHandleTransection] = useState(false)

  useEffect(() => {
    getTransacation();
    
  }, [handleTransection]);

  function getTransacation() {
    apis
      .getTransacation()
      .then((res) => {
        console.log("Res", res);
        if (res.status == 200) {
          settransactionList(res.data.data);
        }
      })
      .catch((Err) => {
        console.log("err", Err);
      });
  }

  console.log("props", props)
  return (
    <SafeAreaView style={{ flex: 1 }}>
     
      <WebView
        source={{ uri: props.route.params?.url }}
        cacheMode='LOAD_NO_CACHE'
        // onNavigationStateChange={(webview) => {
        //   console.log("webview", webview)
        // }}
        // onError={syntheticEvent => {
        //   const { nativeEvent } = syntheticEvent
        //   console.error('WebView error: ', nativeEvent)
        // }}
        useWebKit={true}
        
        originWhitelist={["https://*", "http://*", "file://*", "sms://*"]}
        scalesPageToFit={true}
        allowsInlineMediaPlayback
        bounces={false}
        onNavigationStateChange={(webview) => {
          console.log("webview", webview);

          if (webview.url.includes("/payment/success")) {
            alert("Payment success");
           
            dispath({
              type: LOADER,
              payload: false,
            });
            setHandleTransection(!handleTransection)
            console.log("navigation home", )
            navigation.navigate("HomeScreen",{ handle: true });

          } else if (webview.url.includes("cancel?status=cancel")) {
            dispath({
              type: LOADER,
              payload: false,
            });
            alert("Payment cancelled");
            props.navigation.pop();
          } else if (webview.title.includes("Redirecting...")) {
            dispath({
              type: LOADER,
              payload: true,
            });
          } else if (
            webview.url.includes("https://apitest.payu.in/public/#/error")
          ) {
            dispath({
              type: LOADER,
              payload: false,
            });
            alert("Something went wrong!");
            props.navigation.pop();
          } else {
            dispath({
              type: LOADER,
              payload: false,
            });
          }
        }}
        domStorageEnabled={true}
        startInLoadingState={true}
        allowUniversalAccessFromFileURLs={true}
        allowFileAccessFromFileURLs={true}
        javaScriptEnabled={true}
        mixedContentMode={"always"}
        allowFileAccess={true}
        allowingReadAccessToURL={true}
        allowsBackForwardNavigationGestures={true}
        
    
      />


    </SafeAreaView>
  );
}

export default PaymentPayu;

const styles = StyleSheet.create({
  // webView: {
  //   height: 320,
  //   width: "100%",
  // },
});
