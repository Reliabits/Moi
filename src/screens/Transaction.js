// /**
//     * @description      : 
//     * @author           : sheezy
//     * @group            : 
//     * @created          : 01/02/2023 - 15:10:56
//     * 
//     * MODIFICATION LOG
//     * - Version         : 1.0.0
//     * - Date            : 01/02/2023
//     * - Author          : sheezy
//     * - Modification    : 
// **/
// import { SafeAreaView, StyleSheet, Text, View } from "react-native";
// import React from "react";
// import fonts from "../theme/fonts";
// import HeaderDrawer from "../components/HeaderDrawer";
// import { useEffect } from "react";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import GoldTransaction from "./GoldTransaction";
// import colors from "../assets/colors";
// import { memo } from "react";

// const Tab = createMaterialTopTabNavigator();

// const Transaction = (props) => {
//   useEffect(() => {
//     console.log("transaction useefeect vall",props)
//   }, [props]);

//   function MyTabs() {
//     return (
      
//       <Tab.Navigator
//         screenOptions={{
//           tabBarLabelStyle: {
//             fontSize: 18,
//             padding: 10,
//             fontFamily: fonts.MontserratBold,
//           },
//           tabBarStyle: { backgroundColor: "black" },
//           tabBarActiveTintColor: colors.tabInActivColor,
//           tabBarInactiveTintColor: colors.bg,
//         }}
//       >
//         <Tab.Screen name="Gold" component={GoldTransaction} />
//         {/* <Tab.Screen name="Winnings" component={GoldTransaction} /> */}
//       </Tab.Navigator>
//     );
//   }

//   return (
//     <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
//       <HeaderDrawer profile={null} navigation={props.navigation} />

//       {MyTabs()}
//     </SafeAreaView>
//   );
// };

// export default Transaction;

// const styles = StyleSheet.create({});
