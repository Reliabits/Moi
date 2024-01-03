import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import fonts from '../../theme/fonts'
import yellowC from '../../assets/images/yellowC.png'
import pin1 from '../../assets/images/pin1.png'
import Rocket from '../../assets/images/Rocket.png'
import dot1 from '../../assets/images/dot1.png'
import dot2 from '../../assets/images/dot2.png'

import { useNavigation } from '@react-navigation/native'

const ScreenOne = () => {
    const navigation = useNavigation()
  return (
      <View style={styles.main}>
          <View style={styles.heading}>
              <Text style={{
                  color: '#FFEF22', fontSize: 16, fontFamily: fonts.MontserratBold,
              }}>Money Saved Successfully</Text>
          </View>

          <View style={{width:'100%', paddingHorizontal:20, justifyContent:'center', alignItems:'center', marginTop:64}}>
              <Image source={yellowC} />
              <View style={{position:'absolute', bottom:2}}>
                  <Image source={pin1} />
              </View>
              <View style={{ position: 'absolute', top:121
             }}>
                  <Image source={Rocket} />
              </View>
          </View>

          <View style={{width:'100%', justifyContent:'center', alignItems:'center', marginTop:110, paddingHorizontal:20}}>
              <Text style={{color:'white', fontFamily:fonts.MontserratBold, fontSize:24}}>
                  Fastest way to start{'\n'}
                  your saving journey
              </Text>

              <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:32}}>
                  <Image source={dot1} style={{marginHorizontal:5}} />
                  <Image source={dot2} style={{ marginHorizontal: 5 }} />
                  <Image source={dot2} style={{ marginHorizontal: 5 }} />
              </View>


              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                

                  <TouchableOpacity onPress={()=> {navigation.navigate("ScreenTwo")}} style={{ backgroundColor:'#F5A20D', justifyContent:'center', alignItems:'center', width:175, height:40, borderRadius:30, marginTop:70}}>
                      <Text style={{color:'black', fontFamily:fonts.MontserratBold, fontSize:12}}>
                          Start Now
                      </Text>
                      </TouchableOpacity>
                     
                  
              </View>
          </View>


      
    </View>
  )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor:'black'
        
    },
    heading: {
        width: '100%', 
        justifyContent: 'center', alignItems: 'center',
        paddingHorizontal: 20,
        marginTop:132
    }
})

export default ScreenOne