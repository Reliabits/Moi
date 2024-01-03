import { View, Text, SafeAreaView, Image, TouchableOpacity,  } from 'react-native'
import React from 'react'
import moilogo from '../../assets/images1.2/moilogo.png'
import bsl from '../../assets/images1.2/BSL.png'
import bottom from '../../assets/images1.2/bottomlogo.png'
import fonts from '../../theme/fonts'
import { useNavigation } from '@react-navigation/native'

const Accounts = () => {
    const navigation = useNavigation()
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
          <View style={{width:'100%', marginTop:74.78, justifyContent:'center', alignItems:'center'}}>
              <Image source={moilogo} />
          </View>
          <View style={{marginTop:81, paddingStart:50, width:'100%', }}>
              <Image source={bsl} />

              <Text style={{fontFamily:fonts.MontserratRegular, fontSize:14, color:'#666666', paddingTop:5}}>
                  A smarter way to own gold
              </Text>
          </View>

          <View style={{width:'100%', paddingHorizontal:65,marginTop:118, justifyContent:"center", alignItems:'center' }}>
              <TouchableOpacity onPress={()=> navigation.navigate("Login")} style={{ height: 58, width: 300, justifyContent: 'center', alignItems: 'center', backgroundColor:'#BF4004', borderRadius:40}}>
                  <Text style={{color:'white', fontFamily:fonts.MontserratBold, fontSize:24}}>NEXT</Text>
              </TouchableOpacity>

              <Text style={{fontFamily:fonts.MontserratRegular, color:"#666666", fontSize:16, paddingTop:20}}>
                  Already have an account with us?
                  
              </Text>
              <TouchableOpacity>
              <Text style={{
                  fontFamily: fonts.MontserratRegular, color: "#BC3E03", fontSize: 16 }}>
                  Login Instead
                  </Text>
              </TouchableOpacity>
          </View>
          <View style={{width:"100%", justifyContent:"flex-end", flexDirection:'row', marginTop:6}}>
              <Image source={bottom} />
          </View>
          

          
    </SafeAreaView>
  )
}

export default Accounts