/**
    * @description      : 
    * @author           : sheezy
    * @group            : 
    * @created          : 30/01/2023 - 15:45:26
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 30/01/2023
    * - Author          : sheezy
    * - Modification    : 
**/
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ActivityIndicator,
  
} from "react-native";
import React from "react";
import colors from "../../../assets/colors";
import InfoCard from "../../../components/InfoCard";
import InfoCardWithButton from "../../../components/InfoCardWithButton";
import SetUpInvestCard from "../../../components/SetUpInvestCard";
import LimitedOfferView from "../../../components/LimitedOfferView";
import HeaderDrawer from "../../../components/HeaderDrawer";
import { NativeBaseProvider } from "native-base";
import { useEffect } from "react";
import apis from "../../../lib/apis";
import { useState } from "react";
import fonts from "../../../theme/fonts";
import { useDispatch } from "react-redux";
import { PROFILE } from "../../../Redux/Constant";
import { StackActions, useNavigation ,useRoute} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Dashboard = (props) => {
  const [profile, setProfile] = useState(null);
  // const [ten, setTen] = useState(10)
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = React.useState(false);
  // const [amount, setAmount] = React.useState(10);
  const [loader, setLoader] = useState(false);

  const route = useRoute();
  console.log("router1234 from Dashboard...",route.name);



  const dispatch = useDispatch()

  useEffect(() => {
    getProfile();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getProfile();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  function getProfile() {
    apis
      .getProfile()
      .then((res) => {
        console.log("res", res);
        if (res.status == 200) {
          setProfile(res.data.user);
          dispatch({
            type : PROFILE,
            payload : res.data.user
          })
          if (!res.data.user?.name) {
            if (res.data.user?.name.length != 0) {
            } else {
              navigation.navigate("UserName");
            }
          }
        } else if(res.status == 401){
          AsyncStorage.removeItem('token')
          navigation.dispatch(StackActions.replace("LoginPageTwo"));
        }else {
          navigation.navigate("UserName");
        }
        
      })
      .catch((err) => {
        console.log("err", err);
      });
  }



  function buyGold() {
    setLoader(true);
    let params = {
      amount: 10,

    };
    apis
      .buyGold(params)
      .then(async (res) => {

        setLoader(false);
        // setUrl("set url ",res.data.url)
        if (res.status == 200) {

          // setUrl("set url ", res.data.url)
          console.log("res url", res)
          console.log("buy gold api response", `${res.status}`)
          navigation.navigate("PaymentPayu", { url: res.data.url })
          // Linking.openURL(res.data.url)

          // navigation.dispatch(StackActions.replace("HomeScreen"));
        } else {
          console.log("error", `${res.data.error}`)
          // toast.show({
          //     render: () => {
          //         return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
          //             {res.data.message}
          //         </Box>;
          //     }
          // });
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log("err", err);
      });
  }

  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <StatusBar backgroundColor={colors.appBack} />
        <HeaderDrawer profile={profile} navigation={navigation} />
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }

        
        >
          <View style={styles.container}>
            {/* Top of view */}

            {/* User Info view */}
            <View style={{ marginVertical: 20 }}>
              <Text style={styles.nameText}>Hello, {profile?.name}</Text>
            </View>
            {/* Info card withou button */}
            <View>
              <InfoCard />
            </View>
            <View style={{ marginVertical: 20 }}>
              <Text style={styles.nameText}>Start your investment journey</Text>
            </View>
            {/* Info card with button */}
            <View>
              <InfoCardWithButton
                // info={true}
                title={"₹ 10.00" }
                subtitle={"Start by investing ₹ 10"}
                btntitle={loader ? <ActivityIndicator /> : "Invest Now"}
                onPress={() => {
                  {
                    buyGold();
                    setLoader(true)
                    // navigation.navigate("Buy Gold");
                   
                    
                  }
                }}
              />
              {/* <View style={{ marginVertical: 20 }}>
                <InfoCardWithButton
                  info={false}
                  width={200}
                  title={"Daily amount"}
                  subtitle={"Grow your wealth with daily investments"}
                  btntitle={"Set amount"}
                />
              </View> */}
            </View>
            {/* Bottom setauto invest view */}
            <View  style={{ marginVertical: 20 }} >
              <SetUpInvestCard />
            </View>

            {/* Bottom view  */}

            <View style={{ marginVertical: 13, marginBottom: 100 }}>
              <LimitedOfferView />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    padding: 12,
  },
  TopView: {
    borderBottomLeftRadius: 24,
    borderBottomEndRadius: 24,

    justifyContent: "center",
    alignContent: "center",
  },
  RowOne: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameText: {
    color: "#fff",
    fontFamily: fonts.MontserratBold,
  },
  grey: {
    backgroundColor: colors.bg,
    padding: 15,
    borderRadius: 50,
    alignSelf: "center",
  },
});
