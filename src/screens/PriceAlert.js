import { View, Text, StyleSheet, Image, TouchableOpacity, Button, Pressable, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import fonts from '../theme/fonts'
import { Radio, Select, Center, Box, CheckIcon, Checkbox, Switch, VStack, Modal, FormControl, Input } from 'native-base'
import exclimation from '../assets/images/exclimation.png'
import apis from '../lib/apis'
import indiaflag from '../assets/images/indiaflag.png'

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { useNavigation } from '@react-navigation/native'

const PriceAlert = () => {
    const navigation = useNavigation()
    const [service, setService] = React.useState("");
    const [value, setValue] = React.useState("");
    const [groupValues, setGroupValues] = React.useState([]);
    const [opened, setOpened] = useState(false);
    const [switching, setSwitching] = useState(false);
    const [receiveType, setReceiveType] = useState([])
    const [ab, setAb] = useState([])
    const [price, setPrice] = useState([])
    const [loader, setLoader] = useState(false)
    const [goldrate, setGoldRate] = useState([])
    



    console.log("price", price)
    console.log("carts", groupValues)
    console.log("recive", receiveType)

    const [placements, setPlacements] = useState(undefined);


    const openedModal = placements => {
        setOpened(true);
        setPlacements(placements);
    };


    useEffect(() => {
        goldRates()
    },[])

    const changeRadioFunctionPush = (val) => {
        console.log("value changed", val);
        if (val) {
            let arr = ab;
            console.log("arr 0", arr);
            arr.push("push_notification");
            console.log("arr ", arr);
            setAb(arr);
        } else {
            let arr = ab.filter(item => item !== "push_notification");
            setAb(arr);
            console.log(" remve", arr)
        }
    }

    const changeRadioFunctionSms = (val) => {
        if (val) {
            let arr = ab;
            console.log("arr 0", arr);
            arr.push("sms");
            console.log("arr ", arr);
            setAb(arr);
        } else {
            let arr = ab.filter(item => item !== "sms");
            setAb(arr);
            console.log(" remve", arr)

        }
    }

    const changeRadioFunctionEmail = (val) => {
        console.log("value changed", val);
        if (val) {
            let arr = ab;
            console.log("arr 0", arr);
            arr.push("email");
            console.log("arr ", arr);
            setAb(arr);
        } else {
            let arr = ab.filter(item => item !== "email");
            setAb(arr);
            console.log(" remve", arr)

        }
    }
    const changeRadioFunctionWhatsapp = (val) => {
        if (val) {
            let arr = ab;
            console.log("arr 0", arr);
            arr.push("whatsapp");
            console.log("arr ", arr);
            
            setAb(arr);
        } else {
            let arr = ab.filter(item => item !== "whatsapp");
            console.log("arr removed : ", arr);
            setAb(arr);
            console.log(" remve", arr)

        }
    }


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

    function Alert() {
        // setLoader(true);
        let params = {
            recieving_type: ab,
            condition: value,
            value: parseInt(goldrate.gold_rates_buy),
            caret_size: parseInt(groupValues)
        };
        apis
            .Alert(params)
            .then(async (res) => {
                console.log("res: ", res)

                // setLoader(false);
                // setUrl("set url ",res.data.url)
                if (res.status === 200) {

                    // setUrl("set url ", res.data.url)
                    console.log("res in", res)
                   
                    console.log("Alert api response", `${res.status}`)
                    console.log("message ", res.data.message)
                    alert(res.data.message)

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

                    // Linking.openURL(res.data.url)

                    // navigation.dispatch(StackActions.replace("HomeScreen"));
                } else {
                    console.log("error", `${res.data.error}`)
                    console.log("message ", res.data.message)
                    alert(res.data.message)
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
        <View style={styles.mainView}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=> {navigation.goBack()}}>

                   

                        <AntDesign name="arrowleft" color="white" size={20} />
                    </TouchableOpacity>

                    <Text style={styles.mainText}>
                        Create Price Alert
                    </Text>
                </View>

                <View style={styles.CustomView}>
                    <View style={styles.CustomInnerView}>
                        <Text style={{ color: 'white', fontFamily: fonts.MontserratRegular, fontSize: 10 }}>
                            How much would you like to <Text style={{ fontFamily: fonts.MontserratSemiBold, }}>make price alert for?</Text>
                        </Text>

                        <View style={{ width: "100%", justifyContent: 'space-between', marginTop: 10, height: 150 }}>
                            <Radio.Group style={{ width: '100%', justifyContent: "space-between", height: 150 }} name="myRadioGroup" accessibilityLabel="favorite number" value={value} onChange={nextValue => {
                                setValue(nextValue);
                            }}>
                                <Radio colorScheme={"yellow"} value="lower" my={1}>
                                    <Text style={{ color: "white" }}> Custom price (or lower)</Text>
                                </Radio>

                                
                                <View style={{width:'100%', paddingHorizontal:20, flexDirection:'row', alignItems:"center", justifyContent:"space-between", borderRadius:5, borderColor:"yellow",borderWidth:1, height:60, marginTop:15 }}>
                                    <Text style={{ color: "white" }}>{goldrate.gold_rates_buy}</Text>
                                    

                                    <View style={{flexDirection:'row', justifyContent:"space-between",alignItems:'center', width:"18%"}}>
                                        <Image source={indiaflag} />

                                        <Text style={{color:"white"}}>IND</Text>
                                    </View>
                                </View>

                                {/* <TextInput
                                    style={styles.input}
                                    placeholder="Enter Price"
                                    onChangeText={(val) => {
                                        setPrice(val)
                                    }}
                                    underlineColorAndroid="transparent"
                                /> */}


                                {/* <Center style={{width:"100%", marginTop:20, }}>
                                <Box style={{width:'100%', }}>
                                    <Select selectedValue={service} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service"
                                        placeholderTextColor="white"
                                        style={{color:'white',}}
                                        _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />
                                    }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                                        <Select.Item  label="UX Research" value="ux" />
                                        <Select.Item label="Web Development" value="web" />
                                        <Select.Item label="Cross Platform Development" value="cross" />
                                        <Select.Item label="UI Designing" value="ui" />
                                        <Select.Item label="Backend Development" value="backend" />
                                    </Select>
                                </Box>
                            </Center> */}



                                <Radio colorScheme={"yellow"} value="higher" my={5}>
                                    <Text style={{ color: "white" }}>Custom price (or higher)</Text>
                                </Radio>
                            </Radio.Group>
                        </View>

                    </View>


                </View>


                {/* <View style={{width:"100%", justifyContent:"center", alignItems:'center'}}>
                    <Text>Bezier Line Chart</Text>
                    <LineChart
                        data={{
                            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul",  "Aug","Sep","Oct", "Nov", "Dec" ],
                            datasets: [
                                {
                                    data: [

                                        100,
                                        90,
                                        80,
                                        70,
                                        60,
                                        50,
                                        40,
                                        30,
                                        20,
                                        20,
                                        10

                                        // Math.random() * 100,
                                        // Math.random() * 100,
                                        // Math.random() * 100,
                                        // Math.random() * 100,
                                        // Math.random() * 100,
                                        // Math.random() * 100
                                    ]
                                }
                            ]
                        }}
                   width={373} // from react-native
                        height={220}
                        yAxisLabel="$"
                        yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </View> */}

                <View style={styles.CustomView}>
                    <View style={styles.CustomInnerView}>
                        <Text style={{ color: 'white', fontFamily: fonts.MontserratRegular, fontSize: 10 }}>
                            For <Text style={{ fontFamily: fonts.MontserratSemiBold }}> how many carats</Text> alert you need?
                        </Text>


                        <Checkbox.Group onChange={setGroupValues} value={groupValues} accessibilityLabel="choose numbers">
                            <Checkbox colorScheme={"yellow"} value="22" my={2}>
                                <Text style={{ color: 'white' }}>22k carats</Text>
                            </Checkbox>
                            <Checkbox colorScheme={"yellow"} value="24"><Text style={{ color: 'white' }}>24k carats</Text></Checkbox>
                            <Checkbox colorScheme={"yellow"} value="others" my={2}><Text style={{ color: "white" }}>others</Text></Checkbox>
                        </Checkbox.Group>
                    </View>



                </View>


                <View style={styles.CustomView}>
                    <View style={styles.CustomInnerView}>
                        <Text style={{ color: 'white', fontFamily: fonts.MontserratRegular, fontSize: 10 }}>
                            How would you like <Text style={{ fontFamily: fonts.MontserratSemiBold }}> to be notified?</Text>
                        </Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>



                            <VStack space={4} alignItems="center" >

                                {/* <Switch
                                    onValueChange={(val) => changeRadioFunctionSms(val)}
                                    // onValueChange={setSwitching("sms")}

                                    // value={switching}
                                    offTrackColor="yellow.200" onTrackColor="yellow.500" onThumbColor="yellow.600" offThumbColor="yellow.50" />
                                <Switch
                                    onValueChange={(val) => changeRadioFunctionEmail(val)}
                                    // onValueChange={setSwitching("email")}
                                    // value={switching}

                                    offTrackColor="yellow.200" onTrackColor="yellow.500" onThumbColor="yellow.600" offThumbColor="yellow.50" />
                                <Switch
                                    onValueChange={(val) => changeRadioFunctionWhatsapp(val)}
                                    // onValueChange={setSwitching}
                                    // value={switching}

                                    offTrackColor="yellow.200" onTrackColor="yellow.500" onThumbColor="yellow.600" offThumbColor="yellow.50" /> */}

                                <Switch
                                    onValueChange={(val) => changeRadioFunctionPush(val)}


                                    offTrackColor="yellow.200" onTrackColor="yellow.500" onThumbColor="yellow.600" offThumbColor="yellow.50" />

                            </VStack>

                            <VStack space={6} >
                                {/* <Text style={{ color: 'white' }}>SMS Message</Text>
                                <Text style={{ color: 'white' }}>E-mail notification</Text>
                                <Text style={{ color: "white" }}>WhatsApp messages</Text> */}

                                <Text style={{ color: "white" }}>Push Notification</Text>
                            </VStack>




                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '100%', paddingHorizontal: 21, alignItems: "center", marginTop: 20 }}>
                    <TouchableOpacity style={{ width: 122, height: 44, borderRadius: 45, borderWidth: 1, borderColor: 'white', justifyContent: "center", alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontFamily: fonts.MontserratBold, fontSize: 14 }}>
                            Cancel
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => openedModal("center")} style={{ width: 122, height: 44, borderRadius: 45, borderWidth: 1, borderColor: 'white', justifyContent: "center", alignItems: 'center', backgroundColor: '#ffef22' }}>

                        {
                            loader ? (
                                <ActivityIndicator color={"black"} />
                            ) :

                                (<Text style={{ color: 'black', fontFamily: fonts.MontserratBold, fontSize: 14 }}>
                                    Alert Me
                                </Text>)
                        }
                    </TouchableOpacity>

                </View>





                <Modal isOpen={opened} onClose={() => { setOpened(false) }} safeAreaTop={true}>
                    <Modal.Content w="90%" {...styles[placements]} style={{ backgroundColor: 'white', height: 278, justifyContent: 'center', alignItems: 'center' }}>


                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                            <View>
                                <Image source={exclimation} />
                            </View>






                            <Text style={{ color: 'black', fontSize: 16, fontFamily: fonts.MontserratMedium }}>
                                Are you sure you want to cancel it?
                            </Text>








                        </View>


                        <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 21, alignItems: "center", marginTop: 40, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '65%' }}>
                                <TouchableOpacity onPress={() => { setOpened(false) }} style={{ width: 92, height: 44, borderRadius: 45, borderWidth: 1, borderColor: 'black', justifyContent: "center", alignItems: 'center' }}>
                                    <Text style={{ color: 'black', fontFamily: fonts.MontserratBold, fontSize: 14 }}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '35%', justifyContent: 'flex-end', flexDirection: 'row' }}>

                                <TouchableOpacity onPress={() => { setOpened(false); Alert(); setLoader(true) }} style={{ width: 92, height: 44, borderRadius: 45, justifyContent: "center", alignItems: 'center', backgroundColor: '#ffef22' }}>
                                    <Text style={{ color: 'black', fontFamily: fonts.MontserratBold, fontSize: 14 }}>
                                        Yes
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>


                    </Modal.Content>
                </Modal>









            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderRadius: 5,

        backgroundColor: '#fff',
        color: '#424242',
    },
    CustomInnerView: {
        width: '100%',
        paddingHorizontal: 12,
        paddingVertical: 22,
        backgroundColor: '#2A2A2A',


        borderRadius: 10,
        marginTop: 20
    },
    CustomView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 21,
    },
    mainText: {
        fontFamily: fonts.MontserratSemiBold,
        fontSize: 24,
        color: "#ffef22",
        marginTop: 15

    },
    mainView: {
        flex: 1,
        backgroundColor: 'black',
    },
    header: {
        width: '100%',
        paddingHorizontal: 21,
        marginTop: 20
    }
})

export default PriceAlert