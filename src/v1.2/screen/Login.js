import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import welcomelogo from '../../assets/images1.2/welcomelogo.png'
import fonts from '../../theme/fonts'
import bottom from '../../assets/images1.2/bottomlogo.png'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect, useRef } from 'react'
import {
    NativeBaseProvider,
    Box,
    Input,
    KeyboardAvoidingView,
    useToast,
    Modal,
    Button
} from "native-base";

import apis from '../../lib/apis'


const Login = (props) => {


    const [phone, setPhone] = useState("");
    const [countrycode, setcountrycode] = useState("+91");
    const navigation = useNavigation();
    const [loader, setLoader] = useState(false);
    const toast = useToast();
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

                    navigation.navigate("OtpScreen", {
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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', width: "100%", marginTop: 94.44 }}>
              <Image source={welcomelogo} />
          </View>

          <View style={{ width: "100%", justifyContent: "center", alignItems: 'center' ,marginTop:24 }}>
              <Text style={{fontFamily:fonts.MontserratRegular, color:"#000000", fontSize:32}}>
                  Buy, Sell and Loan
              </Text>
              
          </View>

          <View style={{width:"100%", paddingHorizontal:34, marginTop:101, }}>
              <Text style={{fontFamily:fonts.MontserratBold, fontSize:24, color:'#666666'}}>
                  Login with{'\n'}mobile number
              </Text>

              <TextInput
                  keyboardType={'phone-pad'}
                  onChangeText={(val) => {
                  setPhone(val);
                  console.log("phone number",val)
              }} style={{ width: "100%", marginTop: 20, borderRadius: 5, borderWidth: 1, borderColor: '#666666' }} />
          </View>

          <View style={{width:"100%", justifyContent:"center", alignItems:'center',marginTop:83 }}>
              <TouchableOpacity onPress={() => {
                  createLoginOTP();
                  setLoader(true);
              }} style={{ width: 300, justifyContent: "center", alignItems: 'center', backgroundColor:"#C34104", borderRadius:40, height:58 }}>
                  {
                      loader ? <ActivityIndicator color="white" /> :
                          <Text style={{ fontFamily: fonts.MontserratBold, fontSize: 24, color: "#ffffff" }}>

                              Get OTP
                          </Text>
                }
                 
              </TouchableOpacity>
          </View>
          <View style={{ width: "100%", justifyContent: "flex-end", flexDirection: 'row', marginTop: 66 }}>
              <Image source={bottom} />
          </View>
          
    </SafeAreaView>
  )
}

export default Login