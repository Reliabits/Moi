import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";

import SqureRoundIcon from "../components/SqureRoundIcon";
import CardInfo from "../components/CardInfo";
import Notification from "../assets/svg/Grey_notification.svg";
import Bar from "../assets/svg/bar.svg";
import colors from "../assets/colors";
import fonts from "../theme/fonts";
import { Modal } from "native-base";
import constArray from "../theme/constantArray";
import images from "../theme/images";
import SvgIcon from "../theme/SvgIcon";
import apis from "../lib/apis";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HeaderDrawer(props) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [loading, setLoading] = React.useState(true);
  console.log("props", props);
  const dataRedux = useSelector((state) => state);

  const [goldRate, setGoldRate] = useState([]);

  useEffect(() => {
    goldRates();
  }, []);

  function goldRates() {
    apis
      .goldRates()
      .then((res) => {
        console.log("response", res);

        setGoldRate(res.data.data);

        if (res.data.message) {
          console.log("success", res.data.message);
        } else {
          console.log("error", res.data.error);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function renderModal() {
    return (
      <View>
        <Modal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          safeAreaTop={true}
        >
          <Modal.Content
            width={"85%"}
            height={"100%"}
            borderRadius={0}
            borderTopRightRadius={0}
            borderBottomRightRadius={0}
            backgroundColor={colors.bg}
            style={{ marginLeft: 0, marginRight: "auto", padding: 20 }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "90%",
                justifyContent: "space-between",
              }}
            >
              <View />
              <Pressable onPress={() => setModalVisible(false)}>
                <Image
                  style={{ marginTop: 30 }}
                  source={require("../assets/images/Bugger_icon.png")}
                />
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "80%",
              }}
            >
              <Image
                style={{
                  backgroundColor: "grey",
                  height: 70,
                  width: 70,
                  borderRadius: 70,
                }}
              />
              <View style={{ marginLeft: 20, justifyContent: "center" }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontFamily: fonts.MontserratBold,
                  }}
                >
                  {dataRedux.PROFILE?.name}
                </Text>
                <Pressable
                  onPress={() => {
                    setModalVisible(false);
                    props.navigation.navigate("ViewProfile");
                  }}
                >
                  <Text
                    style={{
                      textDecorationLine: "underline",
                      color: colors.white,
                      fontFamily: fonts.MontserratMedium,
                    }}
                  >
                    View Profile
                  </Text>
                </Pressable>
              </View>
            </View>
            <FlatList
              data={constArray.drawerList}
              style={{ marginTop: 20 }}
              showsVerticalScrollIndicator={false}
              // numColumns={3}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(item.title);
                      setModalVisible(false)
                    }}
                    style={{
                      backgroundColor: colors.lightapp,
                      borderRadius: 15,
                      paddingVertical: 20,
                      paddingHorizontal: 8,
                      marginRight: 10,
                      marginTop: 15,
                      flexDirection: "row",
                    }}
                  >
                    <item.icon style={{ alignSelf: "center" }} />

                    <Text
                      style={{
                        color: colors.white,
                        fontSize: 16,
                        fontFamily: fonts.MontserratBold,
                        // width: 70,
                        marginLeft: 20,
                        textAlign: "center",
                        marginTop: 10,
                      }}
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />

            <Pressable
              onPress={async () => {
                await AsyncStorage.removeItem("token");
                // await AsyncStorage.removeItem("pin")
                props.navigation.dispatch(StackActions.replace("LoginPageTwo"));
              }}
              style={{ padding: 10, flexDirection: "row" }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontFamily: fonts.MontserratBold,
                }}
              >
                Logout
              </Text>
              <SvgIcon.ArrowLeft style={{ alignSelf: "center", margin: 5 }} />
            </Pressable>
          </Modal.Content>
        </Modal>
      </View>
    );
  }
  return (
    <View style={styles.TopView}>
      {renderModal()}
      <View style={styles.TopViewInner}>
        <View style={styles.RowOne}>

          <View style={{ justifyContent: 'flex-start', flexDirection:'row', alignItems:'center', width:'50%'}}>
            
          <Pressable
            onPress={() => {
              setModalVisible(true);
            }}
            style={styles.grey}
          >
            <Bar />
            </Pressable>
            
            <View style={{
              marginStart: 50, justifyContent
            :"center", alignItems:'center'}}>
              <SqureRoundIcon />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "47%",
              justifyContent: "space-between",
            }}
          >
            <CardInfo
              title={"Gold Buy Price"}
              subTitle={
                loading ? (
                  <ActivityIndicator  
                    color="white"
                    style={{ alignSelf: "center" }}
                  />
                ) : (
                  <Text
                    style={{
                      color: "white",
                      fontFamily: fonts.MontserratBold,
                      fontSize: 12,
                    }}
                  >
                    ₹ {parseFloat(goldRate?.gold_rates_buy)?.toFixed(2)}/gm
                  </Text>
                )
              }
              onClicked={() => {
                navigation.navigate("Buy Gold");
              }}
            />
            <Pressable style={{justifyContent:"center", alignItems:'center'}} onPress={() => {
              navigation.navigate("Notification")
            }}>
              <Notification style={{ alignSelf: "center" }} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

export default HeaderDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    // padding: 12,
  },
  TopView: {
    backgroundColor: "black",
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 10,
  },
  TopViewInner: {
    backgroundColor: "black",
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 1,
    borderBottomColor: "grey",
    borderBottomRightRadius: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
  },
  RowOne: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameText: {
    color: "#fff",
    fontWeight: "bold",
  },
  grey: {
    backgroundColor: colors.bg,
    padding: 10,
    borderRadius: 50,
    alignSelf: "center",
  },
});
