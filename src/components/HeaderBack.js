import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppLogo from '../assets/svg/AppLogo.svg';
import colors from '../assets/colors';
const HeaderBack = ({onClicked}) => {
  return (
    <View style={styles.container}>
     <View style={{flexDirection:'row'}}>
        <View >
            <TouchableOpacity
            onPress={onClicked}
            >
            <AppLogo height={36} width={30}/>
            </TouchableOpacity>
        </View>
        <View style={{marginHorizontal:8 ,justifyContent:'center'}}>
            <Text style={styles.title}>Buy Digital Gold</Text>
            <Text style={styles.subTitle}>100% Secure | 24k | 99.9% Pure Gold</Text>
        </View>
     </View>
        <View >
        <AppLogo height={36} width={30}/>
        </View>
    </View>
  )
}

export default HeaderBack

const styles = StyleSheet.create({
    container:{
        flexDirection:'row'
         ,alignContent:'center',alignItems:'center'
         ,justifyContent:'space-between',paddingHorizontal:8
    },
    title:{
        color:colors.white,fontWeight:'bold'
    },subTitle:{
        color:colors.tabActiveColor,
        fontSize:9
    }
})