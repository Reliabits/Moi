import { View, Text, StyleSheet, Image, TouchableOpacity, Button, Pressable, TextInput, ScrollView, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import fonts from '../theme/fonts'
import { Radio, Select, Center, Box, CheckIcon, Checkbox, Switch, VStack, Modal, FormControl, Input } from 'native-base'
import exclimation from '../assets/images/exclimation.png'
import apis from '../lib/apis'
import { useNavigation } from '@react-navigation/native'
import moment from "moment";


const AlertPriceList = () => {
    const navigation = useNavigation()

    const [alert, setAlert] = useState([]);


    useEffect(() => {
        getAlert()
        
    },[])
   


    function getAlert() {

        apis
            .getAlert()
            .then(res => {
                console.log("response", (res))

                setAlert(res.data.data)
                // startTimer()

                if (res.data.status == 200 ) {
                    console.log("success", res.data.message)
                    // alert(res.data.message)
                }
                else {
                    console.log("error", res.data.error)
                    // alert(res.data.message)
                }
            }).catch(err => {
                console.log("err", err);
            })
            .finally(() => {
                setLoading(false)
                  
            })


    }
 


    

    return (
        <View style={styles.mainView}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=> {navigation.goBack()}}>

                        <AntDesign name="arrowleft" color="white" size={20} />
                    </TouchableOpacity>

                    <Text style={styles.mainText}>Price Alert
                    </Text>
                </View>

                
                        

                        <FlatList
                            data={alert}
                            style={{ marginTop: 20 }}
                            showsVerticalScrollIndicator={false}
                            // numColumns={3}
                    
                    ListEmptyComponent={() => (
                        <Text
                            style={{
                                color: "white",
                                fontFamily: fonts.MontserratBold,
                                alignSelf: "center",
                                fontSize: 20,
                                paddingTop: "50%",
                            }}
                        >
                            No Data is available
                        </Text>
                    )}
                            renderItem={({ item }) => {
                                return (

                                    <View style={styles.CustomView}>
                                        <View style={styles.CustomInnerView}>
                                            <View style={{ justifyContent: "center", alignItems: 'center' }}>
                                                

                                                {item.active ?
                                                    (
                                                        <AntDesign name="check" color="#ffef22" size={25} />) : (<AntDesign name="close" color="#ffef22" size={25} />) 
                                                   
                                                }
                                                

                                            </View>

                                            <View style={{ paddingStart: 40, justifyContent: 'space-between', }}>
                                                <Text style={{ color: 'white', fontFamily: fonts.MontserratSemiBold, fontSize: 10 }}>
                                                    Alert activated {moment(item?.createdAt).format("lll")}

                                                </Text>
                                                {/* <Text style={{ fontFamily: fonts.MontserratSemiBold, fontSize: 12, color: 'white' }}>
                                                 Notification:   {item.recieving_type}
                                                </Text> */}
                                                <Text style={{ fontFamily: fonts.MontserratSemiBold, fontSize: 12, color: 'white' }}>
                                                    value:   {item.value
}
                                                </Text>

                                                {/* <Text style={{ fontFamily: fonts.MontserratSemiBold, fontSize: 12, color: 'white' }}>
                                                    caret_size:   {item.caret_size}
                                                </Text> */}


                                                <Text style={{ fontFamily: fonts.MontserratSemiBold, fontSize: 12, color: 'white' }}>
                                                    Condition:   {item.condition}
                                                </Text>


                                            </View>

                                        </View>


                                    </View>

                                );
                            }}
                        />

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
        paddingHorizontal: 23,
        paddingVertical: 22,
        backgroundColor: '#2A2A2A',
        flexDirection: 'row',
       
       


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

export default AlertPriceList