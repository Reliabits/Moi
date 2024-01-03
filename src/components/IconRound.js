import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppLogo from '../assets/svg/AppLogo.svg';
const IconRound = () => {
  return (
    <View style={styles.IconRoundContainer}>
       <AppLogo height={36} width={30}/>
    </View>
  )
}

export default IconRound

const styles = StyleSheet.create({
    IconRoundContainer:{
        justifyContent:'center'
        ,alignContent:'center'
        ,alignItems:'center'
        ,height:46,
        borderRadius:46 ,
        borderColor:'#fff',
        elevation:2,
        borderWidth:0.9,
        width:46}
})