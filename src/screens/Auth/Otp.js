import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Keyboard,
  ActivityIndicator,
  Image
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { NativeBaseProvider, useToast, Box, KeyboardAvoidingView } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import apis from "../../lib/apis";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useNavigation } from "@react-navigation/native";
import fonts from "../../theme/fonts";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Timer from "../../components/Timer";
// import OTPTextView from "react-native-otp-textinput";
// import OTPInputView from '@twotalltotems/react-native-otp-input';
import otpgold from '../../assets/images/otpgold.png'

const Otp = (props) => {
  const navigation = useNavigation();
  const [otp, setotp] = useState("");
  const toast = useToast();
  const [loader, setLoader] = useState(false);
  const [timer, setTimer] = useState(60);
  const [count, setCount] = useState(59)
  const [pinToken, setPinToken] = useState("")
  const [countrycode, setcountrycode] = useState("+91");
  const [timeHandle, setTimeHandle] = useState(false)
  const [time, setTime] = useState(59);
  const [phone , setPhone] = useState("")                                                                                                                 
  // console.log("time value :", time);
  const timerRef = useRef(time);

  function verify() {
    if (otp.length != 6) {
      { console.log("invalid ") }
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
                Please enter otp!
              </Text>
            </Box>
          );
        },
      })
      // alert("Please enter otp!");
    } else {
      verifyOTP();
    }
  }


  const getPinTokken = async () => {
    const token = await AsyncStorage.getItem("pin")
    console.log("token of pin", token)
    setPinToken(token)
    console.log("token of setPinToken", setPinToken)
  }

  function verifyOTP() {
    setLoader(true);
    let params = {
      token: otp,
      phone: props.route.params.phone,
    };
    apis
      .verifyOTP(params)
      .then(async (res) => {
        setLoader(false);
        if (res.status == 200) {
          await AsyncStorage.setItem("phone", props.route.params.phone);
          await AsyncStorage.setItem("cc", props.route.params.cc);
          await AsyncStorage.setItem("token", res.data.data.accessToken);
          await AsyncStorage.setItem(
            "user",
            JSON.stringify(res.data.data.user)
          );
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
                 Login Successfull
                </Box>
              );
            },
          });
          // navigation.navigate("HomeScreen")
        
          
          // if (res.data.data?.new_user || !res.data.data.user?.name) {
          // if (res.data.data?.new_user & !pinToken) {
          //   // navigation.navigate("ScreenOne")
          //   navigation.navigate("ScreenOne");
          // } else if (res.data.data?.new_user & pinToken) {
          //   // navigation.navigate("VerifyPinCode")
          //   navigation.navigate("VerifyPinCode");
          
          // }
          // else if (res.data.data.user && !pinToken)
          // {
          //   navigation.navigate("ScreenOne");
          // }
          // else if (res.data.data.user && pinToken)
          // {
          //   navigation.navigate("VerifyPinCode");

          //   }
          // else {
          //   navigation.navigate("HomeScreen")
          // }



          if (res.data.data?.new_user || !res.data.data.user?.name) {
         navigation.navigate("UserName")
         
        }
        else {
            navigation.navigate("HomeScreen")
          }
        } else if (res.status == 400) {
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
                  Incorrect OTP. Please Enter the Correct OTP again
                </Box>
              );
            },
          });
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log("err", err);
      });
  }



  async function createLoginOTP() {
    let params = {
      phone: props.route.params?.phone,
      country_code: countrycode.replace(props.route.params?.phone, " ").trim(),
    };
    setLoader(true);
    apis
      .createLoginOTP(params)
      .then(async (res) => {
        if (res.status == 200) {
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
                    Otp sent! please enter code
                  </Text>
                </Box>
              );
            },
          });
          // alert("OTP sent again!, Please eneter code");

          // toast.show({
          //   render: () => {
          //     return (
          //       <Box
          //         bg="green.500"
          //         color={"white"}
          //         px="3"
          //         py="3"
          //         rounded="xl"
          //         mb={5}
          //       >
          //         {res.data.message}
          //       </Box>
          //     );
          //   },
          // });
          // navigation.navigate("Otp");
        }
        // else if (res.status == 403) {
        //   createAccount();
        // }

        else {
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
                  {res.data.message}
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
      total, hours, minutes, seconds
    };
  }


  const startTimer = (e) => {
    let { total, hours, minutes, seconds }
      = getTimeRemaining(e);
    // console.log("e value :",e )
    if (total >= 0) {

      // update the timer
      // check if less than 10 then we need to 
      // add '0' at the beginning of the variable

      setTimer(
        (hours > 9 ? hours : '0' + hours) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':'
        + (seconds > 9 ? seconds : '0' + seconds)
      )
    }
  }




  useEffect(() => {

    clearTimer();
    // timerId()
    getPinTokken()
    // createLoginOTP()
  }, [])

  const clearTimer = () => {
    // setTime(10);
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next    
    // setTimeHandle(true)
    // setTime(10)
    setTimer('00:0:10');

    // If you try to remove this line the 
    // updating of timer Variable will be
    // after 1000ms or 1sec
    // if (Ref.current) clearInterval(Ref.current);
    let countValue = 59
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        setTimeHandle(true)
        // setTime(10)
        timerRef.current = 59
        clearInterval(timerId);
      } else {
        startTimer(getDeadTime());

        countValue--
        setCount(countValue)
        // setTime(timerRef.current);
      }
    }, 1000);



    // const interval = setInterval(() => {
    //   startTimer(e);
    //   // if(timer=="00:00:00"){
    //   //   clearInterval(interval)
    //   // }
    //   console.log("set interval :")
    // }, 1000)
    // console.log("handle :",e)
    // // setTimeHandle(true)
    Ref.current = timerId;
    // setTimeHandle(true)
  }

  // const timeOutInterval = setTimeout(() => {
  //   // goldRates();

  //   // clearTimer(getDeadTime());
  //   setTimeHandle(true)
  //   console.log("handle color")
  //   // createLoginOTP()
  // }, 10*1000);


  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if 
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
  }

  const handleSendOtp = () => {
    createLoginOTP()
    setTimeHandle(false)
    clearTimer()
  }
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
  }

  return (
    <SafeAreaView style={styles.mainView}>
      <KeyboardAvoidingView style={{}}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            height: 40,
            flexDirection: "row",
            paddingStart: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={25} color="grey" />
          </TouchableOpacity>

          <Text
            style={{
              color: "white",
              paddingStart: 20,
              fontFamily: fonts.MontserratBold,
              fontSize: 15,
            }}
          >
            Verification
          </Text>
        </View>
        <Pressable
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View
            style={{
              width: "100%",

              marginTop: 100,
              // paddingStart: 20,
              justifyContent: 'center',
              alignItems: 'center'

            }}
          >

            <Image source={otpgold} />
            <Text
              style={{
                color: "white",
                fontFamily: fonts.MontserratBold,
                fontSize: 15,
                marginTop: 16
              }}
            >
              Enter the Otp
            </Text>
            <Text
              style={{
                color: "white",
                fontFamily: fonts.MontserratRegular,
                fontSize: 12,
                marginTop: 10,
              }}
            >
              Enter the OTP code we just sent

              <Text style={{ fontFamily: fonts.MontserratBold }}>
                {props.route.params?.phone}
              </Text>


            </Text>
            <Text style={{
              color: "white",
              fontFamily: fonts.MontserratRegular,
              fontSize: 12,
              marginTop: 5,
            }}>
              you on your registered mobile number
            </Text>
          </View>

          <View
            style={{
              width: "90%",
              justifyContent: "center",
              marginHorizontal: 20,
              height: 50,
              marginTop: 34
            }}
          >

            {/* <OTPTextView
              containerStyle={styles.OTPInput}
              textInputStyle={{ color: "white" }}
              handleTextChange={(text) => setotp(text)}
              inputCount={6}
              keyboardType="numeric"
            /> */}

            <OTPInputView
              pinCount={6}
              code={otp}
              placeholderCharacter={"-"}
              onCodeChanged={code => {
                console.log('code', code);
                setotp(code);
              }}
              autoFocusOnLoad={false}
              placeholderTextColor="white"

              // onCodeFilled={{borderColor:'#ffef22'}}

              // onChangeText={(text) => {
              //     console.log("text : ", text);
              //     console.log("text otp : ", otp);
              //     setOtp(text)
              // }}
              // placeholderTextColor="white"
              style={styles.OTPInput}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}

              codeInputFieldStyle={styles.underlineStyleBase}
              onCodeFilled={(code => {
                console.log(`Code is ${code}, you are good to go!`)
              })}
            />
          </View>

          <View
            style={{
              width: "100%",

              flexDirection: "row",
              marginTop: 30,
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <View style={{ width: "50%", paddingStart: 20 }}>
              <Text
                style={{
                  color: "#ffef22",
                  fontSize: 12,
                  fontFamily: fonts.MontserratMedium,
                }}
              >
                {`00:${count > 9 ? count : `0`+count }`}
                {/* {" "}
                <Timer /> */}
              </Text>
            </View>


            {/* <View
              style={{
                width: "50%",
                justifyContent: "center",
                alignItems: "flex-end",
                paddingEnd: 20,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  fontFamily: fonts.MontserratRegular,
                }}
              >
                call to verify in <Timer />
              </Text>
            </View> */}
          </View>

          <View style={{ width: '100%', justifyContent: 'center', paddingHorizontal: 21, marginTop: 10 }}>
            <Text style={{
              color: '#9FA0A3', fontFamily: fonts.MontserratRegular, fontSize: 12
            }}>
              We send verification code to your phone number You can check your inbox.
            </Text>
          </View>
          <TouchableOpacity
            disabled={
              !timeHandle
            }
            onPress={() => {
            timeHandle && handleSendOtp()

          }}>

            <View style={{ width: '100%', justifyContent: 'center', paddingHorizontal: 21, marginTop: 28 }}>
              <Text style={{
                color: timeHandle ? 'yellow' : "grey", fontFamily: fonts.MontserratRegular, fontSize: 12, textDecorationLine: 'underline'
              }}>
                I didn't receive the code? Send again
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              width: "100%",
              marginTop: 96,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loader ? (
              <ActivityIndicator size={"large"} color={"#FACD18"} />
            ) : (
                <TouchableOpacity
                  
                  
                onPress={() => {
                  verify();
                }}
                style={{
                  width: 311,
                  height: 40,
                  marginBottom: 20,
                  backgroundColor: "#FACD18",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 45,
                }}
              >
                <Text
                  style={{
                    color: "#000000",
                    fontFamily: fonts.MontserratBold,
                    fontSize: 18,
                  }}
                >
                  Verify
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  OTPInput: {
    // marginBottom: 31,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    color: "white",
  },

  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    marginTop: 20,
    width: 50,
    height: 50,
    // height: 45,
    borderWidth: 0,
    borderWidth: 1,
    borderColor: '#fff',
    color: "#ffef22",
    fontFamily: fonts.MontserratBold,
  },

  underlineStyleHighLighted: {
    borderColor: "#ffef22",
    fontFamily: fonts.MontserratBold,
  },
  mainView: {
    width: "100%",
    // height: "100%",
    flex: 1,
    backgroundColor: "#000000",
  },
});

export default Otp;
