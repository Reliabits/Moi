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
    Image
} from "react-native";
import React, { useState } from "react";
import AppLogo from "../../assets/svg/AppLogo.svg";
import {
    NativeBaseProvider,
    Box,
    Input,
    KeyboardAvoidingView,
    useToast,
} from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import {Icon} from 'native-base'
import fonts from "../../theme/fonts";
import apis from "../../lib/apis";
import PhoneInput from "react-native-phone-number-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import google from '../../assets/images/google.png'

const Signin = (props) => {
    const navigation = useNavigation()
    const [passwordVisible, setPasswordVisible] = useState(true);

   
   

   
        

    return (
        <NativeBaseProvider>
            <KeyboardAvoidingView behaviour="padding" enabled={false}>
                <SafeAreaView style={styles.mainView}>
                    <StatusBar backgroundColor="#000000" />

                    {/* <Pressable onPress={() => navigation.pop()} style={styles.arrowView}>
                        <AntDesign name="arrowleft" size={25} color="white" />
                    </Pressable> */}

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
                            <View>
                               
                                <Text
                                    style={{
                                        color: "#ffef22",
                                        paddingTop: 7,
                                        fontFamily: fonts.MontserratBold,
                                        fontSize: 16,
                                    }}
                                >
                                   Login/Sign Up
                                </Text>
                                <Text
                                    style={{
                                        color: "#ffef22",
                                        paddingTop: 7,
                                        fontFamily: fonts.MontserratRegular,
                                        fontSize: 12,
                                    }}
                                >
                                    Login to get started
                                </Text>
                            </View>

                            {/* <View style={styles.inputview}> */}
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
                                    // onChangeText={(text) => {
                                    //     console.log("onChangeText", text);
                                    //     setPhone(text);
                                    // }}
                                    // onChangeFormattedText={(text) => {
                                    //     console.log("country", text);
                                    //     setcountrycode(text);
                                    // }}
                                /> */}
                                
                            {/* </View> */}

                            <View style={styles.searchSection}>
                                <MaterialCommunityIcons style={styles.searchIcon} name="email-open-outline" size={20} color="#A9A9A9" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Email"
                                   
                                    underlineColorAndroid="transparent"
                                />
                            </View>

                            <View style={styles.searchSection}>
                                <AntDesign style={styles.searchIcon} name="lock" size={20} color="#A9A9A9" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Password"
                                    secureTextEntry={passwordVisible}
                                    underlineColorAndroid="transparent"
                                    // onChangeText={(text) => setPassword(text)}

                                   
                                />

                                <Feather name={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)} size={15} style={styles.icon} />
                            </View>

                            {/* <View style={{ width: '100%', marginTop: 10 }}>
                                <TextInput placeholder="Enter Email" style={{ width: '100%', backgroundColor: 'white', borderRadius: 10, height: 61 }} />
                            </View>
                            <View style={{width:'100%',marginTop:10 }}>
                                <TextInput placeholder="Enter Password" style={{width:'100%',  backgroundColor:'white', borderRadius:10, height:61}} />
                            </View> */}
                            {/* <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'flex-end', marginTop:5 }}>
                                <Text style={{color:'#ffef22', fontSize:10, fontFamily:fonts.MontserratRegular}}>
                                    Forget Password?
                                </Text>

                            </View> */}

                        

                            <View style={styles.buttonView}>
                                <TouchableOpacity
                                    // onPress={() => {
                                    //     createLoginOTP();
                                    // }}
                                    style={styles.button}
                                >
                                    {/* {loader ? (
                                        <View>
                                            <ActivityIndicator color="white" />
                                        </View>
                                    ) : ( */}
                                        <Text
                                            style={{
                                                color: "#000000",
                                                fontSize: 12,
                                                fontFamily: fonts.MontserratBold,
                                            }}
                                        >
                                            Login
                                        </Text>
                                    {/* )} */}
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{fontSize:12, fontFamily:fonts.MontserratBold, color:'white'}}>
                                            Or
                                </Text>

                            </View>

                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop:10 }}>
                                <Text style={{fontSize:10, fontFamily:fonts.MontserratRegular, color:'white', textDecorationLine:'underline'}}>
                                    Continue with 
                                </Text>
                                <Image style={{marginStart:10}} source={google} />

                            </View>

                            <View style={{width:'100%', justifyContent:'center', alignItems:'center', marginTop:67 }}>
                                <Text style={{fontSize:16, fontFamily:fonts.MontserratBold, color:'#ffef22', textDecorationLine:'underline'}}>

                                    Create Account

                                </Text>
                            </View>

                            
                        </View>
                    </View>

                    <View style={styles.bottomText}>
                        <Text
                            style={{
                                color: "white",
                                fontFamily: fonts.MontserratRegular,
                                fontSize: 9.75,
                            }}
                        >
                            By proceeding, you accept the{" "}
                            <Text style={{ fontFamily: fonts.MontserratBold , color:'#ffef22'}}>
                                {" "}
                                terms and conditions
                            </Text>
                        </Text>
                        <Text
                            style={{
                                color: "white",
                                fontFamily: fonts.MontserratRegular,
                                fontSize: 9.75,
                            }}
                        >
                            Read the privacy policy{" "}
                            <Text style={{ fontFamily: fonts.MontserratBold, color:'#ffef22' }}> here.</Text>
                        </Text>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    searchSection: {
        width: '100%',
        height:61,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop:10
    },
    searchIcon: {
        padding: 10,
    },
    icon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },

    
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
        marginTop:51
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
        height: 44,
        width: 268,
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
        // width: 260,
        width:'100%',
        // height: 45,
        padding: 5,
        marginTop: 15,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        // marginStart: 30,
    },
    loginAndSignup: {
        width: '100%',
        paddingHorizontal:37,
        height: "auto",
        // width: 325,
        justifyContent: "center",
        

        // backgroundColor: "#2A2A2A",
        borderRadius: 40,
    },
    loginAndSignupView: {
        width: "100%",
        marginTop:55,
        justifyContent: "center",
        alignItems: "center",
       
    },
    applogoView: {
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop:143
    },

    mainView: {
        width: "100%",
        height: "100%",
        backgroundColor: "#000000",
    },
});

export default Signin;
