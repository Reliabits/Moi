import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";
import { Divider, NativeBaseProvider } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import apis from "../../../lib/apis";
import fonts from "../../../theme/fonts";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const PaymentBreakDown = (props) => {
  const navigation = useNavigation();
  const [total, setTotal] = React.useState("");
  const [gstTotal, setGstTotal] = React.useState("");
  const [goldvalue, setGoldValue] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [loader, setLoader] = React.useState(false);

  useEffect(() => {
    totalValue();
    gst();
    amountvalue();
    setamountvalue();
  }, [props, total, gstTotal, goldvalue, amount]);

  function buyGold() {
    setLoader(true);
    let params = {
      amount: amount,
    };
    apis
      .buyGold(params)
      .then(async (res) => {
        setLoader(false);
        // setUrl("set url ",res.data.url)
        if (res.status == 200) {
          // setUrl("set url ", res.data.url)
          console.log("res url", res);
          console.log("buy gold api response", `${res.status}`);
          navigation.navigate("PaymentPayu", { url: res.data.url });
          // Linking.openURL(res.data.url)

          // navigation.dispatch(StackActions.replace("HomeScreen"));
        } else {
          console.log("error", `${res.data.error}`);
          // toast.show({
          //     render: () => {
          //         return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
          //             {res.data.message}
          //         </Box>;
          //     }
          // });
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log("err", err);
      });
  }

  const setamountvalue = () => {
    const value = props.props.route.params?.amount;
    setAmount(value);
  };

  const amountvalue = () => {
    const value = amount - gstTotal;
    setGoldValue(value);
  };

  const totalValue = () => {
    const a = goldvalue;
    const b = gstTotal;

    const c = a + b;
    setTotal(c);
  };

  const gst = () => {
    const a = props.props.route.params?.amount;
    const b = a / 100;
    // / 100 * 2.91)
    const c = b * 2.91;
    setGstTotal(c);
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.breakdownview}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name="arrowleft" color="#FFEF22" size={25} />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            paddingStart: 20,
            fontSize: 18,
            fontFamily: fonts.MontserratBold,
          }}>
          Payment BreakDown
        </Text>
      </View>

      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 34,
        }}>
        <View
          style={{
            width: "100%",
            backgroundColor: "#2A2A2A",
            height: 230,
            marginTop: 20,
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingTop: 20,
            }}>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: fonts.MontserratBold,
              }}>
              Payment BreakDown
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingTop: 20,
            }}>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontFamily: fonts.MontserratBold,
              }}>
              Gold Quantity
            </Text>

            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontFamily: fonts.MontserratBold,
              }}>
              {props.props.route.params?.gold.toFixed(4)}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingTop: 20,
            }}>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontFamily: fonts.MontserratBold,
              }}>
              Gold Value
            </Text>

            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontFamily: fonts.MontserratBold,
              }}>
              <FontAwesome name="rupee" color="white" size={15} />
              {/* {goldvalue} */}
              {amount - gstTotal}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingTop: 20,
            }}>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontFamily: fonts.MontserratBold,
              }}>
              GST(3.0%)
            </Text>

            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontFamily: fonts.MontserratBold,
              }}>
              <FontAwesome name="rupee" color="white" size={15} />
              {gstTotal}
            </Text>
          </View>

          <Divider style={{ marginTop: 10 }} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingTop: 20,
            }}>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontFamily: fonts.MontserratBold,
              }}>
              Total Amount Payble
            </Text>

            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontFamily: fonts.MontserratBold,
              }}>
              <FontAwesome name="rupee" color="white" size={15} />
              {total}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ width: "100%", paddingHorizontal: 34, marginTop: 400 }}>
        <TouchableOpacity
          onPress={() => {
            buyGold();
            setLoader(true);
          }}
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFEF22",
            height: 60,
            borderRadius: 20,
          }}>
          {loader ? (
            <View>
              <ActivityIndicator color="white" />
            </View>
          ) : (
            <Text
              style={{
                color: "black",
                fontSize: 14,
                fontFamily: fonts.MontserratBold,
              }}>
              Pay Now
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  breakdownview: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",

    marginTop: 20,

    paddingHorizontal: 34,
  },
  mainView: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default (props) => {
  return (
    <NativeBaseProvider>
      <PaymentBreakDown props={props} />
    </NativeBaseProvider>
  );
};
