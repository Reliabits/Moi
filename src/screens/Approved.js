import { View, Text, Image } from 'react-native'
import React from 'react'
import approved from '../assets/images/approved.png'
import approvedman from '../assets/images/approvedman.png'
import fonts from '../theme/fonts'
import { useNavigation } from "@react-navigation/native";
import { useEffect } from 'react'

const Approved = () => {

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(function () {
            navigation.navigate("HomeScreen")
        }, 4000);
      }, []);


  return (
      <View style={{ flex: 1, backgroundColor: "black", }}>
          
          <View style={{width:"100%", paddingHorizontal:24,marginTop:79}}>
              <Image source={approved} />
            
              
          </View>

          <View style={{ width: "100%", paddingHorizontal: 24, justifyContent:"center", alignItems:'center', top:360, position:'absolute', left:22}}>
             
              <Image source={approvedman} />

          </View>

          <View style={{width:'100%', alignItems:'center', justifyContent:'center', marginTop:200}}>
              <Text style={{color:'#ffef22', fontFamily:fonts.MontserratRegular, fontSize:16}}>
                  Congratulations!
              </Text>
              <Text style={{ color: '#ffef22', fontFamily: fonts.MontserratRegular, fontSize: 14 }}>
                  Your KYC is successfully completed!
                  
              </Text>
          </View>

      <Text>Approved</Text>
    </View>
  )
}

export default Approved