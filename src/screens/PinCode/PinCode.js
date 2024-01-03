import Icon from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import React, { useEffect, useRef, useState } from "react"
import { ImageBackground, SafeAreaView, StatusBar, Text, Image, View, Alert } from "react-native"


import TopLogo from '../../assets/images/TopLogo.png'
import fonts from "../../theme/fonts"
import apis from "../../lib/apis"
import ReactNativePinView from 'react-native-pin-view'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"

const PinCode = () => {
    const navigation = useNavigation()

    const pinView = useRef(null)
    const [showRemoveButton, setShowRemoveButton] = useState(false)
    const [enteredPin, setEnteredPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [showCompletedButton, setShowCompletedButton] = useState(false)
    useEffect(() => {
        if (enteredPin.length > 0) {
            setShowRemoveButton(true)
        } else {
            setShowRemoveButton(false)
        }
        if (enteredPin.length === 4) {
            setShowCompletedButton(true)
        } else {
            setShowCompletedButton(false)
        }
        getPinTokenSaved()
    }, [enteredPin])

    const getPinTokenSaved = async() => {
        const token = await AsyncStorage.getItem("pin")
        console.log("token : pin", token)
}




    function setPin() {
        // setLoader(true);
        let params = {
            pin: enteredPin,
            confirm_pin: confirmPin

        };
        apis
            .setPin(params)
            .then(async (res) => {

                // setLoader(false);
                // setUrl("set url ",res.data.url)
                if (res.data.success === true) {

                

                    // setUrl("set url ", res.data.url)
                    console.log("res", res)
                    console.log(" response status", `${res.data.message}`)
                    Alert.alert('', res.data.message)
                    await AsyncStorage.setItem("pin", res.data.message)
                    navigation.navigate("VerifyPinCode")
                   
                    
                    // navigation.navigate("VerifyPinCode")
                    
                    // navigation.dispatch(StackActions.replace("HomeScreen"));
                } else {
                    console.log("error", `${res.data.error}`)
                    Alert.alert('', res.data.message)
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
                // setLoader(false);
                console.log("err", err);
            });
    }




    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView
                style={{ flex: 1, backgroundColor: "black", alignItems: "center" }}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginVertical: 20, paddingHorizontal: 34 }}>
                    <AntDesign name="arrowleft" color="white" size={20} />
                    <Text style={{ color: 'white', paddingStart: 20, fontSize: 15, fontFamily: fonts.MontserratBold }}>
                        Set Security PIN
                    </Text>

                </View>
                <View style={{ justifyContent: "center", alignItems: 'center', width: '100%', paddingHorizontal: 34, marginTop: 67 }}>
                    <Image source={TopLogo} />
                    <Text
                        style={{
                            paddingTop: 24,
                            paddingBottom: 48,
                            color: "white",
                            fontSize: 16,
                        }}>
                        Enter the Pin Code
                    </Text>

                    <ReactNativePinView
                        inputSize={32}
                        ref={pinView}
                        pinLength={4}
                        buttonSize={60}
                        onValueChange={value => {

                            console.log("entered pin 0 ", enteredPin);
                            console.log("confirm pin 0", confirmPin);

                            if (value.length > 3 && enteredPin == "") {
                                setEnteredPin(value);
                                pinView.current.clearAll();
                            }
                            if (value.length > 3 && confirmPin == "" && enteredPin.length > 3) {
                                setConfirmPin(value);
                                console.log("Entering second condition", enteredPin);
                                console.log("second pin ", confirmPin);
                                console.log("value or confrimpin ", value);
                                if (enteredPin == value) {
                                    console.log("entered pin ", enteredPin);
                                    console.log("confirm pin ", confirmPin);
                                    alert("successfull")
                                }
                                else {
                                    alert("wrong password")
                                }
                            }
                        }}
                        buttonAreaStyle={{
                            marginTop: 24,
                        }}
                        inputAreaStyle={{
                            marginBottom: 24,
                        }}
                        inputViewEmptyStyle={{
                            backgroundColor: "transparent",
                            borderWidth: 1,
                            borderColor: "#FFF",
                        }}
                        inputViewFilledStyle={{
                            backgroundColor: "#FFF",
                        }}
                        buttonViewStyle={{
                            borderWidth: 1,
                            borderColor: "#FFF",
                        }}
                        buttonTextStyle={{
                            color: "#FFF",
                        }}
                        onButtonPress={key => {
                            if (key === "custom_left") {
                                pinView.current.clear()
                            }
                            if (key === "custom_right") {
                                console.log("enter pin code is", enteredPin)
                                // alert("Entered Pin: " + enteredPin)
                            }

                        }}
                        customLeftButton={showRemoveButton ? <Icon name={"ios-backspace"} size={36} color={"#FFF"} /> : undefined}
                        customRightButton={showCompletedButton ?
                            <Text onPress={() => { setPin() }} style={{ color: 'white', fontSize: 20 }}>OK</Text>
                            : undefined}
                    />

                </View>
            </SafeAreaView>
        </>
    )
}
export default PinCode