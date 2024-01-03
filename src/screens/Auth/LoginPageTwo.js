import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  ScrollView, 
} from "react-native";
import React, { useEffect, useState } from "react";
import AppLogo from "../../assets/svg/AppLogo.svg";
import { NativeBaseProvider, Box, useToast, Input, Modal, Button } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import fonts from "../../theme/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apis from "../../lib/apis";
import { termAndcondi} from "../../assets/TermandCondition";
import { policyandprivacy } from "../../assets/PrivacyPolicy";

const LoginPageTwo = (props) => {
  const navigation = useNavigation();
  const [countrycode, setcountrycode] = useState("");
  const [phone, setPhone] = useState("Mobile Number");
  const [loader, setLoader] = useState(false);
  const toast = useToast();
  const [dropdown, setDropdown] = useState("")
  const [isOpenModal, setisOpenModal] = useState(false)
  const [privacyModal, setPrivacyModal] = useState(false)

  const onModalshow=()=>{
    setisOpenModal(true)
    console.log("clicked modal show function ")
  }
  

  useEffect(async () => {
    AsyncStorage.getItem("phone").then((val) => {
      if (val != null) {
        setPhone(val);
        AsyncStorage.getItem("cc").then((val) => {
          if (val != null) {
            setcountrycode(val);
          }
        });
      }
    });
  }, []);

  async function createLoginOTP() {
    let params = {
      phone: phone,
      country_code: countrycode.replace(phone, " ").trim(),
    };
    setLoader(true);
    apis
      .createLoginOTP(params)
      .then(async (res) => {
        setLoader(false);
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

          // alert('OTP sent! Please enter code')
          navigation.navigate("Otp", {
            phone: phone,
            cc: countrycode,
            otp: '',
          });
        } else {
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

          // alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log("err", err);
        setLoader(false);
      })
      .finally(() => {
        setLoader(false);
      });
  }

  return (
    <View style={styles.mainView}>
      <StatusBar backgroundColor="#000000" />

      <View style={styles.applogoView}>
        <AppLogo height={52} width={105} />
        <Text
          style={{
            color: "white",
            fontFamily: fonts.MontserratBold,
            marginTop: 20,
          }}
        >
          Buy.Sell.Loan
        </Text>
      </View>

      {/* login and signup view*/}
      <View style={styles.loginAndSignupView}>
        <ScrollView>
        <View style={styles.loginAndSignup}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                color: "white",
                fontFamily: fonts.MontserratBold,
                fontSize: 20,
              }}
            >
              Login
            </Text>
            <Text
              style={{
                color: "white",
                paddingTop: 19,
                fontFamily: fonts.MontserratLight,
                fontSize: 10,
              }}
            >
              You have already an account with us
            </Text>
          </View>

          <View style={styles.buttonView}>
            {loader ? (
              <ActivityIndicator color={"#FACD18"} />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (phone == "Mobile Number") {
                    navigation.navigate("LoginPageOne", { login: true });
                  } else {
                    console.log("click :")
                    createLoginOTP();
                  }
                  // navigation.navigate("Otp")
                }}
                style={styles.button}
              >
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 12,
                    fontFamily: fonts.MontserratBold,
                  }}
                >
                  Continue with{" "}
                  {countrycode.replace(phone, " ").trim() + " " + phone}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.orView}>
            <Text
              style={{
                color: "white",
                fontFamily: fonts.MontserratBold,
                fontSiz: 13,
              }}
            >
              Or
            </Text>
          </View>

          <View style={styles.continueView}>
            <Text
              style={{
                color: "white",
                fontSize: 10,
                fontFamily: fonts.MontserratLight,
              }}
            >
              login/ signup with different number
            </Text>
          </View>

          <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("LoginPageOne", { login: false })
              }
              style={styles.button}
            >
              <Text
                style={{
                  color: "#000000",
                  fontSize: 12,
                  fontFamily: fonts.MontserratBold,
                }}
              >
                New Number login
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomText}>
            <Text
              style={{
                color: "white",
                fontFamily: fonts.MontserratLight,
                fontSize: 10,
              }}
            >
              By proceeding, you accept the{" "}
              
                <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={() => 
            
              onModalshow()
            }>
              <Text style={{ color:'white', fontFamily: fonts.MontserratBold, fontSize:12 }}>
                {" "}
                Terms and conditions
              </Text>
                  </TouchableOpacity>
              
            </Text>
              <TouchableOpacity onPress={() =>

               setPrivacyModal(true)
              }>

              <Text style={{color:'white', fontFamily: fonts.MontserratBold, fontSize: 12 }}>
               Privacy Policy
                
             
              </Text>

            </TouchableOpacity>

           

           
          </View>
          </View>
          </ScrollView>

        
          
      <Modal isOpen={privacyModal} onClose={() => setPrivacyModal(false)}   size="xl">
        <Modal.Content maxH="600" style={{backgroundColor:"#2a2a2a"}} >
         <View style={{backgroundColor:"white",flexDirection:"row",justifyContent:"center"}}>
          <Text style={{fontSize:20,paddingLeft:10,fontWeight:"bold",color:'black'}}>
          Privacy Policy
          </Text>
         </View>
          <Modal.Body>
            <ScrollView>
          {policyandprivacy?.map(elm=>{
            return (
              <View style={{paddingVertical:2}}>
          {elm.headingParagraph  && <Text style={{ fontFamily: fonts.MontserratBold,color:"white" }}>
                  {elm.headingParagraph}
                </Text>}
                <Text style={{color:"white",fontSize:12,fontFamily:fonts.MontserratMedium}}>
                  {elm.paragraph}
                </Text>
              </View>
            )
          })}
            </ScrollView>
          </Modal.Body>
          <View style={{backgroundColor:"white",flexDirection:"row",justifyContent:"center",alignItems:"center",height:40}}>
          
          <TouchableOpacity style={{backgroundColor:"black",flexDirection:"row",justifyContent:"center",alignItems:"center",height:30,width:60,borderRadius:10}}
          onPress={() => {
            console.log("close btn ")
            setPrivacyModal(false)
          }}
          >
          <Text style={{color:"white",fontWeight:"bold"}}>
          Close
          </Text>
          </TouchableOpacity>
              </View>
            
        </Modal.Content>
      </Modal>
            
            {/* privacy policy  */}

      <Modal isOpen={isOpenModal} onClose={() => setisOpenModal(false)}   size="xl">
        <Modal.Content maxH="600" style={{backgroundColor:"#2a2a2a"}} >
          <View style={{backgroundColor:"white",flexDirection:"row",justifyContent:"center"}}>
          <Text style={{fontSize:20,paddingLeft:10,fontWeight:"bold",color:'black'}}>
          Term and Condition
          </Text>
         </View>
          
          <Modal.Body>
            <ScrollView>
          {termAndcondi?.map(elm=>{
            return (
              <View style={{paddingVertical:2}}>
          {elm.headingParagraph  && <Text style={{ fontFamily: fonts.MontserratBold,color:"white" }}>
                  {elm.headingParagraph}
                </Text>}
                <Text style={{color:"white",fontSize:12,fontFamily:fonts.MontserratMedium}}>
                  {elm.paragraph}
                </Text>
              </View>
            )
          })}
            </ScrollView>
          </Modal.Body>
          <View style={{backgroundColor:"white",flexDirection:"row",justifyContent:"center",alignItems:"center",height:40}}>
          <TouchableOpacity style={{backgroundColor:"black",flexDirection:"row",justifyContent:"center",alignItems:"center",height:30,width:60,borderRadius:10}}
          onPress={() => {
            console.log("close btn ")
            setisOpenModal(false)
          }}
          >
          <Text style={{color:"white",fontWeight:"bold"}}>
          Close
          </Text>
          </TouchableOpacity>
          </View>
        </Modal.Content>
      </Modal>
      </View>
    </View>
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
    marginTop: 63,
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
    marginTop: 27,
  },
  button: {
    height: 34.58,
    width: 251,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FACD18",
    borderRadius: 40,
  },
  buttonView: {
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  inputview: {
    width: 251,
    height: 40,
    marginTop: 15,
    backgroundColor: "white",
    borderRadius: 40,
    alignItems: "center",
    // marginStart: 30,
    justifyContent: "center",
  },
  loginAndSignup: {
    height: 425,
    width: "100%",
    marginBottom:20,
    // justifyContent: 'center',
    paddingTop: 30,
   
    alignItems: "center",

    backgroundColor: "#2A2A2A",
    borderRadius: 40,
  },
  loginAndSignupView: {
    width: "100%",
    flex: 1,
   
    justifyContent: "center",

    
    // alignItems: 'center',
  },
  applogoView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  mainView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
  },
});

export default () => {
  return (
    <NativeBaseProvider>
      <LoginPageTwo />
    </NativeBaseProvider>
  );
};
