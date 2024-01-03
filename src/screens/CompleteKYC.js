/**
    * @description      : 
    * @author           : sheezy
    * @group            : 
    * @created          : 30/01/2023 - 15:38:56
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 30/01/2023
    * - Author          : sheezy
    * - Modification    : 
**/
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
  Alert,
  TextInput
} from "react-native";
import React, { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useNavigation } from "@react-navigation/native";
import fonts from "../theme/fonts";
import { Input, NativeBaseProvider } from "native-base";
import apis from "../lib/apis";
import DatePicker from 'react-native-date-picker'
import { useEffect } from "react";
import {Radio} from 'native-base'




const CompleteKYC = ({ props }) => {
  const navigation = useNavigation();
  const [value, setValue] = React.useState("Male");


  const [number, setNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(false)
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [dateValue, setDateValue] = React.useState("");
  const [PinNumber, setPinNumber] = useState("")
  const [fullName, setFullName] = useState("")



  function kycpancard() {
    setLoader(true);
    let params = {
      number: PinNumber,
      dob:date,
    };
    apis
      .kycPancard(params)
      .then(async (res) => {
        console.log("res of kyc pancard", res);
        console.log("responce of kyc", res)
        console.log("res data", res.data)
        console.log("res data for mesage", res.data.success)

        setLoader(false);
        // setUrl("set url ",res.data.url)
        if (res.data.success == true) {


          // Alert.alert("", res.data.message)
          
          navigation.navigate("Approved")
          console.log("Approved kyc", res.data.message)


          // navigation.dispatch(StackActions.replace("HomeScreen"));
        }
        else if (res.data.success == false) {
          
          alert(res.data.message)
          console.log("error in kyc", res.data.message)
          //  navigation.navigate("Reject")
        }
      
      })
      .catch((err) => {
        setLoader(false);
        navigation.navigate("Reject")
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
          Alert.alert("some thing wrong",res.status.error)
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
        <View style={{width:'50%', flexDirection:'row', alignItems:'center'}}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <AntDesign name="arrowleft" size={25} color="grey" />
        </TouchableOpacity>

        <Text style={[styles.label, styles.padding]}>
          KYC Verification
          </Text>
          
        </View>
{/* 
        <View style={{ width:'50%', flexDirection: "row", justifyContent: 'flex-end', alignItems: 'center' }}>
          <View style={{width:75, height:28, justifyContent:"center", alignItems:"center", }}>

          </View>

        </View> */}
      </View>

      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontFamily: fonts.MontserratBold, fontSize: 14, color: 'white' }}>Submit Verification Documents</Text>
        

{/* 
        <Input
          variant="outline"
          placeholder="Enter Aadhar"
          mt={5}
          onChangeText={(val)=> {setNumber(val)}}
          p={18}
          fontFamily={fonts.MontserratBold}
          fontSize={18}
          keyboardType={"decimal-pad"}
          color={"white"}
        /> */}

        {/* <View style={styles.buttonView}> */}
          {/* <TouchableOpacity
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



        <View style={{justifyContent:'center', width:'100%', marginVertical:20}} >
        
          <Text style={{ color: '#ffef22', fontFamily: fonts.MontserratBold, fontSize: 14, marginTop:26 }}>1. Personal Information</Text>
          
          {/* <Text style={{ color: 'white', fontFamily: fonts.MontserratBold, fontSize: 12, marginTop: 25 }}>Full Name (As per PAN)</Text>
          


          <TextInput placeholder="Eg ABC" style={{ backgroundColor: 'white', borderRadius: 5, marginTop: 10, height:60 }} onChangeText={(val)=>setFullName(val)} /> */}

          <Text style={{color:'white', fontFamily:fonts.MontserratBold, fontSize:12,marginTop:25}}>
            Permanent Account Number (PAN)
          </Text>

          <TextInput placeholder="Enter Pan Card Number" style={{ backgroundColor: 'white', borderRadius: 5, marginTop: 10, height: 60 }} onChangeText={(val)=>setPinNumber(val)} />


          <Text style={{ color: 'white', fontFamily: fonts.MontserratBold, fontSize: 12, marginTop: 25 }}>Date of Birth</Text>

          <View style={{ backgroundColor: 'white', width: '100%', height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', paddingHorizontal:20, marginTop:10, borderRadius:5 }}>

            <Text style={{color:'black'}}>{dateValue}</Text>
            
            
            <DatePicker
              modal
              open={open}
              mode="date"
              date={date}
              onConfirm={(date) => {
                var currentdate = new Date(date);
                var datetime =
                  +currentdate.getDate() +
                  "/" +
                  (currentdate.getMonth() + 1) +
                  "/" +
                  currentdate.getFullYear();
                setOpen(false)
                setDate(date)
                setDateValue(datetime.toString());
                console.log("setdate: ", date)
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />

            <TouchableOpacity
              onPress={() => setOpen(true)}
              
            >
              <Feather name="calendar" size={30} color="#A9A9A9" />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', width: "100%", justifyContent:'space-between' , marginTop:20}}>
            
            {/* <View style={{width:'30%'}}>

              <Text style={{color:'white', fontSize:12, fontFamily:fonts.MontserratBold}}>Gender</Text>
            </View> */}
            {/* <View style={{width:'65%', marginEnd:20}}> */}
            {/* <Radio.Group style={{
            
                marginStart: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
            }}name="myRadioGroup" accessibilityLabel="favorite number" value={value} onChange={nextValue => {
            setValue(nextValue);
              }}>
              
              <View style={{flexDirection:'row', alignItems:'center', }}>
              
              <Text style={{ color: 'white', fontSize:12, fontFamily:fonts.MontserratBold }}>Male</Text>
                  <Radio style={{ marginStart: 10 }} colorScheme="yellow" value="Male" my={1} />
              
              </View>

              <View style={{flexDirection:'row', alignItems:'center',}}>
              <Text style={{ color: 'white', fontSize:12,  fontFamily:fonts.MontserratBold }}>Female</Text>
                  <Radio style={{ marginStart: 10 }} colorScheme="yellow" value="Female" my={1} />
                
              </View>
           
           
              </Radio.Group> */}
            {/* </View> */}
            
          </View>


          {/* <Text style={{ color: '#ffef22', fontFamily: fonts.MontserratBold, fontSize: 14, marginTop: 26 }}>1. Personal Information</Text>

          <Text style={{ color:'white', fontSize:12, fontFamily:fonts.MontserratBold, marginTop:10}}>
            Upload a clear image of your PAN Card & Write down the details of it.
          </Text>
         
         <View style={{ width: "100%", marginTop:20, paddingHorizontal:64 }}> 
            <View style={{width:'100%', height:163, backgroundColor:'#c7c7c7', justifyContent:'center', alignItems:'center', borderRadius:5}}>
                <Text>Hello</Text>
            </View>

            <Text style={{color:'white',fontFamily:fonts.MontserratBold, fontSize:12,marginTop:12 }}>
              Image is complete
            </Text>

            <Text style={{ color: 'white', fontFamily: fonts.MontserratBold, fontSize: 12, marginTop: 12 }}>
              Clearly Visible 
            </Text>

          </View>  */}

          <View style={{
            width: '100%', justifyContent:'center', alignItems:'center', marginTop:26}}>
            <TouchableOpacity disabled={loader} style={{justifyContent:'center', alignItems:'center', width:158, height:44, borderRadius:45, borderColor:"black", borderWidth:1,backgroundColor: loader ? "#FFFFE0":"#ffef22"}} onPress={()=> {kycpancard()}}>
              <Text style={{ color: 'black', fontFamily: fonts.MontserratBold, fontSize: 12,  }}>
               Verify KYC
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* <View style={{
            width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 26
          }}>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: 158, height: 44, borderRadius: 45, borderColor: "white", borderWidth: 1 }}>
              <Text style={{ color: 'white', fontFamily: fonts.MontserratBold, fontSize: 12, }}>
               Click Photo
              </Text>
            </TouchableOpacity>
          </View> */}


          {/* <TextInput placeholder="Eg ABC" style={{ backgroundColor: 'white', borderRadius: 5, marginTop: 10, }} /> */}



        {/* <Input
          onChangeText={(val) => { setNumber(val) }}
          variant="outline"
          placeholder="Enter PAN"
          mt={5}
          p={18}
          fontFamily={fonts.MontserratBold}
          fontSize={18}

          color={"white"}
        /> */}

        {/* <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={() => {
                kycpancard();
                kycAdhaar();
              setLoader(true)

            }}
            style={styles.button}
          >
            {loader ? (
              <ActivityIndicator color="white" />

            ) : (
              <Text
                style={{
                  color: "#000000",
                  fontSize: 18,
                  fontFamily: fonts.MontserratBold,
                }}
              >
                CONFIRM
              </Text>
            )}

          </TouchableOpacity>
          </View> */}


          


        
          
          </View>  









        {/* <View style={styles.orView}>
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
        </View> */}

        {/* <View style={styles.buttonView}>
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
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  searchIcon: {
    padding: 10,
  },
  label: {
    color: "#ffef22",
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
    marginBottom:100
  },
  backtohome: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    
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

export default CompleteKYC;
