import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, ActivityIndicator, } from 'react-native'
import React from 'react'
import fonts from '../../theme/fonts'
import welcomelogo from '../../assets/images1.2/welcomelogo.png'
import { useNavigation } from '@react-navigation/native'
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { HStack, Checkbox, useToast, Box, KeyboardAvoidingView, Modal, FormControl, Button, Input } from 'native-base'
import bottom from '../../assets/images1.2/bottomlogo.png'
import apis from '../../lib/apis'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useRef } from 'react'
import Verifying from '../../assets/images1.2/verifying.gif'
import Gif from '../common/Gif'




const OtpScreen = (props) => {
    const navigation = useNavigation()

    
    const [otp, setotp] = useState("");
    const toast = useToast();
    const [loader, setLoader] = useState(false);
    const [timer, setTimer] = useState(60);
    const [count, setCount] = useState(59)
    const [pinToken, setPinToken] = useState("")
    const [countrycode, setcountrycode] = useState("+91");
    const [timeHandle, setTimeHandle] = useState(false)
    const [time, setTime] = useState(59);
    const [phone, setPhone] = useState("");
    const [showModal, setShowModal] = useState(false);


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



                    // if (res.data.data?.new_user || !res.data.data.user?.name) {
                    //     navigation.navigate("UserName")

                    // }
                    // else {
                        navigation.navigate("DetailUser")
                    // }
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
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
          <View style={{ marginTop: 37, width: "100%", paddingHorizontal: 33, flexDirection: "row", justifyContent: "flex-end", }}>
              <Text style={{fontFamily:fonts.MontserratRegular, color:"#999999", fontSize:16}}>
                  Step 1/2
              </Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', width: "100%", marginTop: 37.44 }}>
              <Image source={welcomelogo} />
          </View>

          <View style={{marginTop:24, width:"100%", paddingHorizontal:55, }}>
              <Text style={{fontFamily:fonts.MontserratRegular, fontSize:32, color:"#000000"}}>
                  An OTP has{ '\n'}
                  been sent to{'\n'}
                  <Text style={{ color: "#BC3E03" }}>{props.route.params?.phone}</Text>  
              </Text>
          </View>

          <View style={{ width: '100%', paddingHorizontal: 34, marginTop: 48, }}>
              <Text style={{
                  fontFamily: fonts.MontserratBold, fontSize: 24, color: "#666666", }}>
                  Enter OTP
              </Text>

              <View
                  style={{
                      width: "100%",
                      height: 58,
                      marginTop: 28
                  }}
              >

                 

                  <OTPInputView
                      pinCount={6}
                      code={otp}
                    //   placeholderCharacter={"-"}
                      onCodeChanged={code => {
                          console.log('code', code);
                          setotp(code);
                      }}
                      autoFocusOnLoad={false}
                      placeholderTextColor="#666666"

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
          </View>

          <View style={{ width: '100%', paddingHorizontal: 34, marginTop: 24 }}>
              <TouchableOpacity
                  disabled={
                      !timeHandle
                  }
                  onPress={() => {
                      timeHandle && handleSendOtp()

                  }}
              >
                  <Text style={{
                      fontFamily: fonts.MontserratBlack, fontSize: 16, color: timeHandle ? '#666666' : '#999999' }}>
                      Resend OTP  <Text style={{ fontFamily: fonts.MontserratMedium, fontSize: 16, color: '#FF580A' }}> {`00:${count > 9 ? count : `0` + count}`}</Text>   
                  </Text>
              </TouchableOpacity>
          </View>
          <View style={{ width: "100%", justifyContent: "center", alignItems: 'center', marginTop: 43 }}>
              <TouchableOpacity
                  onPress={() => setShowModal(true)}
                //   onPress={() => { verify(); verifyOTP() }}
                  style={{ width: 300, justifyContent: "center", alignItems: 'center', backgroundColor: "#C34104", borderRadius: 40, height: 58 }}>
                  {/* {loader ? <ActivityIndicator color={"white"} /> : */}
                      <Text style={{ fontFamily: fonts.MontserratBold, fontSize: 24, color: "#ffffff" }}>
                      LOGIN
                  </Text> 
                  {/* } */}
                 
              </TouchableOpacity>
          </View>

          
              <HStack style={{width:"100%",paddingHorizontal:21, marginTop:20}} space={6}>
              <Checkbox value="danger" colorScheme="danger"  shadow={2} accessibilityLabel="This is a dummy checkbox" defaultIsChecked>
                  <Text style={{fontFamily:fonts.MontserratRegular, fontSize:16, color:"#666666" }}>I would like to recieve notifications via whatsapp.</Text>   
                  </Checkbox>
          </HStack>
          
          <View style={{ width: "100%", justifyContent: "flex-end", flexDirection: 'row', marginTop: 26 }}>
              <Image source={bottom} />
          </View>

          <View>
              <Modal  isOpen={showModal} onClose={() => setShowModal(false)}>
                  <Modal.Content maxWidth="400px">
                      <Modal.CloseButton />
                   
                      <Modal.Body>
                          
                          <View style={{ height:200,width:"100%", justifyContent:'center', alignItems:'center'}}>
                          

                              {/* <ActivityIndicator size="large"  /> */}
                           <Gif />
{/* <Image style={{width:66, height:69.96}} source={Verifying} /> */}
                          <Text style={{fontFamily:fonts.MontserratRegular, fontSize:32, color:'#000000'}}>Verifying</Text>
                          
                          </View>
                      </Modal.Body>
                     
                  </Modal.Content>
              </Modal>
          </View>

          

         
          
          
    </SafeAreaView>
  )
}
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
        width: 58,
        height: 58,
        // borderRadius:5
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        marginTop: 20,
        width: 52,
        height: 52,
        borderRadius:5,
        // height: 45,
        borderWidth: 0,
        borderWidth: 1,
        borderColor: '#666666',
        color: "#666666",
        fontFamily: fonts.MontserratBold,
    },

    underlineStyleHighLighted: {
        borderColor: "#666666",
        fontFamily: fonts.MontserratBold,
    },
})

export default OtpScreen