import { ActivityIndicator, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Augument from "../assets/svg/augument.svg";
import Rupeescoin from "../assets/svg/rupeescoin.svg";
import colors from "../assets/colors";
import fonts from "../theme/fonts";
import apis from "../lib/apis";
import { useNavigation } from "@react-navigation/native";
import  Augmunt from '../assets/images/Augmont.png'
const InfoCard = () => {
  const [balance, setBalance] = useState([]);
  const [loader, setLoader] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      // Call any action
      walletApi();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  function walletApi() {
    apis
      .walletApi()
      .then((res) => {
        console.log("response", res);

        if (res.status == 200) {
          setBalance(res.data.data);

          console.log("success", res.data.message);
        } else {
          console.log("error", res.data.error);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoader(false);
    })
  }

  return (
    <View style={styles.cardStyle}>
      <View style={{ width: "50%" }}>
        <View style={styles.viewLeftTop}>
          <Rupeescoin height={36} width={30} />
          <View style={{ marginHorizontal: 4 }}>
            <Text style={styles.text}>Your Gold</Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.text}>24k | 99.9% Pure Gold</Text>
        </View>
      </View>

      <View
        style={{
          width: "50%",
          alignContent: "flex-end",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <View style={styles.viewLeftTop}>
          <Text
            style={[
              styles.text,
              { marginTop: 10, fontFamily: fonts.MontserratBold },
            ]}
          >

            {loader ? (
            <ActivityIndicator color="white" />
            ): (
             ( balance?.gold_balance && balance?.gold_balance)?.toFixed(4)
            )} gm
          </Text>
        </View>
        <View>

          <Image source={Augmunt} style={{ width:120, height:20}} />
          {/* <Augument /> */}
        </View>
      </View>
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  cardStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#d4722b",
    padding: 12,
    borderRadius: 12,
  },
  text: {
    color: colors.white,
    alignSelf: "center",
    fontFamily: fonts.MontserratMedium,
  },
  viewLeftTop: {
    width: "50%",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
});
