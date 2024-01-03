/**
    * @description      : 
    * @author           : sheezy
    * @group            : 
    * @created          : 02/02/2023 - 16:17:34
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 02/02/2023
    * - Author          : sheezy
    * - Modification    : 
**/
import {
    StyleSheet,
    StatusBar,
    ScrollView,
    View,
    Text,
    SafeAreaView,
    Pressable,
    Image,
    TextInput,
    TouchableOpacity, Linking,
    ActivityIndicator,
    RefreshControl,


} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import SqureRoundIcon from '../../../components/SqureRoundIcon';
import colors from '../../../assets/colors';
import Notification from '../../../assets/svg/Grey_notification.svg';
import NoLoan from '../../../assets/svg/noloan.svg';
import ApplyLoan from '../../../assets/svg/ApplyLoan.svg';
import Calculator from '../../../assets/svg/calculator.svg';
import AppLogo from '../../../assets/svg/AppLogo.svg';
import TopLogo from '../../../assets/images/TopLogo.png'
import inrLogo from '../../../assets/images/inrLogo.png'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AugmontLogoOne from '../../../assets/images/AugmontLogoOne.png'
import AugmontLogoTwo from '../../../assets/images/AugmontLogoTwo.png'
import { NativeBaseProvider, useToast } from 'native-base';

