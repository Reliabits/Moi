import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Info from "../assets/svg/info.svg";
import colors from "../assets/colors";
import ButtonNoLine from "./ButtonNoLine";
import fonts from "../theme/fonts";

const InfoCardWithButton = (props) => {
  const { title, btntitle, subtitle, info, width } = props;
  return (
    <View style={styles.cardStyle}>
      <View style={{ width: "50%" }}>
        <View style={styles.viewLeftTop}>
          <View style={{ marginHorizontal: 4 }}>
            <Text style={[styles.text, { width: width }]}>{title}</Text>
          </View>
          {info && <Info height={20} width={30} />}
        </View>
        <View>
          <Text style={styles.text1}>{subtitle}</Text>
        </View>
      </View>

      <ButtonNoLine
        title={btntitle}
        onPress={() => {
          props?.onPress();
        }}
      />
    </View>
  );
};

export default InfoCardWithButton;

const styles = StyleSheet.create({
  cardStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.lightapp,
    padding: 12,
    borderRadius: 12,
  },
  text: {
    color: colors.white,
    fontFamily: fonts.MontserratBold,
    fontSize: 18,
  },
  text1: {
    color: colors.white,
    fontFamily: fonts.MontserratMedium,
    paddingTop: 15,
    fontSize: 14,
  },
  rightSideView: {
    width: "50%",
    alignContent: "flex-end",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  viewLeftTop: {
    width: "50%",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  viewRight: {
    width: "50%",
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
