import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
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
import { useNavigation } from "@react-navigation/native";
// import RadioButtonRN from 'radio-buttons-react-native';

const data = [
  {
    label: "data 1",
  },
];

interface Props {
  label: string;
}

const PaymentGateway: FC<Props> = ({ label }) => {
  const navigation = useNavigation();

  const [value, setValue] = React.useState("one");
  const [visible, setVisible] = useState(false);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const renderDropdown = () => {
    if (visible) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 250,
            justifyContent: "space-between",
            marginVertical: 20,
            width: "100%",
            paddingHorizontal: 40,
          }}
        >
          <Radio.Group
            defaultValue="1"
            name="exampleGroup"
            accessibilityLabel="favorite colorscheme"
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                marginTop: 20,
                alignItems: "center",
                paddingStart: "20%",
              }}
            >
              <View>
                <Image source={amazon1} />
              </View>

              <View>
                <Text style={{ color: "white" }}>Amazon Pay</Text>
              </View>

              <View>
                <Radio colorScheme="emerald" value="1" my={1} />
                {/* emerald
                                </Radio> */}
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                marginTop: 20,
                paddingStart: "20%",
              }}
            >
              <View>
                <Image source={gpay} />
              </View>

              <View>
                <Text style={{ color: "white" }}>GPay</Text>
              </View>

              <View>
                <Radio colorScheme="secondary" value="2" my={1} />
                {/* secondary
                                </Radio> */}
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                marginTop: 20,
                paddingStart: "20%",
              }}
            >
              <View>
                <Image source={paytm} />
              </View>

              <View>
                <Text style={{ color: "white" }}>PayTM</Text>
              </View>

              <View>
                <Radio colorScheme="warning" value="3" my={1} />
                {/* warning
                                </Radio> */}
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                marginTop: 20,
                paddingStart: "20%",
              }}
            >
              <View>
                <Image source={phonepe} />
              </View>

              <View>
                <Text style={{ color: "white" }}>Phonepe</Text>
              </View>

              <View>
                <Radio colorScheme="warning" value="4" my={1} />
                {/* warning
                                </Radio> */}
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                marginTop: 20,
                paddingStart: "20%",
              }}
            >
              <View>
                <Image source={whatsapp} />
              </View>

              <View>
                <Text style={{ color: "white" }}>Whatsapp</Text>
              </View>

              <View>
                <Radio colorScheme="yellow" value="5" my={1} />
                {/* warning
                                </Radio> */}
              </View>
            </View>
          </Radio.Group>
        </View>

        // <Text style={styles.dropdown}>
        //     This is where the dropdown will be rendered.
        // </Text>
      );
    }
  };

  return (
    <View style={styles.mainView}>
      <ScrollView>
        <View style={styles.headerView}>
          <AntDesign name="arrowleft" color="#ffef22" size={25} />
          <View style={{ paddingStart: 20 }}>
            <Image source={TopLogo} />
          </View>
        </View>

        <View style={styles.secondView}>
          <View>
            <Text style={{ color: "white", fontWeight: "500", fontSize: 10 }}>
              pay for Gold
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#ffef22", fontWeight: "700", fontSize: 20 }}>
              ₹ 5339.88
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "500", fontSize: 8 }}>
                View cart
              </Text>
              <AntDesign name="shoppingcart" color="white" size={12} />
            </View>
          </View>
        </View>

        <View style={styles.paymentcardsView}>
          <View style={styles.cardsView}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                alignItems: "center",
                paddingTop: 10,
                marginTop: 20,
              }}
            >
              <View style={{ width: "25%" }}>
                <Image source={paymentcard} />
              </View>

              <View style={{ width: "70%", justifyContent: "flex-start" }}>
                <Text
                  style={{ color: "white", fontWeight: "700", fontSize: 10 }}
                >
                  cardPayment
                </Text>
                <Text
                  style={{ color: "white", fontSize: 8, fontWeight: "400" }}
                >
                  Visa, Mastercard, RuPay and Mastercard
                </Text>
              </View>

              <View>
                <AntDesign name="right" color="white" size={20} />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                alignItems: "center",
                paddingTop: 10,
                marginTop: 20,
              }}
            >
              <View style={{ width: "25%" }}>
                <Image source={Union} />
              </View>

              <View style={{ width: "70%", justifyContent: "flex-start" }}>
                <Text
                  style={{ color: "white", fontWeight: "700", fontSize: 10 }}
                >
                  Net Banking
                </Text>
                <Text
                  style={{ color: "white", fontSize: 8, fontWeight: "400" }}
                >
                  All Indian banks
                </Text>
              </View>

              <View>
                <AntDesign name="right" color="white" size={20} />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                alignItems: "center",
                paddingTop: 10,
                marginTop: 20,
              }}
            >
              <View style={{ width: "25%" }}>
                <Image source={upi} />
              </View>

              <View style={{ justifyContent: "flex-start", width: "70%" }}>
                <Text
                  style={{ color: "white", fontWeight: "700", fontSize: 10 }}
                >
                  UPI payment
                </Text>
                <Text
                  style={{ color: "white", fontSize: 8, fontWeight: "400" }}
                >
                  Phonepe, Gpay and PayTM
                </Text>
              </View>

              <View>
                <TouchableOpacity onPress={toggleDropdown}>
                  {visible ? (
                    <AntDesign name="down" color="white" size={20} />
                  ) : (
                    <AntDesign name="right" color="white" size={20} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {renderDropdown()}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                alignItems: "center",
                paddingTop: 10,
                marginTop: 20,
              }}
            >
              <View style={{ width: "25%" }}>
                <Image source={wallet} />
              </View>

              <View style={{ justifyContent: "flex-start", width: "70%" }}>
                <Text
                  style={{ color: "white", fontWeight: "700", fontSize: 10 }}
                >
                  Wallet
                </Text>
                <Text
                  style={{ color: "white", fontSize: 8, fontWeight: "400" }}
                >
                  Mobiwik, PayTM and Airtel Money
                </Text>
              </View>

              <View>
                <AntDesign name="right" color="white" size={20} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={() => navigation.navigate("PaymentProgress")}
            style={{
              width: 127,
              height: 44,
              backgroundColor: "#ffef22",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 16,
            }}
          >
            <Text style={{ color: "#000000", fontWeight: "700", fontSize: 16 }}>
              Pay Now
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  cardsView: {
    width: "91%",

    backgroundColor: "#2A2A2A",
    borderRadius: 20,
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  paymentcardsView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  secondView: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
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

export default () => {
  return (
    <NativeBaseProvider>
      <PaymentGateway />
    </NativeBaseProvider>
  );
};