import MOIcolorcoin2 from '../../../assets/images/MOIcolorcoin2.png'
import GroupGold from '../../../assets/images/GroupGold.png'
import GroupSecure from '../../../assets/images/GroupSecure.png'
import apis from '../../../lib/apis';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import moment from 'moment';
import fonts from '../../../theme/fonts';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Octicons from 'react-native-vector-icons/Octicons'
import Augmont from '../../../assets/images/Augmont.png'
import { useDispatch, useSelector } from "react-redux";


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const GoldPage = (props) => {

    // console.log("props", props);
  
    const navigation = useNavigation()

    const [tabName, setTabName] = useState('tab-1');
    const [goldRate, setGoldRate] = React.useState([])
    const [detail, setDetail] = useState([])
    const toast = useToast();
    const [loader, setLoader] = useState(false);
    const [amount, setAmount] = useState("");
    const [grams, setGrams] = useState("");
    const [tab, setTab] = React.useState("");
    const [loading, setLoading] = useState(true)
    const [textInputAmount, setTextInputAmount] = useState("")
    const [less, setLess] = useState();
    const [equal, setEqual] = useState();
    const [refreshing, setRefreshing] = React.useState(false);
    const [checkingKYC, setCheckingKYC] = useState(false);
    // const [uri, setUri] = useState();

    
    // const [diabled , setDisabled] = useState("")
    const dataRedux = useSelector((state) => state);
    // console.log("dataRedux abc profile", dataRedux.PROFILE);
    // console.log("kyc verfication isss ",dataRedux.PROFILE.isKycVerified)

 
    const [url, setUrl] = useState("");

    const checkTextInput = () => {
        if (!textInputAmount.trim()) {
            alert('Please Enter Amount to Buy Gold ');
            return;
        }  
        
    }

    const lessamount = () => {
        
            alert("you can not buy less than 1 Rs")
            setLoader(false)
    }

    useEffect(() => {
        
        if(!dataRedux.PROFILE.isKycVerified && amount>=150000){
            setCheckingKYC(true)
            alert(" Please Complete your KYC to buy more than Rs.1.5 Lakhs of Gold");
        }else{
            setCheckingKYC(false);
        }

    },[amount])
  
    // We need ref in this, because we are dealing
    // with JS setInterval to keep track of it and
    // stop it when needed
    const Ref = useRef(null);

    // The state for our timer
    const [timer, setTimer] = useState("00:00:00");


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


    const clearTimer = (e) => {

        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next    
        setTimer('00:05:00');

        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();

        // This is where you need to adjust if 
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + 300);
        return deadline;
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
    const onClickReset = () => {
        clearTimer(getDeadTime());
    }
    console.log("less amount ", less)
    console.log("equal amount ", equal)

    useEffect(() => {
        goldRates();
        clearTimer(getDeadTime());
       
      
       
        const interval = setInterval(() => {
            goldRates();
            clearTimer(getDeadTime());
        }, 300000);
        return () => clearInterval(interval);


    }, [])


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        goldRates();
        clearTimer(getDeadTime());
        wait(2000).then(() => setRefreshing(false));
    }, []);

    function goldRates() {

        apis
            .goldRates()
            .then(res => {
                console.log("response", (res))

                setGoldRate(res.data.data)
                startTimer()

                if (res.data.message) {
                    console.log("success", res.data.message)
                }
                else {
                    console.log("error", res.data.error)
                }
            }).catch(err => {
                console.log("err", err);
            })
            .finally(() => {
                setLoading(false),
                    onClickReset()
            })


    }

    function buyGold() {
        setLoader(true)
        let params = {
            amount: amount,

        }
        apis
            .buyGold(params)
            .then(async (res) => {

                setLoader(false);
                // setUrl("set url ",res.data.url)
                if (res.status == 200) {
                    setCheckingKYC()
                    // setUri(res.data.url)

                    // setUrl("set url ", res.data.url)
                    console.log("res url", res)
                    console.log("buy gold api response", `${res.status}`)
                    navigation.navigate("PaymentPayu", { url: res.data.url })
                    console.log("url payment payu", res.data.url)
                    // Linking.openURL(res.data.url)

                    // navigation.dispatch(StackActions.replace("HomeScreen"));
                } else {
                    console.log("error", `${res.data.error}`)
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
    const IconRound = () => {
        return (
            <View>
                <Notification />
            </View>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={colors.appBack} />
            <ScrollView
            
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>

                <View style={styles.TopView}>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>

                        <Image source={TopLogo} />

                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <AntDesign name="arrowleft" size={25} color="#FFEF22" />
                        </TouchableOpacity>

                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <Text style={{ color: 'white', fontFamily: fonts.MontserratBold, fontSize: 16, }}>Buy</Text>
                        <Text style={{ color: 'white', fontFamily: fonts.MontserratBold, fontSize: 16, }}>Digital Gold</Text>
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <Text style={{ color: '#FFEF22', fontSize: 12, fontFamily: fonts.MontserratMedium, }}>

                            100% secure |24k | 99.9% pure gold
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>

                        <View>
                            <Text style={{ color: '#EBEBEB', fontFamily: fonts.MontserratMedium, fontSize: 12 }}>Live Gold Price </Text>

                            {loading ? (<View>
                                <ActivityIndicator color="white" />
                            </View>) : (


                                <Text style={{ color: '#FFEF22', fontFamily: fonts.MontserratBold, fontSize: 15 }}>
                                    ₹ {parseFloat(goldRate.gold_rates_buy).toFixed(2)}/gm</Text>
                            )}

                        </View>
                        <View style={{ height: 37, width: '50%', alignItems: 'flex-end', }}>
                            <View style={{ backgroundColor: '#FFEF22', height: 37, width: 140, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <MaterialCommunityIcons color="black" name="timer-outline" size={20} />
                                <Text style={{ color: '#000000', fontFamily: fonts.MontserratMedium, fontSize: 12 }}>Gold price fixed {'\n'} for next
                                    {loading ? (<View>
                                        <ActivityIndicator color="white" />
                                    </View>) : (


                                        <Text style={{ fontSize: 10, fontWeight: '700' }}> {timer}

                                        </Text>
                                    )}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                        <Text style={{ color: 'white', fontSize: 12, fontFamily: fonts.MontserratMedium }}>
                            *price mentioned is inclusive of GST
                        </Text>
                        <TouchableOpacity onPress={() => { navigation.navigate("PaymentBreakDown", { amount: amount , gold: amount / goldRate.gold_rates_buy },) }}>
                            <Text style={{ color: '#FFEF22', textDecorationLine: 'underline', fontFamily: fonts.MontserratBold, fontSize: 12 }}>View BreakUp</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* this second main View*/}
                <View style={styles.secondView}>
                    <Text style={{ color: 'white', fontFamily: fonts.MontserratBold, fontSize: 11 }}>
                        Gold provided By
                    </Text>
                    <Image source={Augmont} style={{ width: 120 , height:20}} />
                </View>
                <View style={styles.amountInputView}>
                    <View>
                        <Text style={{ fontFamily: fonts.MontserratBold, color: '#FFEF22', fontSize: 15 }}>
                            How much Gold do You {'\n'} want to buy
                        </Text>
                    </View>
                    {/* rupees button*/}
                </View>
                {/*rupees into grams converter*/}

                <View style={styles.inputView}>
                    {tabName == "tab-1" &&
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 20, alignItems: 'center' }}>
                            <View>
                                <Text style={{ color: '#FFEF22', fontSize: 12, fontFamily: fonts.MontserratMedium }}>
                                    Buy in Rupee
                                </Text>

                                <View style={{ width: 142, height: 53, justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#2A2A2A', alignItems: 'center', borderRadius: 10, paddingHorizontal: 5, marginTop: 13 }}>

                                    <Text style={{ color: 'white' }}>₹</Text>
                                    <TextInput
                                        value={amount}
                                        keyboardType='numeric'
                                        onChangeText={
                                            (val) => {
                                                setAmount(val);
                                                setTextInputAmount(val)
                                                let result  =  (val / goldRate.gold_rates_buy).toFixed(5)
                                                setGrams(result)
                                                setLess(val);
                                                // setEqual(val)
                                                
                                            }}

                                        placeholderTextColor="#DBDBDB" placeholder='0' style={{ width: '80%', color: 'white' }} />
                                </View>

                            </View>

                            {/* <Image source={chain} style={{marginTop:30}} /> */}
                            <Octicons name="arrow-switch" style={{ marginTop: 30 }} color="#ffef22" size={25} />


                            <View>

                                <Text style={{ color: '#FFEF22', fontSize: 12, fontFamily: fonts.MontserratMedium }}>
                                    Buy in Grams
                                </Text>


                                <View style={{ width: 142, height: 53, justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#2A2A2A', alignItems: 'center', borderRadius: 10, paddingHorizontal: 5, marginTop: 13 }}>


                                    <TextInput
                                value={grams}
                                        onChangeText={(val) => {
                                            
                                    
                                    setGrams(val)
                                            let result = (val * goldRate.gold_rates_buy).toFixed(2)
                                            setEqual(result)
                                    setAmount(result)
                                            setTextInputAmount(val)
                                            setLess(result)
                                }}
                                
                                
                                placeholderTextColor="#DBDBDB"
                                placeholder='0'
                                style={{ width: '80%', color:'white' }} />
                                    {/* <Text style={{ color: 'white' }}>{(amount / goldRate.gold_rates_buy).toFixed(4)}</Text> */}
                                    <Text style={{ color: 'white' }}>gm</Text>
                                </View>
                            </View>



                        </View>



                        
                        
                    }


                    {/*grams into rupees converter */}

                    {
                        tabName == "tab-2" &&

                        <View style={{ width: '91%', height: 100, backgroundColor: '#2A2A2A', borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ width: 150, height: 80, borderWidth: 1, borderColor: 'white', justifyContent: 'space-between', alignItems: 'center', borderRadius: 20, paddingVertical: 10 }} >
                                <Text style={{ color: 'white', fontFamily: fonts.MontserratBold, fontSize: 14 }}>
                                    Buy in Grams
                                </Text>
                                <TextInput
                                        keyboardType='numeric'
                                    onChangeText={(val) => { setGrams(val), setTextInputAmount(val) }} placeholder='Enter in gram' placeholderTextColor="white" style={{ fontFamily: fonts.MontserratBold, fontSize: 14, color: 'white' }} />
                            </View>
                            <Fontisto name="arrow-swap" size={30} color="white" />
                            <View style={{ width: 150, height: 80, borderWidth: 1, borderColor: 'white', justifyContent: 'space-between', alignItems: 'center', borderRadius: 20, paddingVertical: 10 }}>
                                <Text style={{ color: 'white', fontFamily: fonts.MontserratBold, fontSize: 14 }}>
                                    Buy in Rupees
                                </Text>
                                <Text style={{ color: 'white', fontFamily: fonts.MontserratBold, fontSize: 14, paddingTop: 15 }}>
                                    {(grams* goldRate.gold_rates_buy).toFixed(5)}
                                        ₹
                                </Text>
                            </View>
                        </View>
                    }

                </View>

                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <TouchableOpacity
                        disabled={
                            loader || checkingKYC 
                        }
                        onPress={() => {
                            {
                                less < 1 ? (lessamount() ,setLoader(false)) : 
                                
                                

                               ( buyGold(), setLoader(true), checkTextInput())
                                
                            }
                    }} style={{ width: 127, height: 44, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffef22', borderRadius: 20 }}>
                        {loader ? (
                            <View>
                                <ActivityIndicator color="white" />
                            </View>
                        ) : (
                            <Text style={{ color: '#000000', fontFamily: fonts.MontserratBold, fontSize: 18 }}
                            
                            >
                                Buy Gold
                            </Text>
                        )}
                    </TouchableOpacity>
                    {/* {Linking.openURL('https://apitest.payu.in/public/#/d4f1bd88848cd271881d8e0b93ddbd0f37aad3342a32b4b3cceb143bdd9ca927')} */}
                </View>
                <View style={styles.productDetailView}>
                    <Text style={{ color: '#FFEF22', fontFamily: fonts.MontserratBold, fontSize: 15 }}>
                        PRODUCT DETAILS
                    </Text>
                    <Image source={Augmont} style={{ width: 120, height: 20 }} />
                </View>
                <View style={styles.loremView}>
                    <Text style={{ color: 'white', fontFamily: fonts.MontserratRegular, fontSize: 14 }}>
                    MoiGold has partnered with Augmont Goldtech Private Limited - an integrated precious metals management company to provide you with top-quality 24K Pure Gold.
                    </Text>
                </View>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                    <Text style={{ color: '#ffef22', fontFamily: fonts.MontserratBold, fontSize: 12, textDecorationLine: 'underline' }}>View More FAQ's</Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                    <Text style={{ color: '#ffef22', fontFamily: fonts.MontserratBold, fontSize: 15 }}>
                        Trust and Support from
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                    <Image source={Augmont} style={{ width: 150, height: 25 }} />
                </View>
            </ScrollView>
        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
    secondloremView: {
        width: '91%',
        height: 312,
        backgroundColor: '#2A2A2A',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 10,
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    loremView: {
        paddingHorizontal: 20,
        marginTop: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'

    },

    productDetailView: {
        justifyContent: 'space-between',

        height: 60,
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 20

    },
    inputView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', marginTop: 20


    },

    amountInputView: {

        paddingHorizontal: 20,

        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row', marginTop: 20


    },
    secondView: {

        width: '100%', flexDirection: 'row',
        justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 20,


    },
    container: {

        flex: 1,
        backgroundColor: colors.appBack,

    },

    TopView: {


        width: '100%',
        // flexDirection: 'row',
        // justifyContent: 'space-between',

        backgroundColor: '#2A2A2A',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

        paddingTop: 20, paddingBottom: 20,
        paddingHorizontal: 20
    },
    RowOne: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        borderWidth: 1,
        borderBottomColor: '#FFFFFF40',



        width: '100%',

        backgroundColor: '#2A2A2A',
        paddingTop: 10
    },
})


export default (props) => {
    return (
        <NativeBaseProvider>
            <GoldPage props={props} />
        </NativeBaseProvider>
    )
}