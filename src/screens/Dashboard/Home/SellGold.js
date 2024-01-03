import {
  StyleSheet,
  StatusBar,
  ScrollView,
  View,
  Text,
  SafeAreaView,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import SqureRoundIcon from "../../../components/SqureRoundIcon";
import colors from "../../../assets/colors";
import Notification from "../../../assets/svg/Grey_notification.svg";
import NoLoan from "../../../assets/svg/noloan.svg";
import ApplyLoan from "../../../assets/svg/ApplyLoan.svg";
import Calculator from "../../../assets/svg/calculator.svg";
import AppLogo from "../../../assets/svg/AppLogo.svg";
import TopLogo from "../../../assets/images/TopLogo.png";
import inrLogo from "../../../assets/images/inrLogo.png";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AugmontLogoOne from "../../../assets/images/AugmontLogoOne.png";
import AugmontLogoTwo from "../../../assets/images/AugmontLogoTwo.png";
import { NativeBaseProvider, useToast } from "native-base";

import MOIcolorcoin2 from "../../../assets/images/MOIcolorcoin2.png";
import GroupGold from "../../../assets/images/GroupGold.png";
import GroupSecure from "../../../assets/images/GroupSecure.png";
import apis from "../../../lib/apis";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import moment from "moment";
import fonts from "../../../theme/fonts";
import Fontisto from "react-native-vector-icons/Fontisto";
import cashwithdraw from "../../../assets/images/cashwithdraw.png";
import chain from "../../../assets/images/chain.png";
import Union2 from "../../../assets/images/Union2.png";
import Octicons from "react-native-vector-icons/Octicons";
import { useDispatch, useSelector } from "react-redux";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const SellGold = (props) => {
  // console.log("props", props);
  // console.log("props.route.params.ten", props.props.route.params.ten);
  const navigation = useNavigation();

  const [tabName, setTabName] = useState("tab-1");
  const [goldRate, setGoldRate] = React.useState([]);
  const [detail, setDetail] = useState([]);
  const toast = useToast();
  const [loader, setLoader] = useState(false);
  const [amount, setAmount] = useState("");
  const [grams, setGrams] = useState("");
  const [loading, setLoading] = useState(true);
  const [textInputAmount, setTextInputAmount] = useState("");
  const [balance, setBalance] = useState("");
  const [totalGoldRate, setTotalGoldRate] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [visible, setVisible] = useState(false);
  const [timer, setTimer] = useState("00:00:00");
  const [refreshing, setRefreshing] = React.useState(false);
  const [checkingKYC, setCheckingKYC] = useState(false);

  console.log("amount", amount);
  console.log("gram", grams);

  const dataRedux = useSelector((state) => state);
  console.log("dataRedux abc profile", dataRedux.PROFILE);
  console.log("kyc verfication isss ", dataRedux.PROFILE.isKycVerified);

  const checkTextInput = () => {
    let amountNo = parseFloat(amount);
    let AvailbleBalance = parseFloat(
      (balance.gold_balance * goldRate.gold_rates_sell).toFixed(2)
    );
    if (amountNo > AvailbleBalance) {
      alert(
        "Please Note: You cannot Sell more than the available Gold in your vault."
      );
    } else if (amountNo < 1) {
      alert(" you cannot sell gold for less than Rs.1");
    } else {
      if (!textInputAmount.trim()) {
        alert("Please Enter Amount to Sell Gold");
        navigation.navigate("Sell Gold");
      } else {
        navigation.navigate("SelectAccount", {
          amount: amount,
          gold: amount / goldRate.gold_rates_sell,
        });
      }
    }
  };

  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when needed
  const Ref = useRef(null);

  // The state for our timer
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("00:05:00");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 300);
    return deadline;
  };

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  // useEffect(() => {
  //     clearTimer(getDeadTime());
  // }, []);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  useEffect(() => {
    goldRates();
    clearTimer(getDeadTime());
    walletApi();

    if (!dataRedux.PROFILE.isKycVerified && amount >= 150000) {
      setCheckingKYC(true);
      alert(" Please Complete your KYC to Sell more than Rs.1.5 Lakhs of Gold");
    } else {
      setCheckingKYC(false);
    }

    const interval = setInterval(() => {
      goldRates();
      clearTimer(getDeadTime());
    }, 300000);
    return () => clearInterval(interval);
  }, [amount]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    goldRates();
    clearTimer(getDeadTime());
    walletApi();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  function goldRates() {
    apis
      .goldRates()
      .then((res) => {
        console.log("response", res);

        setGoldRate(res.data.data);
        startTimer();

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
        setLoading(false), onClickReset();
      });
  }

  function walletApi() {
    apis
      .walletApi()
      .then((res) => {
        console.log("response", res);

        setBalance(res.data.data);

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

  function buyGold() {
    setLoader(true);
    let params = {
      amount: amount,
    };
    apis
      .buyGold(params)
      .then(async (res) => {
        setLoader(false);
        // setUrl("set url ",res.data.url)
        if (res.status == 200) {
          // setUrl("set url ", res.data.url)
          console.log("res url", res);
          console.log("buy gold api response", `${res.status}`);
          navigation.navigate("PaymentPayu", { url: res.data.url });
          // Linking.openURL(res.data.url)

          // navigation.dispatch(StackActions.replace("HomeScreen"));
        } else {
          console.log("error", `${res.data.error}`);
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

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const renderDropdown = () => {
    if (visible) {
      return (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            marginTop: 20,
          }}>
          <View>
            <TouchableOpacity
              onPress={() => {
                if (selectedColor == "one") {
                  // setSelectedColor("one");
                  setSelectedColor(null);
                } else {
                  setSelectedColor("one");
                }
                let result = (balance?.gold_balance?.toFixed(4) * 25) / 100;
                let result2 = (result * goldRate.gold_rates_sell).toFixed(2);
                setAmount(result2);
                setGrams(result);
                setTextInputAmount(result);
                setTextInputAmount(result2);
              }}
              style={{
                width: 67,
                height: 36,
                backgroundColor: selectedColor == "one" ? "yellow" : "#2A2A2A",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}>
              <Text
                style={{ color: selectedColor == "one" ? "black" : "white" }}>
                25%
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                if (selectedColor == "two") {
                  // setSelectedColor("one");
                  setSelectedColor(null);
                } else {
                  setSelectedColor("two");
                }
                let result = (balance?.gold_balance?.toFixed(4) * 50) / 100;
                let result2 = (result * goldRate.gold_rates_sell).toFixed(2);
                setAmount(result2);
                setGrams(result);
                setTextInputAmount(result);
                setTextInputAmount(result2);
              }}
              style={{
                width: 67,
                height: 36,
                backgroundColor: selectedColor == "two" ? "yellow" : "#2A2A2A",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}>
              <Text
                style={{ color: selectedColor == "two" ? "black" : "white" }}>
                50%
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                if (selectedColor == "three") {
                  // setSelectedColor("one");
                  setSelectedColor(null);
                } else {
                  setSelectedColor("three");
                }
                let result = (balance?.gold_balance?.toFixed(4) * 75) / 100;
                let result2 = (result * goldRate.gold_rates_sell).toFixed(2);
                setAmount(result2);
                setGrams(result);
                setTextInputAmount(result);
                setTextInputAmount(result2);
              }}
              style={{
                width: 67,
                height: 36,
                backgroundColor:
                  selectedColor == "three" ? "yellow" : "#2A2A2A",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}>
              <Text
                style={{ color: selectedColor == "three" ? "black" : "white" }}>
                75%
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                if (selectedColor == "four") {
                  // setSelectedColor("one");
                  setSelectedColor(null);
                } else {
                  setSelectedColor("four");
                }
                let result = (balance?.gold_balance?.toFixed(4) * 100) / 100;
                let result2 = (result * goldRate.gold_rates_sell).toFixed(2);
                setAmount(result2);
                setGrams(result);
                setTextInputAmount(result);
                setTextInputAmount(result2);
              }}
              style={{
                width: 67,
                height: 36,
                backgroundColor: selectedColor == "four" ? "yellow" : "#2A2A2A",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}>
              <Text
                style={{ color: selectedColor == "four" ? "black" : "white" }}>
                100%
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  const IconRound = () => {
    return (
      <View>
        <Notification />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.appBack} />

      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.TopView}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}>
            <Image source={TopLogo} />

            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <AntDesign name="arrowleft" size={25} color="#FFEF22" />
            </TouchableOpacity>
          </View>
          <View style={{ paddingTop: 10 }}>
            <Text
              style={{
                color: "white",
                fontFamily: fonts.MontserratBold,
                fontSize: 16,
              }}>
              Sell Digital Gold
            </Text>
          </View>
          <View style={{ paddingTop: 10 }}>
            <Text
              style={{
                color: "#FFEF22",
                fontSize: 12,
                fontFamily: fonts.MontserratMedium,
              }}>
              100% secure |24k | 99.9% pure gold
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 10,
            }}>
            <View>
              <Text
                style={{
                  color: "#EBEBEB",
                  fontFamily: fonts.MontserratMedium,
                  fontSize: 12,
                }}>
                Live Gold Price{" "}
              </Text>

              {loading ? (
                <View>
                  <ActivityIndicator color="white" />
                </View>
              ) : (
                <Text
                  style={{
                    color: "#FFEF22",
                    fontFamily: fonts.MontserratBold,
                    fontSize: 15,
                  }}>
                  ₹ {parseFloat(goldRate.gold_rates_sell).toFixed(2)}/gm
                </Text>
              )}
            </View>

            <View
              style={{
                height: 37,
                width: "50%",
                alignItems: "flex-end",
              }}></View>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 10,
            }}>
            <Text
              style={{
                color: "white",
                fontSize: 12,
                fontFamily: fonts.MontserratMedium,
              }}>
              *price mentioned is inclusive of GST
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}>
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 10,
                  fontFamily: fonts.MontserratMedium,
                }}>
                Gold Availble to sell:
              </Text>

              <Text
                style={{
                  color: "#FFEF22",
                  fontSize: 15,
                  fontFamily: fonts.MontserratBold,
                  paddingTop: 10,
                }}>
                {balance?.gold_balance?.toFixed(4)} | ₹{" "}
                {(balance.gold_balance * goldRate.gold_rates_sell).toFixed(2)}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#FFEF22",
                height: 37,
                width: 140,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <MaterialCommunityIcons
                color="black"
                name="timer-outline"
                size={20}
              />
              <Text
                style={{
                  color: "#000000",
                  fontFamily: fonts.MontserratMedium,
                  fontSize: 12,
                }}>
                Gold price fixed {"\n"} for next
                {loading ? (
                  <View>
                    <ActivityIndicator color="white" />
                  </View>
                ) : (
                  <Text style={{ fontSize: 10, fontWeight: "700" }}>
                    {" "}
                    {timer}
                  </Text>
                )}
              </Text>
            </View>
          </View>
        </View>

        {/* this second main View*/}

        <View style={styles.secondView}>
          <Image source={cashwithdraw} />

          <Text
            style={{
              color: "white",
              fontFamily: fonts.MontserratBold,
              fontSize: 11,
              paddingStart: 10,
            }}>
            Withdraw Cash
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginTop: 20,
            alignItems: "center",
          }}>
          <View>
            <Text
              style={{
                color: "#FFEF22",
                fontSize: 12,
                fontFamily: fonts.MontserratMedium,
              }}>
              Sell in Rupee
            </Text>

            <View
              style={{
                width: 142,
                height: 53,
                justifyContent: "space-between",
                flexDirection: "row",
                backgroundColor: "#2A2A2A",
                alignItems: "center",
                borderRadius: 10,
                paddingHorizontal: 5,
                marginTop: 13,
              }}>
              <Text style={{ color: "white" }}>₹</Text>
              <TextInput
                value={amount.toString()}
                keyboardType="numeric"
                onChangeText={(val) => {
                  setAmount(val);
                  setTextInputAmount(val);
                  let result = (val / goldRate.gold_rates_sell).toFixed(4);
                  setGrams(result);
                }}
                placeholderTextColor="#DBDBDB"
                placeholder="0"
                style={{ width: "80%", color: "white" }}
              />
            </View>
          </View>

          {/* <Image source={chain} style={{marginTop:30}} /> */}
          <Octicons
            name="arrow-switch"
            style={{ marginTop: 30 }}
            color="#ffef22"
            size={25}
          />

          <View>
            <Text
              style={{
                color: "#FFEF22",
                fontSize: 12,
                fontFamily: fonts.MontserratMedium,
              }}>
              Sell in Grams
            </Text>

            <View
              style={{
                width: 142,
                height: 53,
                justifyContent: "space-between",
                flexDirection: "row",
                backgroundColor: "#2A2A2A",
                alignItems: "center",
                borderRadius: 10,
                paddingHorizontal: 5,
                marginTop: 13,
              }}>
              {console.log("grams in sellgold component :", grams)}

              <TextInput
                // ref={Ref}
                value={grams.toString()}
                onChangeText={(val) => {
                  setGrams(val);
                  let result = (val * goldRate.gold_rates_sell).toFixed(2);
                  setAmount(result);
                  setTextInputAmount(val);
                }}
                keyboardType="numeric"
                placeholderTextColor="#DBDBDB"
                placeholder="0"
                style={{ width: "80%", color: "white" }}
              />
              {/* <Text style={{ color: 'white' }}>{(amount / goldRate.gold_rates_sell).toFixed(4) }</Text> */}
              <Text style={{ color: "white" }}>gm</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 29,
          }}>
          <Text
            style={{
              color: "#FFEF22",
              fontSize: 10,
              fontFamily: fonts.MontserratMedium,
            }}>
            Sell as percentage of holdings
          </Text>
          <View>
            <TouchableOpacity onPress={toggleDropdown}>
              {visible ? (
                <AntDesign name="up" color="#FFEF22" size={20} />
              ) : (
                <AntDesign name="down" color="#FFEF22" size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {renderDropdown()}

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 150,
          }}>
          <TouchableOpacity
            disabled={loader || checkingKYC}
            onPress={() => {
              checkTextInput();
            }}
            style={{
              width: 221,
              height: 44,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFEF22",
              borderRadius: 16,
            }}>
            <Text
              style={{
                color: "black",
                fontSize: 16,
                fontFamily: fonts.MontserratBold,
              }}>
              Sell Gold
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginTop: 40,
          }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={Union2} />
            <Text
              style={{
                fontSize: 8,
                fontFamily: fonts.MontserratMedium,
                color: "#FFFFFF",
                textDecorationLine: "underline",
                paddingStart: 10,
              }}>
              100% secure
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontSize: 8,
                fontFamily: fonts.MontserratMedium,
                color: "#6E6E6E",
              }}>
              Terms of use
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontSize: 8,
                fontFamily: fonts.MontserratMedium,
                color: "#6E6E6E",
              }}>
              Privacy Policy
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  secondloremView: {
    width: "91%",
    height: 312,
    backgroundColor: "#2A2A2A",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  loremView: {
    paddingHorizontal: 20,
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  productDetailView: {
    justifyContent: "space-between",

    height: 60,
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  inputView: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },

  amountInputView: {
    paddingHorizontal: 20,

    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 20,
  },
  secondView: {
    width: "100%",
    flexDirection: "row",
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: colors.appBack,
  },

  TopView: {
    width: "100%",
    // flexDirection: 'row',
    // justifyContent: 'space-between',

    backgroundColor: "#2A2A2A",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,

    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  RowOne: {
    flexDirection: "row",
    justifyContent: "space-between",

    borderWidth: 1,
    borderBottomColor: "#FFFFFF40",

    width: "100%",

    backgroundColor: "#2A2A2A",
    paddingTop: 10,
  },
});

export default (props) => {
  return (
    <NativeBaseProvider>
      <SellGold props={props} />
    </NativeBaseProvider>
  );
};
