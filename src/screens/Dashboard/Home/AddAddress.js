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
import React, { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";

import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useNavigation } from "@react-navigation/native";

import fonts from '../../../theme/fonts'
import { Input, NativeBaseProvider, Select, Center, Box, CheckIcon, Button, useToast, } from "native-base";
import apis from "../../../lib/apis";


const AddAddress = (props) => {
    const toast = useToast();
    const navigation = useNavigation();
    const [selectedColor, setSelectedColor] = useState("")
    const [service, setService] = React.useState("");
    const [address, setAddress] = useState("");
    const [pin_code, setPinCode] = useState("")
    // const [state, setState] = useState("");
    // const [type, setType] = useState("");
    const [loader, setLoader] = useState(false)
   const [data, setData] =useState([])


    useEffect(() => {
        getState()
        
    }, [])
    


    const getState =  (val) => {
        
        fetch(`http://www.postalpincode.in/api/pincode/${val}`
        ).then( async(response) => {
            console.log("response",response);
            response.json().then( async(res) => {
                console.log("data 1 :", res);
                console.log("pincode length :", val.length)
            //     console.log("suucess status", data.Status ==="Success")
            //  console.log("error status", data.data.Status ==="Error")
            //     return
                if (res.Status === "Success" && val.length > 5) {
                    console.log("sucess status", res.Status);
                    setData(res.PostOffice[0])
                    console.log("data 2 :", res);
                   
                    
                    
                    // Alert.alert("", data.Status)
                    // toast.show({
                    //     render: () => {
                    //         return (
                    //             <Box
                    //                 bg="green.500"
                    //                 color={"white"}
                    //                 px="3"
                    //                 py="3"
                    //                 rounded="xl"
                    //                 mb={5}
                    //             >
                    //                 {res.Status}
                    //             </Box>
                    //         );
                    //     },
                    // });
                   
                }
               else if (res.Status === "Error" && val.length > 5 ) {
                    console.log("error status", res.Status === 'Error')
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
                                    {res.Message}
                                </Box>
                            );
                        },
                    });
                //   return  Alert.alert("", data.Message)
                }
            })
            // response.json().catch((e) => {

                   
            //             Alert.alert("", error)
            //             console.log("errorrr",e)
                
                    
            //     })


            
            
        })
        // .catch((e) => {


        //         Alert.alert("", error)
        //         console.log("errorrr", e)


        //     })
           

    }
    

    function addAddress() {
        setLoader(true);
        let params = {
            address: address,
            pin_code: pin_code,
            state: data.State,
            type: selectedColor

        };
        apis
            .addAddress(params)
            .then(async (res) => {

                setLoader(false);
                if (res.status == 200) {
                    // console.log("address", res)
                    // console.log("address status", `${res.data.message}`)
                    Alert.alert("", res.data.message)
                    { navigation.navigate("Address", {pincode: pin_code}) }
                    
                } else {
                    console.log("error", `${res.data.message}`)
                    Alert.alert("", res.data.message)
                  navigation.navigate("Address")

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
                    
                   height:100,
                    
                    paddingStart: 20,
                    marginTop: 20,
                    justifyContent:'space-between'
                    
                }}
            >
                <TouchableOpacity onPress={() => navigation.navigate("Address")}>
                    <AntDesign name="left" size={25} color="white" />
                </TouchableOpacity>

                <Text style={[styles.label1]}>
                    Add Address
                </Text>
            </View>

            <ScrollView style={{ padding: 20 }}>
               

                <Text style={styles.label}>Address</Text>

                <Input
                    variant="outline"
                    placeholder="Address"
                    mt={5}
                    
                    p={18}
                    fontFamily={fonts.MontserratBold}
                    fontSize={14}
                    onChangeText={(val)=> {setAddress(val)}}
                 
                    color={"white"}
                />

                <Text style={styles.label}>Pin Code</Text>

                <Input
                    variant="outline"
                    placeholder="Ex. 056081"
                    mt={5}
                    onChangeText={(val) => {
                        setPinCode(val);
                        getState(val);
                    }}
                   
                    p={18}
                    fontFamily={fonts.MontserratBold}
                    fontSize={14}
                    keyboardType={"decimal-pad"}
                    color={"white"}
                    maxLength={6}
                />

                {/* <Button style={{ height: 60, width: 200 }}
                title="Press button"    onPress={() => { getState() }} /> */}

                <Text style={styles.label}>State</Text>


                {/* <Input
                    variant="outline"
                    placeholder="Ex. 056081"
                    mt={5}
                    onChangeText={(val) => { setService(val); }}
                    // value={JSON.stringify(service)}
                    p={18}
                    fontFamily={fonts.MontserratBold}
                    fontSize={14}
                    // keyboardType={"decimal-pad"}
                    color={"white"}
                /> */}

                <View style={{ width: '100%', paddingHorizontal: 20, justifyContent: 'center', height: 80, backgroundColor:'#2A2A2A', marginTop:10, borderRadius:10}}>
                    <Text style={{color:'white', fontSize:16, fontFamily:fonts.MontserratBold, }}>
                        {data.State}
                    </Text>
                </View>


                <Text style={styles.label}>City</Text>
                <View style={{ width: '100%', paddingHorizontal: 20, justifyContent: 'center', height: 80, backgroundColor: '#2A2A2A', marginTop: 10, borderRadius: 10 }}>
                    <Text style={{ color: 'white', fontSize: 16, fontFamily: fonts.MontserratBold, }}>
                        {data.District}
                    </Text>
                </View>
                {/* <Center>
                    <Box w="100%" >
                        <Select
                           
                            p={18}
                            color={"white"}
                            selectedValue={service} accessibilityLabel="Choose Service" placeholder="State" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mt={5} onValueChange={itemValue => setService(data.State)}>
                            <Select.Item label="Delhi" value="Delhi" />
                            <Select.Item label="Mumbai" value="Mumbai" />
                            <Select.Item label="South india" value="south india" />
                            <Select.Item label="Gujarat" value="Gujarat" />
                            <Select.Item label="Punjab" value="Punjab" />
                        </Select>
                    </Box>
                </Center> */}

              


                <View style={{ justifyContent: 'center', width: '100%' }} >

                    <Text style={styles.label}>Save this is address as</Text>

                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>

                    <View>
                        <TouchableOpacity onPress={() => {
                            if (selectedColor == "Home") {
                                // setSelectedColor("one");
                                setSelectedColor("")
                            } else {
                                setSelectedColor("Home");
                            }
                        }} style={{ width: 100, height: 45, backgroundColor: selectedColor == "Home" ? "yellow" : '#2A2A2A', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>

                            <Text style={{ color: selectedColor == "Home" ? "black" : 'white' }}>
                              Home
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => {
                            if (selectedColor == "office") {
                                // setSelectedColor("one");
                                setSelectedColor("")
                            } else {
                                setSelectedColor("office");
                            }
                        }} style={{ width: 100, height: 45, backgroundColor: selectedColor == "office" ? "yellow" : '#2A2A2A', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                            <Text style={{ color: selectedColor == "office" ? "black" : 'white' }}>
                               Office
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => {
                            if (selectedColor == "other") {
                                // setSelectedColor("one");
                                setSelectedColor("")
                            } else {
                                setSelectedColor("other");
                            }
                        }} style={{ width: 100, height:45, backgroundColor: selectedColor == "other" ? "yellow" : '#2A2A2A', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                            <Text style={{ color: selectedColor == "other" ? "black" : 'white' }}>
                                others
                            </Text>
                        </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            onPress={() => {
                                addAddress();
                                setLoader(true)
                                // kycpancard();
                                // kycAdhaar();
                                // setLoader(true)

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
                                    Add Address
                                </Text>
                             )} 

                        </TouchableOpacity>
                    </View>


                    {/* <View style={styles.backtohome}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Profile")

              }}
              style={styles.button}
            >
              
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 18,
                    fontFamily: fonts.MontserratBold,
                  }}
                >
                  Back To Home
                </Text>
             

            </TouchableOpacity>
          </View> */}

                </View>









               
                
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    label: {
        color: "white",
        fontFamily: fonts.MontserratRegular,
        fontSize: 14,
        marginTop:10
    },
    label1: {
        color: "white",
        fontFamily: fonts.MontserratBold,
        fontSize: 18,
        marginTop: 10
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
        marginBottom: 100
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

export default AddAddress;
