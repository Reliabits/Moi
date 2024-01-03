/**
    * @description      : 
    * @author           : sheezy
    * @group            : 
    * @created          : 30/01/2023 - 15:52:52
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 30/01/2023
    * - Author          : sheezy
    * - Modification    : 
**/
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import approved from '../assets/images/approved.png'
import reject from '../assets/images/reject.png'
import rejectman from '../assets/images/rejectman.png'
import fonts from '../theme/fonts'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'

const Reject = () => {

    const navigation=useNavigation()
    useEffect(() => {
        setTimeout(function () {
            navigation.navigate("HomeScreen")
        }, 4000);
      }, []);
    return (
        <View style={{ flex: 1, backgroundColor: "black", }}>

            <View style={{ width: "100%", paddingHorizontal: 24, marginTop: 79, paddingStart:133 }}>
                <Image source={reject} />
            </View>

            <View style={{ width: "100%", paddingHorizontal: 24,position:'absolute', top:310, left:10 }}>

                <Image source={rejectman} />

            </View>

            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 200 }}>
                <Text style={{ color: '#ffef22', fontFamily: fonts.MontserratRegular, fontSize: 16}}>
                KYC details!
                
                </Text>
                <Text style={{ color: '#ffef22', fontFamily: fonts.MontserratRegular, fontSize: 14 }}>
                    Please input correct details, if you need help contact support

                </Text>
                

                {/* <TouchableOpacity style={{width:158, height:44, borderRadius:45,borderWidth:1, borderColor:"#ffef22",marginTop:45, justifyContent:'center', alignItems:'center'}} onPress={()=>navigation.pop()}>
                    <Text style={{color:'#ffef22', }} >
                        Try Again
                    </Text>
                </TouchableOpacity> */}
            </View>

            
        </View>
    )
}

export default Reject