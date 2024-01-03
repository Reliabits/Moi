import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import AppLogo from "../../assets/svg/AppLogo.svg";
import {
  NativeBaseProvider,
  Box,
  Input,
  KeyboardAvoidingView,
  useToast,
  Modal,
  Button
} from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import fonts from "../../theme/fonts";
import apis from "../../lib/apis";
import PhoneInput from "react-native-phone-number-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { termAndcondi } from "../../assets/TermandCondition";
import { policyandprivacy } from "../../assets/PrivacyPolicy";

const LoginPageOne = (props) => {
  const [phone, setPhone] = useState("");
  const [countrycode, setcountrycode] = useState("+91");
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const toast = useToast();
  const [isOpenModal, setisOpenModal] = useState(false)
  const [privacyModal, setPrivacyModal] = useState(false)


  const onModalshow = () => {
    setisOpenModal(true)
    console.log("clicked modal show function ")
  }

  async function createAccount() {
    let params = {
      phone: phone,
      country_code: countrycode.replace(phone, " ").trim(),
    };
    setLoader(true);
    apis
      .createAccount(params)
      .then(async (res) => {
        setLoader(false);
        if (res.status == 200) {
          // alert("OTP sent!");
          toast.show({
            render: () => {
              return (
                <Box
                  bg="green.500"
                  color={"white"}
                  px="3"
                  py="3"
                  rounded="xl"
                  mb={5}
                >
                  <Text>
                    Otp sent!
                  </Text>
                </Box>
              );
            },
          });

          navigation.navigate("Otp", {
            phone: phone,
            cc: countrycode,
            otp: "",
          });
        } else {
          // alert(res.data.message);

          toast.show({
            render: () => {
              return (
                <Box
                  bg="red.500"
                  color={"white"}
                  px="3"
                  py="3"
                  rounded="xl"
                  mb={5}
                >
                  <Text>
                    {/* Otp sent! please enter code */}
                    {res.data.message}
                  </Text>
                </Box>
              );
            },
          });

        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoader(false);
      });
  }

  async function createLoginOTP() {
    let params = {
      phone: phone,
      country_code: countrycode.replace(phone, " ").trim(),
    };
    setLoader(true);
    apis
      .createLoginOTP(params)
      .then(async (res) => {
        if (res.status == 200) {
          // alert("OTP sent!" );
          toast.show({
            render: () => {
              return (
                <Box
                  bg="green.500"
                  color={"white"}
                  px="3"
                  py="3"
                  rounded="xl"
                  mb={5}
                >
                  <Text>
                    Otp sent!
                  </Text>
                </Box>
              );
            },
          });

          navigation.navigate("Otp", {
            phone: phone,
            cc: countrycode,
            otp: "",
          });
        } else if (res.status == 403) {
          createAccount();
        }

        else {
          // alert(res.data.message);
          toast.show({
            render: () => {
              return (
                <Box
                  bg="red.500"
                  color={"white"}
                  px="3"
                  py="3"
                  rounded="xl"
                  mb={5}
                >
                  <Text>
                    {res.data.message}
                  </Text>
                </Box>
              );
            },
          });

        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoader(false);
      });
  }

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView behaviour="padding" enabled={false}>
        <SafeAreaView style={styles.mainView}>
          <StatusBar backgroundColor="#000000" />

          <Pressable onPress={() => navigation.pop()} style={styles.arrowView}>
            <AntDesign name="arrowleft" size={25} color="white" />
          </Pressable>

          <View style={styles.applogoView}>
            <AppLogo height={52} width={105} />
            <Text
              style={{
                color: "white",
                fontFamily: fonts.MontserratMedium,
                padding: 10,
              }}
            >
              Buy.Sell.Loan
            </Text>
          </View>

          {/* login and signup view*/}
          <View style={styles.loginAndSignupView}>
            <View style={styles.loginAndSignup}>
              <View style={{ marginTop: 29, marginStart: 30 }}>
                <Text
                  style={{
                    color: "white",
                    fontFamily: fonts.MontserratBold,
                    fontSize: 14,
                  }}
                >
                  {"Login/Sign Up"}
                </Text>
                <Text
                  style={{
                    color: "white",
                    paddingTop: 7,
                    fontFamily: fonts.MontserratRegular,
                    fontSize: 12,
                  }}
                >
                  Enter phone number, start saving. Simple
                </Text>
              </View>

              <View style={styles.inputview}>
                <Text style={{ color: 'black' }}>+91</Text>

                <TextInput onChangeText={(val) => {
                  console.log("phone number", val)
                  setPhone(val)
                }}
                  keyboardType={'phone-pad'}
                  placeholderTextColor={"black"}
                  style={{ fontSize: 12, color: 'black' }}
                  placeholder="Enter your 10-digit phone number" />
                {/* <PhoneInput
                  placeholder={"Phone Number"}
                  defaultCode="IN"
                  layout="first"
                  autoFocus
                  textInputStyle={{
                    fontFamily: fonts.MontserratBold,
                    fontSize: 12,
                    height: 70,
                    width: "100%",
                  }}
                  textInputProps={{
                    keyboardType: "decimal-pad",
                    style: {
                      fontFamily: fonts.MontserratBold,
                      color: "black",
                    },
                  }}
                  codeTextStyle={{
                    fontFamily: fonts.MontserratBold,
                    fontSize: 12,
                    marginLeft: -25,
                    margin: -10,
                    color: "black",
                  }}
                  containerStyle={{
                    width: "90%",
                    borderRadius: 20,
                    alignSelf: "center",
                    margin: -5,
                    height: 70,
                  }}
                  textContainerStyle={{
                    fontSize: 14,
                    fontFamily: fonts.MontserratBold,
                    borderRadius: 30,
                  }}
                  onSelect={(text) => {
                    console.log("countery", text);
                  }}
                  onChangeText={(text) => {
                    console.log("onChangeText", text);
                    setPhone(text);
                  }}
                  onChangeFormattedText={(text) => {
                    console.log("country", text);
                    setcountrycode(text);
                  }}
                /> */}
              </View>

              <View style={styles.buttonView}>
                <TouchableOpacity
                  onPress={() => {
                    createLoginOTP();
                  }}
                  style={styles.button}
                >
                  {loader ? (
                    <View>
                      <ActivityIndicator color="white" />
                    </View>
                  ) : (
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: 12,
                        fontFamily: fonts.MontserratBold,
                      }}
                    >
                      GET OTP
                    </Text>
                  )}
                </TouchableOpacity>
              </View>

              {/* <View style={styles.orView}>
                <Text
                  style={{
                    color: "white",
                    fontFamily: fonts.MontserratMedium,
                    fontSiz: 13,
                  }}
                >
                  Or
                </Text>
              </View> */}

              {/* <View style={styles.continueView}>
                <Text
                  style={{
                    color: "white",
                    textDecorationLine: "underline",
                    fontSize: 10,
                    paddingBottom: 10,
                    fontFamily: fonts.MontserratRegular,
                  }}
                >
                  Continue with gmail
                </Text>
              </View> */}
            </View>
          </View>
          <View>
            <View style={styles.bottomText}>
              {/* <Text
              style={{
                color: "white",
                fontFamily: fonts.MontserratMedium,
                fontSize: 10,
              }}
            >
              By proceeding, you accept the{" "}
              <Text style={{ fontFamily: fonts.MontserratBold }}>
                {" "}
                terms and conditions
              </Text>
            </Text>
            <Text
              style={{
                color: "white",
                fontFamily: fonts.MontserratMedium,
                fontSize: 10,
              }}
            >
              Read the privacy policy{" "}
              <Text style={{ fontFamily: fonts.MontserratBold }}> here.</Text>
            </Text> */}

              <Text
                style={{
                  color: "white",
                  fontFamily: fonts.MontserratLight,
                  fontSize: 10,
                }}
              >
                By proceeding, you accept the{" "}

                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() =>

                  onModalshow()
                }>
                  <Text style={{ color: 'white', fontFamily: fonts.MontserratBold, fontSize: 12 }}>
                    {" "}
                    Terms and conditions
                  </Text>
                </TouchableOpacity>

              </Text>
              <TouchableOpacity onPress={() =>

                setPrivacyModal(true)
              }>

                <Text style={{ color: 'white', fontFamily: fonts.MontserratBold, fontSize: 12 }}>
                  Privacy Policy


                </Text>

              </TouchableOpacity>

            </View>


            <Modal isOpen={privacyModal} onClose={() => setPrivacyModal(false)} size="xl">
              <Modal.Content maxH="600" style={{ backgroundColor: "#2a2a2a" }} >
                <View style={{ backgroundColor: "white", flexDirection: "row", justifyContent: "center" }}>
                  <Text style={{ fontSize: 20, paddingLeft: 10, fontWeight: "bold", color: 'black' }}>
                    Privacy Policy
                  </Text>
                </View>
                <Modal.Body>
                  <ScrollView>
                    {policyandprivacy?.map(elm => {
                      return (
                        <View style={{ paddingVertical: 2 }}>
                          {elm.headingParagraph && <Text style={{ fontFamily: fonts.MontserratBold, color: "white" }}>
                            {elm.headingParagraph}
                          </Text>}
                          <Text style={{ color: "white", fontSize: 12, fontFamily: fonts.MontserratMedium }}>
                            {elm.paragraph}
                          </Text>
                        </View>
                      )
                    })}
                  </ScrollView>
                </Modal.Body>
                <View style={{ backgroundColor: "white", flexDirection: "row", justifyContent: "center", alignItems: "center", height: 40 }}>

                  <TouchableOpacity style={{ backgroundColor: "black", flexDirection: "row", justifyContent: "center", alignItems: "center", height: 30, width: 60, borderRadius: 10 }}
                    onPress={() => {
                      console.log("close btn ")
                      setPrivacyModal(false)
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>

              </Modal.Content>
            </Modal>

            {/* privacy policy  */}

            <Modal isOpen={isOpenModal} onClose={() => setisOpenModal(false)} size="xl">
              <Modal.Content maxH="600" style={{ backgroundColor: "#2a2a2a" }} >
                <View style={{ backgroundColor: "white", flexDirection: "row", justifyContent: "center" }}>
                  <Text style={{ fontSize: 20, paddingLeft: 10, fontWeight: "bold", color: 'black' }}>
                    Term and Condition
                  </Text>
                </View>

                <Modal.Body>
                  <ScrollView>
                    {termAndcondi?.map(elm => {
                      return (
                        <View style={{ paddingVertical: 2 }}>
                          {elm.headingParagraph && <Text style={{ fontFamily: fonts.MontserratBold, color: "white" }}>
                            {elm.headingParagraph}
                          </Text>}
                          <Text style={{ color: "white", fontSize: 12, fontFamily: fonts.MontserratMedium }}>
                            {elm.paragraph}
                          </Text>
                        </View>
                      )
                    })}
                  </ScrollView>
                </Modal.Body>
                <View style={{ backgroundColor: "white", flexDirection: "row", justifyContent: "center", alignItems: "center", height: 40 }}>
                  <TouchableOpacity style={{ backgroundColor: "black", flexDirection: "row", justifyContent: "center", alignItems: "center", height: 30, width: 60, borderRadius: 10 }}
                    onPress={() => {
                      console.log("close btn ")
                      setisOpenModal(false)
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal.Content>
            </Modal>

          </View>


        </SafeAreaView>

      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  arrowView: {
    width: "100%",
    justifyContent: "center",
    height: 20,
    alignItems: "flex-end",
    paddingEnd: 20,
    marginTop: 20,
  },

  bottomText: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // position :'absolute',
    // bottom :10,
  },
  continueView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  orView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 19,
  },
  button: {
    height: 34.58,
    width: 260,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FACD18",
    borderRadius: 40,
  },
  buttonView: {
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 30,
  },

  inputview: {
    width: 260,
    // height: 45,
    padding: 5,
    marginTop: 15,
    backgroundColor: "white",
    borderRadius: 40,
    paddingHorizontal: 30,
    alignItems: "center",
    flexDirection: 'row',
    marginStart: 30,
  },
  loginAndSignup: {
    height: "auto",
    width: 325,
    justifyContent: "center",

    backgroundColor: "#2A2A2A",
    borderRadius: 40,
  },
  loginAndSignupView: {
    width: "100%",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  applogoView: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },

  mainView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
  },
});

export default LoginPageOne;
