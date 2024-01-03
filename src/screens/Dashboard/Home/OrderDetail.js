import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import fonts from "../../../theme/fonts";
import { Modal, FormControl, Input, Button, Divider } from "native-base";
import { useNavigation } from "@react-navigation/native";
import flower from "../../../assets/images/flower.png";
import Union3 from "../../../assets/images/Union3.png";

const OrderDetail = (props) => {
  console.log("props come from confirm widthdraw", props);
  const navigation = useNavigation();

  const [placements, setPlacements] = useState(undefined);
  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [opened, setOpened] = useState(false);

  const openedModal = (placements) => {
    setOpened(true);
    setPlacements(placements);
  };
  const openModal = (placement) => {
    setOpen(true);
    setPlacement(placement);
  };

  return (
    <View style={styles.mainView}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          paddingHorizontal: 27,
          marginTop: 41,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name="arrowleft" color="white" size={20} />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontFamily: fonts.MontserratBold,
            paddingStart: 80,
          }}>
          Select Account
        </Text>
      </View>

      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          flex: 1,
        }}>
        <Text
          style={{
            color: "#FFEF22",
            fontSize: 16,
            fontFamily: fonts.MontserratBold,
          }}>
          Your withdrawal is inprogress
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontFamily: fonts.MontserratBold,
            paddingTop: 16,
          }}>
          ₹ {props?.route?.params?.amount}
        </Text>
        <Text
          style={{
            color: "#C7C7C7",
            fontSize: 12,
            fontFamily: fonts.MontserratMedium,
            paddingTop: 16,
          }}>
          Gold Sold {props?.route?.params?.gold?.toFixed(4)} gm | Balance 0gms
        </Text>

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 60,
          }}>
          <Divider style={{ marginTop: 21, backgroundColor: "#FFEF22" }} />
        </View>

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 133,
          }}>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 10,
              fontFamily: fonts.MontserratMedium,
            }}>
            Don’t Worry! Cash will be deposited in your
          </Text>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 10,
              fontFamily: fonts.MontserratMedium,
            }}>
            account within 3-5days
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("");
            }}
            style={{
              width: 221,
              height: 44,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFEF22",
              borderRadius: 16,
              marginTop: 35,
            }}>
            <Text
              style={{
                color: "black",
                fontSize: 16,
                fontFamily: fonts.MontserratBold,
              }}>
              Confirm Withdraw
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: "100%",
    backgroundColor: "black",
  },
});

export default OrderDetail;
