import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import fonts from "../../../theme/fonts";
import { Modal, FormControl, Input, Button, Divider } from "native-base";
import { useNavigation } from "@react-navigation/native";
import flower from "../../../assets/images/flower.png";
import Union3 from "../../../assets/images/Union3.png";
import apis from "../../../lib/apis";
import { useEffect } from "react";

const ConfirmWithdraw = (props) => {
  console.log("props from select amount", props);
  const navigation = useNavigation();

  const [placements, setPlacements] = useState(undefined);
  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const [goldRate, setGoldRate] = useState([]);
  const [banks, setBanks] = useState([]);
  const [loader, setLoader] = useState(true);
  const [upi, setUpi] = useState("");
  const [loading, setLoading] = useState(false);
  // const [sell, setSell] = useState(false);

  const openedModal = (placements) => {
    setOpened(true);
    setPlacements(placements);
  };
  const openModal = (placement) => {
    setOpen(true);
    setPlacement(placement);
  };

  console.log("props", props);

  useEffect(() => {
    goldRates();
    getBank();
  }, []);

  function goldRates() {
    apis
      .goldRates()
      .then((res) => {
        console.log("response", res);

        setGoldRate(res.data.data);
        // startTimer()

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
        setLoader(false);
      });
  }

  function getBank() {
    apis
      .getBank()
      .then((res) => {
        console.log("response", res);
        setBanks(res.data.data);
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
        setLoader(false);
      });
  }

  function sellGold() {
    // setLoader(true);
    let params = {
      amount: props?.route?.params?.props?.route?.params?.gold?.toFixed(4),
      gold_rates: goldRate.gold_rates_sell,
      recipeint: {
        upi: banks,
      },
    };
    apis
      .sellGold(params)
      .then(async (res) => {
        console.log("res", res);
        // setLoader(false);
        // setUrl("set url ",res.data.url)
        if (res.status == 200) {
          console.log("api resopnse", `${res.status}`);
          Alert.alert("", res.data.message);
          navigation.navigate("HomeScreen", { sell: true });
        } else {
          console.log("error", `${res.data.message}`);
          Alert.alert("", `${res.data.message}`);
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
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <View style={styles.mainView}>
      <ScrollView>
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

        <TouchableOpacity
          onPress={() => openModal("center")}
          style={{
            flexDirection: "row",
            width: "100%",
            paddingHorizontal: 20,
            marginTop: 41,
          }}>
          <View
            style={{
              width: "100%",
              paddingVertical: 20,
              paddingHorizontal: 21,
              backgroundColor: "#2A2A2A",
              height: 150,
              borderRadius: 20,
            }}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 21,
              }}>
              <Image source={Union3} />

              <Text
                style={{
                  color: "white",
                  fontFamily: fonts.MontserratBold,
                  fontSize: 16,
                  paddingStart: 20,
                }}>
                Withdraw Summary
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 21,
                marginTop: 20,
                justifyContent: "space-between",
              }}>
              <Text
                style={{
                  color: "#C7C7C7",
                  fontSize: 12,
                  fontFamily: fonts.MontserratMedium,
                }}>
                Current Sell price
              </Text>

              <Text
                style={{
                  color: "#C7C7C7",
                  fontSize: 12,
                  fontFamily: fonts.MontserratMedium,
                }}>
                ₹{" "}
                {loader ? (
                  <ActivityIndicator color="white" />
                ) : (
                  goldRate.gold_rates_sell
                )}{" "}
                / gm
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 21,
                marginTop: 20,
                justifyContent: "space-between",
              }}>
              <Text
                style={{
                  color: "#C7C7C7",
                  fontSize: 12,
                  fontFamily: fonts.MontserratMedium,
                }}>
                Gold Quantity
              </Text>

              <Text
                style={{
                  color: "#C7C7C7",
                  fontSize: 12,
                  fontFamily: fonts.MontserratMedium,
                }}>
                {props?.route?.params?.props?.route?.params?.gold?.toFixed(4)}{" "}
                gms
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => openModal("center")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            paddingHorizontal: 20,
            marginTop: 10,
          }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 21,
              backgroundColor: "#2A2A2A",
              height: 69,
              borderRadius: 20,
              justifyContent: "space-between",
            }}>
            <Text
              style={{
                color: "#C7C7C7",
                fontSize: 12,
                fontFamily: fonts.MontserratMedium,
              }}>
              Amount to be credited
            </Text>
            <Text
              style={{
                color: "#C7C7C7",
                fontSize: 12,
                fontFamily: fonts.MontserratMedium,
              }}>
              ₹ {props?.route?.params?.props?.route?.params?.amount}
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Divider style={{ marginTop: 21, backgroundColor: "#FFEF22" }} />
        </View>

        {loader ? (
          <View
            style={{
              height: 60,
              narginTop: 20,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <ActivityIndicator color="white" />
          </View>
        ) : (
          <FlatList
            data={banks}
            style={{ marginTop: 20 }}
            showsVerticalScrollIndicator={false}
            // numColumns={3}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    paddingHorizontal: 20,
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 21,
                      backgroundColor: "#2A2A2A",
                      height: 69,
                      borderRadius: 20,
                      justifyContent: "space-between",
                    }}>
                    <Text
                      style={{
                        color: "white",
                        fontFamily: fonts.MontserratMedium,
                        fontSize: 16,
                        paddingStart: 20,
                      }}>
                      {item.upi}
                    </Text>
                    <AntDesign name="checkcircle" color="#FFEF22" size={15} />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}

        {/* <TouchableOpacity onPress={() => openModal("center")} style={{ flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 20, marginTop: 41 }} >
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 21, backgroundColor: '#2A2A2A', height: 69, borderRadius: 20, justifyContent: 'space-between' }}>


                        <Text style={{ color: 'white', fontFamily: fonts.MontserratMedium, fontSize: 16, paddingStart: 20 }}>
                            9999999999@paytm
                        </Text>
                        <AntDesign name='checkcircle' color="#FFEF22" size={15} />


                    </View>

                </TouchableOpacity> */}

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}>
          {/* navigation.navigate("OrderDetail", {amount: props?.route?.params?.props?.route?.params?.amount, gold: props?.route?.params?.props?.route?.params?.gold }) */}
          <TouchableOpacity
            onPress={() => {
              sellGold(), setLoading(true);
            }}
            style={{
              width: 221,
              height: 44,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFEF22",
              borderRadius: 16,
            }}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontFamily: fonts.MontserratBold,
                }}>
                Confirm Withdraw
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "black",
  },
  otpView: {
    width: "100%",
    height: 40,
    color: "black",
    marginHorizontal: 20,

    // marginStart:'4%'
  },
  underlineStyleBase: {
    width: 50,
    height: 50,
    borderWidth: 0,
    color: "white",
    backgroundColor: "#2C5A7E",
    // marginStart:'10%',
  },
});

export default ConfirmWithdraw;
