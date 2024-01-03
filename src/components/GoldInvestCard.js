import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors'

const GoldInvestCard = () => {
  return (
    <View style={styles.container}>

<View style={styles.innerContainer}>
<Text style={styles.normaltext}>
Enter the amount
</Text>
<View style={{marginVertical:24}}>
<Text style={styles.boldText}>
            00.00 ₹
</Text>
</View>

<Text style={styles.normaltext}>
You buy{'\n'}0.000gm
</Text>
</View>
       </View>
  )
}

export default GoldInvestCard

const styles = StyleSheet.create({
    normaltext:{
        textAlign:'center',color:colors.lightext
    },boldText:{textAlign:'center',fontSize:30,fontWeight:'bold',color:colors.lightext},
    container:{
        paddingVertical:22,
        backgroundColor:colors.lightapp,justifyContent:'center'
        ,borderRadius:8,marginVertical:12,alignContent:'center',alignItems:'center'},
        innerContainer:{flexDirection:'column',justifyContent:'space-between',alignContent:'center',alignItems:'center'}
})