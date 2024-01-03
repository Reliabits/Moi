/**
    * @description      : 
    * @author           : sheezy
    * @group            : 
    * @created          : 30/01/2023 - 15:42:05
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 30/01/2023
    * - Author          : sheezy
    * - Modification    : 
**/
import React, {useEffect} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, Platform, BackHandler, Alert } from "react-native";
import Dashboard from "./Dashboard";
import colors from "../../../assets/colors";
import images from "../../../theme/images";
import LoanStart from "./LoanStart";
import PaymentGateway from "./PaymentGateway";
import fonts from "../../../theme/fonts";
import Loans from "./Loans";
import Transaction from "../../Transaction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from '@react-navigation/native';
import GoldTransaction from '../../GoldTransaction'
const Tab = createBottomTabNavigator();

export default HomeSacreen = ({ navigation }) => {

  const route = useRoute();
console.log("router1234...",route.name);

// useEffect(()=>{
  // console.log("abcdefghij",Navigation.dangerouslyGetParent().state.routes[Navigation.dangerouslyGetParent().state.index].name);
// },[])

  // useEffect(() => {
    
  //   const backAction = () => {
  //     if( route.name=="HomeScreen"){
  //       console.log("rt 1...",route.name);
  //       Alert.alert('Hold on!', 'Are you sure to Exit?', [
  //         {
  //           text: 'Cancel',
  //           onPress: () => null,
  //           style: 'cancel',
  //         },
  //         {text: 'YES', onPress: () => BackHandler.exitApp()},
  //       ]);
  //       return true;
  //     }
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);

  useEffect(() => {
    getPinTokken()
    
  },[]);
  const getPinTokken = async () => {
    const token = await AsyncStorage.getItem("pin")
    console.log("token of pin:", token)
  }
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        showLabel: false,
        tabBarActiveTintColor: colors.tabActiveColor,
        style: {
          backgroundColor: "black",
        },
        tabBarStyle: {
          backgroundColor: "black",
          height: Platform.OS == "ios" ? 80 : 60,
          paddingBottom: 15,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 10,
                width: 50,
              }}
            >
              {focused ? (
                <Image source={images.activehome} />
              ) : (
                <Image source={images.home} />
              )}
            </View>
          ),
          tabBarLabelStyle: {
            fontFamily: fonts.MontserratBold,
          },
        }}
      />

      <Tab.Screen
        name="Loan"
        component={Loans}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 10,
                width: 50,
              }}
            >
              {focused ? (
                <Image source={images.activeloan} />
              ) : (
                <Image source={images.loans} />
              )}
            </View>
          ),
          tabBarLabelStyle: {
            fontFamily: fonts.MontserratBold,
            // borderBottomColor : colors.tabActiveColor,
            // borderBottomWidth : 2,marginVertical:5
          },
        }}
      />
      <Tab.Screen
        name="Transaction"
        onPress ={() => {alert("afadf")}}
        children={() => <GoldTransaction data={true} />}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 10,
                width: 50,
              }}
            >
              {focused ? (
                <Image
                  source={images.transaction}
                  style={{ tintColor: "yellow" }}
                />
              ) : (
                <Image source={images.transaction} />
              )}
            </View>
          ),
          tabBarLabelStyle: {
            fontFamily: fonts.MontserratBold,
          },
        }}
      />

      {/* <Tab.Screen
        name="Portfolio"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 10,
                width: 50,
              }}
            >
              {focused ? (
                <Image
                  source={images.portfolio}
                  style={{ tintColor: "yellow" }}
                />
              ) : (
                <Image source={images.portfolio} />
              )}
            </View>
          ),
          tabBarLabelStyle: {
            fontFamily: fonts.MontserratBold,
          },
        }}
      /> */}
    </Tab.Navigator>
  );
};
