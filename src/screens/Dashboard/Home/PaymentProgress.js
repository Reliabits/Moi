import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { FC, useState } from "react";
import { NativeBaseProvider, Radio } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import TopLogo from "../../../assets/images/TopLogo.png";
import upi from "../../../assets/images/upi.png";
import Union from "../../../assets/images/Union.png";
import wallet from "../../../assets/images/wallet.png";
import paymentcard from "../../../assets/images/paymentcard.png";
import amazon1 from "../../../assets/images/amazon1.png";
import gpay from "../../../assets/images/gpay.png";
import whatsapp from "../../../assets/images/whatsapp.png";
import paytm from "../../../assets/images/paytm.png";
import phonepe from "../../../assets/images/phonepe.png";

const PaymentProgress = () => {
  const [loader, setLoader] = useState(true);

 

  return (
    <View style={styles.mainView}>
      <ScrollView>
        <View style={styles.headerView}>
          <AntDesign name="arrowleft" color="#ffef22" size={25} />
          <View style={{ paddingStart: 20 }}>
            <Image source={TopLogo} />
          </View>
        </View>

        {/* <View>
                  <ActivityIndicator size="large" color="#00ff00" />
              </View> */}

        <View
          style={{
            height: 300,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        ></View>

        <View style={styles.paymentProgressTextView}>
          <Text style={styles.text}>Payment in progress</Text>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.secondText}>Don't click back while</Text>
            <Text style={styles.secondText}>payment ongoing</Text>
          </View>
        </View>

        {/* <View style={styles.paymentProgressTextView}>

                  <Text style={styles.text}>Payment Successfull
                  </Text>

                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                      <Text style={styles.secondText}>
                         Congratulations!your payment


                      </Text>
                      <Text style={styles.secondTexttwo}>of <Text style={{color:'#ffef22', fontWeight:'700'}}>5339.89</Text> 24K gold was</Text>
                      <Text style={styles.secondTexttwo} >successfull</Text>
                  </View>


              </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  secondText: {
    color: "white",
    fontWeight: "500",
    fontSize: 20,
  },

  secondTexttwo: {
    color: "white",
    fontWeight: "400",
    fontSize: 20,
  },
  text: {
    color: "#ffef22",
    fontWeight: "700",
    fontSize: 26,
  },
  paymentProgressTextView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerView: {
    paddingHorizontal: 20,

    width: "100%",
    alignItems: "center",
    height: 60,
    flexDirection: "row",
  },

  mainView: {
    width: "100%",

    height: "100%",

    backgroundColor: "#000000",
  },
});

export default PaymentProgress;
