import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, ActivityIndicator, Alert, FlatList, RefreshControl, } from 'react-native'
import React, { useState, useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import fonts from '../../theme/fonts'
import { Modal, FormControl, Input, Button, Divider } from "native-base"
import { useNavigation } from '@react-navigation/native'
import flower from '../../assets/images/flower.png'
import apis from '../../lib/apis'

import AsyncStorage from '@react-native-async-storage/async-storage'




// const wait = (timeout) => {
//     return new Promise(resolve => setTimeout(resolve, timeout));
// }

const ValidateUpi = () => {

    // console.log("props from sell gold", props)
    // console.log("props from sell gold", props.props.params.route.amount)

    const navigation = useNavigation()
    const [refreshing, setRefreshing] = React.useState(false);


    const [placements, setPlacements] = useState(undefined);
    const [placement, setPlacement] = useState(undefined);
    const [open, setOpen] = useState(false);
    const [opened, setOpened] = useState(false);
    const [UPI, setUPI] = useState("");
    const [loader, setLoader] = useState(false);
    const [accountNumber, setAccountNumber] = useState("");
    const [loading, setLoading] = useState(true)
    const [banks, setBanks] = useState([])
    const [bankid, setBankId] = useState()


    // const token = await AsyncStorage.getItem('token');

    const displayData = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            console.log('token get from AsyncStorage', value);
        } catch (error) {
            console.log('error', error);
        }
    };


    const openedModal = placements => {
        setOpened(true);
        setPlacements(placements);
    };
    const openModal = placement => {
        setOpen(true);
        setPlacement(placement);
    };


    useEffect(() => {
        // getBank();

    }, [])


    // const onRefresh = React.useCallback(() => {
    //     setRefreshing(true);
    //     getBank();
    //     wait(2000).then(() => setRefreshing(false));
    // }, []);



    function validateUpi
        () {
        setLoader(true);
        let params = {

            upi: UPI,

        };
        apis
            .validateUpi(params)
            .then(async (res) => {

                setLoader(false);
                // setUrl("set url ",res.data.url)
                if (res.data.data.isVPAValid == 1) {
                    console.log("status", res.data.data.status)
                    console.log("vpa", res.data.data.vpa)
                    console.log("payer account Name", res.data.data.payerAccountName)
                    Alert.alert("", `${res.data.data.payerAccountName} Upi is valid `)
                    setOpen(false);
                    // getBank()

                } else {
                    console.log("status", res.data.data.status)
                    console.log("vpa", res.data.data.vpa)
                    Alert.alert("", "UPI is Not Valid")
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

                console.log("err", err);
            })
            .finally(() => {
                setLoader(false);
            })
    }





    // const deleteBank = async (upi) => {
    //     console.log("aaaa : ", "Bearer " + (await Global.getToken()));

    //     let response = await fetch('http://45.63.104.40:5000/api/v1/wallet/bank/remove', {
    //         method: 'DELETE',

    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             Authorization: "Bearer " + (await Global.getToken())
    //         },
    //         body: JSON.stringify({
    //             UPI: upi
    //         })
    //     }).then(res => {
    //         getBank();
    //         console.log("Res: ", res, response)
    //     })



    // }

    // function getBank() {
    //     apis
    //         .getBank()
    //         .then(res => {
    //             console.log("response", (res))
    //             setBanks(res.data.data)
    //             if (res.data.message) {
    //                 console.log("success", res.data.message)
    //             }
    //             else {
    //                 console.log("error", res.data.error)
    //             }
    //         }).catch(err => {
    //             console.log("err", err);
    //         })
    //         .finally(() => {
    //             setLoading(false)

    //         })


    // }



    return (
        <View style={styles.mainView}>
            <ScrollView

            //   contentContainerStyle={styles.scrollView}
            //   refreshControl={
            //       <RefreshControl
            //           refreshing={refreshing}
            //           onRefresh={onRefresh}
            //       />
            //   }
            >

                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 27, marginTop: 41 }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>

                        <AntDesign name="arrowleft" color="white" size={20} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 16, fontFamily: fonts.MontserratBold, paddingStart: 80 }}>Select Account</Text>
                </View>


                {/* {loading ? (

                    <ActivityIndicator color="white" />

                ) : (


                    <FlatList
                        data={banks}
                        style={{ marginTop: 20 }}
                        showsVerticalScrollIndicator={false}
                        // numColumns={3}
                        renderItem={({ item }) => {
                            return (

                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 20, marginTop: 20 }} >
                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 21, backgroundColor: '#2A2A2A', height: 69, borderRadius: 20, justifyContent: 'space-between' }}>

                                        <View style={{ width: '80%' }}>
                                            <Text style={{ color: 'white', fontFamily: fonts.MontserratMedium, fontSize: 16, paddingStart: 20 }}>
                                                {item.upi}
                                            </Text>
                                        </View>

                                        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '20%' }}>
                                            <AntDesign name='checkcircle' color="#FFEF22" size={15} />
                                            <TouchableOpacity onPress={() => {
                                                deleteBank(item.upi);
                                                //   setUPI(item.upi);

                                            }}>
                                                <AntDesign name="delete" color="yellow" size={15} />
                                            </TouchableOpacity>

                                        </View>
                                    </View>

                                </View>

                            );
                        }}
                    />

                )}
 */}




                {/* <TouchableOpacity onPress={() => openModal("center")} style={{ flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 20, marginTop: 41 }} >
              <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 21, backgroundColor: '#2A2A2A', height: 69, borderRadius: 20 , justifyContent:'space-between'}}>

                  
                  <Text style={{ color: 'white', fontFamily: fonts.MontserratMedium, fontSize: 16, paddingStart: 20 }}>
                     
                  </Text>
                  <AntDesign name='checkcircle' color="#FFEF22" size={15} />


              </View>

          </TouchableOpacity> */}

                <View style={{ width: '100%', paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>

                    <Divider style={{ marginTop: 21, backgroundColor: '#FFEF22', }} />

                </View>



                <TouchableOpacity onPress={() => openModal("center")} style={{ flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 20, marginTop: 20 }} >
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 21, backgroundColor: '#2A2A2A', height: 69, borderRadius: 20 }}>

                        <AntDesign name='plus' color="white" size={20} />
                        <Text style={{ color: 'white', fontFamily: fonts.MontserratMedium, fontSize: 16, paddingStart: 20 }}>
                            Add New UPI ID
                        </Text>


                    </View>

                </TouchableOpacity>




                {/* <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate("ConfirmWithdraw", { props: props, }) }} style={{ width: 221, height: 44, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFEF22', borderRadius: 16 }}>
                        <Text style={{ color: 'black', fontSize: 16, fontFamily: fonts.MontserratBold }}>
                            Withdraw cash
                        </Text>
                    </TouchableOpacity>

                </View> */}


                <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
                    <Modal.Content w="90%" {...styles[placement]} style={{ backgroundColor: '#2A2A2A' }}>

                        <Modal.Body>
                            <FormControl style={{ alignItems: 'center' }}>
                                <Text style={{ color: '#FFEF22', fontSize: 16, fontFamily: fonts.MontserratMedium }}>
                                    Enter your new UPI id </Text>
                                <View style={{ width: 350, borderRadius: 30, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30, marginTop: 20 }}>
                                    <TextInput onChangeText={(val) => { setUPI(val) }} placeholder='UPI ID' style={{ width: '100%', backgroundColor: 'white', borderRadius: 30 }} />
                                    <AntDesign name="close" color="black" size={15} />
                                </View>
                            </FormControl>

                        </Modal.Body>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>



                            <TouchableOpacity onPress={() => {
                                //   setOpen(false);
                                //   openedModal("center");
                                // addUPI();
                                validateUpi()


                                setLoader(true)
                            }}



                                style={{ width: 221, height: 44, borderRadius: 16, backgroundColor: '#FFEF22', justifyContent: 'center', alignItems: 'center', borderRadius: 30, marginTop: 30 }}>

                                {
                                    loader ? (
                                        <ActivityIndicator color="white" />
                                    ) : (
                                        <Text style={{ color: 'black', fontSize: 16, fontFamily: fonts.MontserratBold }}>
                                            Verify to Confirm
                                        </Text>
                                    )
                                }

                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                setOpen(false);
                                // getBank()
                            }} style={{ width: 221, height: 44, borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderRadius: 30 }}>
                                <Text style={{ color: '#FFEF22', fontSize: 10, fontFamily: fonts.MontserratMedium }}>
                                    cancel
                                </Text>
                            </TouchableOpacity>



                        </View>


                    </Modal.Content>
                </Modal>


                <Modal isOpen={opened} onClose={() => setOpened(false)} safeAreaTop={true}>
                    <Modal.Content w="90%" {...styles[placements]} style={{ backgroundColor: '#2A2A2A' }}>

                        <Modal.Body>


                        </Modal.Body>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                            <View>
                                <Image source={flower} />
                            </View>





                            <TouchableOpacity onPress={() => {
                                setOpened(false);
                            }} style={{ width: 221, height: 44, borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderRadius: 30 }}>
                                <Text style={{ color: '#FFEF22', fontSize: 16, fontFamily: fonts.MontserratMedium }}>
                                    UPI ID added successfully
                                </Text>
                            </TouchableOpacity>



                        </View>


                    </Modal.Content>
                </Modal>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'black'
    }
})

export default ValidateUpi