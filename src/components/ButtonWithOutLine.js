import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../assets/colors";
import fonts from "../theme/fonts";

const ButtonWithOutLine = ({ title }) => {
  return (
    <View style={styles.rightSideView}>
      <View style={styles.viewRight}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
};

export default ButtonWithOutLine;

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    fontSize: 12,
    fontFamily: fonts.MontserratBold,
    paddingHorizontal: 30,
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
    backgroundColor: colors.tabActiveColor,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 24,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
