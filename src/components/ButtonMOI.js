import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../assets/colors";
import fonts from "../theme/fonts";

const ButtonMOI = ({ title }) => {
  return (
    <View style={styles.rightSideView}>
      <View style={styles.viewRight}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
};

export default ButtonMOI;

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    fontSize: 12,
   fontFamily : fonts.MontserratBold
  },
  rightSideView: {
    justifyContent: "center",
  },
  viewLeftTop: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  viewRight: {
    borderColor: colors.tabActiveColor,
    borderWidth: 2,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 24,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
