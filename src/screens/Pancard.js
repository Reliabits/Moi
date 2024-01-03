import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Pressable,
    Keyboard,
  ScrollView,
  ActivityIndicator,
    Alert
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import AntDesign from "react-native-vector-icons/AntDesign";
  
  import OTPInputView from "@twotalltotems/react-native-otp-input";
  import { useNavigation } from "@react-navigation/native";
  import fonts from "../theme/fonts";
  import { Input, NativeBaseProvider } from "native-base";
  import apis from "../lib/apis";
  
  const Pancard = ({ props }) => {
    const navigation = useNavigation();



    const [number, setNumber] = useState("")
    const [loader, setLoader] = useState(false)

    function kycpancard() {
      setLoader(true);
      let params = {
        number: number,

      };
      apis
        .kycPancard(params)
        .then(async (res) => {
          console.log("res",res)

          setLoader(false);
          // setUrl("set url ",res.data.url)
          if (res.status == 200) {


            console.log("error", `${res.data.message}`)
            Alert.alert("", res.data.message)
            return navigation.navigate("Profile")



            // navigation.dispatch(StackActions.replace("HomeScreen"));
          } else {
            console.log("error", res.data.message)
            Alert.alert("", res.data.message)
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

    function kycAdhaar() {
      setLoader(true);
      let params = {
        number: number,

      };
      apis
        .kycAdhaar(params)
        .then(async (res) => {

          setLoader(false);
          // setUrl("set url ",res.data.url)
          if (res.status == 200) {


            console.log("", `${res.status}`)
            Alert.alert(``, res.data.message)




            // navigation.dispatch(StackActions.replace("HomeScreen"));
          } else if (!res.status == 200) {
            console.log("error", `${res.data.error}`)
            Alert.alert("some thing wrong", res.status.error)
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
      <SafeAreaView style={styles.mainView}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            height: 40,
            flexDirection: "row",
            paddingStart: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.pop()}>
            <AntDesign name="arrowleft" size={25} color="grey" />
          </TouchableOpacity>
  
          <Text style={[styles.label, styles.padding]}>
            PAN Card Verification
          </Text>
        </View>
  
        <ScrollView style={{ padding: 20 }}>
          <Text style={styles.label}>Enter PAN number</Text>
  
          <Input
            onChangeText={(val)=> {setNumber(val)}}
            variant="outline"
            placeholder="Enter PAN"
            mt={5}
            p={18}
            fontFamily={fonts.MontserratBold}
            fontSize={18}
           
            color={"white"}
          />

{/* 
<View style={{marginTop:20}}>
          <Text style={styles.label}>Enter Kyc number</Text>
          </View>
        <Input
          variant="outline"
          placeholder="Enter Adhaar"
          mt={5}
          onChangeText={(val)=> {setNumber(val)}}
          p={18}
          fontFamily={fonts.MontserratBold}
          fontSize={18}
          keyboardType={"decimal-pad"}
          color={"white"}
        /> */}

          {/* <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={() =>  {kycAdhaar()}}
            style={styles.button}
          >

            {loader ? (
            <ActivityIndicator color="white" />
            ): (
              <Text
              style = {{
                color: "#000000",
                fontSize: 18,
                fontFamily: fonts.MontserratBold,
              }}
            >
            CONFIRM
          </Text>
            )}
           
          </TouchableOpacity> */}
          {/* </View> */}

  
          <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={() => {
                kycpancard();
                
                // kycAdhaar();
                setLoader(true)
                  
              }}
              style={styles.button}
            >
              {loader ? (
              <ActivityIndicator color="white" />
              
              ): (
                  <Text
                style = {{
                    color: "#000000",
                    fontSize: 18,
                    fontFamily: fonts.MontserratBold,
                  }}
              >
              CONFIRM
            </Text>
              )}
            
            </TouchableOpacity>
          </View>
  
          <View style={styles.orView}>
            <Text
              style={{
                color: "white",
                fontFamily: fonts.MontserratBold,
                fontSiz: 18,
                marginTop: 50,
              }}
            >
              OR
            </Text>
          </View>
  
          <View style={styles.buttonView}>
            <TouchableOpacity
            onPress={() =>  alert('In Progress')}
              style={styles.button}
            >
              <AntDesign name={"camera"} style={{ paddingRight: 20 }} size={30} />
              <Text
                style={{
                  color: "#000000",
                  fontSize: 18,
                  fontFamily: fonts.MontserratBold,
                }}
              >
                Take Photo
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    label: {
      color: "white",
      fontFamily: fonts.MontserratBold,
      fontSize: 18,
    },
    button: {
      flexDirection: "row",
      padding: 15,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FACD18",
      borderRadius: 40,
    },
    orView: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 19,
    },
    padding: {
      paddingStart: 20,
    },
    buttonView: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20%",
    },
    underline: {
      borderBottomWidth: 1,
      borderBottomColor: "grey",
      paddingBottom: 10,
    },
    labelRight: {
      color: "white",
      paddingStart: 20,
      fontFamily: fonts.MontserratRegular,
      fontSize: 15,
      alignSelf: "center",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    mainView: {
      width: "100%",
      height: "100%",
      backgroundColor: "#000000",
    },
  });
  
  export default Pancard;
  