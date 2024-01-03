import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import fonts from "../theme/fonts";
import colors from "../assets/colors";
import Profile from "./Profile";

const Tab = createMaterialTopTabNavigator();

const ViewProfile = ({ props }) => {
  const navigation = useNavigation();

  function MyTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 18,
            padding: 10,
            fontFamily: fonts.MontserratBold,
          },
          tabBarIndicatorStyle: { backgroundColor: colors.tabActiveColor },
          tabBarStyle: { backgroundColor: "black" },
          tabBarActiveTintColor: colors.tabInActivColor,
          tabBarInactiveTintColor: colors.bg,
        }}
      >
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Settings" component={Profile} />
      </Tab.Navigator>
    );
  }

  return (
    <SafeAreaView style={styles.mainView}>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          height: 40,
          flexDirection: "row",
          paddingStart: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.pop()}>
          <AntDesign name="arrowleft" size={25} color="grey" />
        </TouchableOpacity>

        <Text style={[styles.label, styles.padding]}>Profile</Text>
      </View>
      {MyTabs()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "white",
    fontFamily: fonts.MontserratBold,
    fontSize: 15,
  },
  padding: {
    paddingStart: 20,
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    paddingBottom: 10,
  },
  labelRight: {
    color: "white",
    paddingStart: 20,
    fontFamily: fonts.MontserratRegular,
    fontSize: 15,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
  },
});

export default ViewProfile;
