/**
    * @description      : 
    * @author           : sheezy
    * @group            : 
    * @created          : 02/02/2023 - 19:50:05
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 02/02/2023
    * - Author          : sheezy
    * - Modification    : 
**/
import React from 'react';
import {Text, View,Linking,TouchableOpacity} from 'react-native';
import fonts from '../theme/fonts';
const GetHelp = () => {
    const phoneCall = () => {

    }
    return(
        <View style={{flex:1,justifyContent: "center",alignItems: "center", backgroundColor:"black", paddingHorizontal:21}}>
            <Text style={{ color: 'white', fontSize: 18, fontFamily: fonts.MontserratMedium }}>Moi Support is Available 24/7, Please call for any assistance or Feedback </Text>
            
            <View style={{width:'100%', justifyContent:'center', alignItems:'center', marginTop:20}}>
            <TouchableOpacity style={{width:292, justifyContent:"center", alignItems:"center", backgroundColor:'#ffef22', height:58, borderRadius:20}} onPress={() => {Linking.openURL('tel:+91-7010935074');}}>
                <Text style={{ color: 'black', fontSize: 18, fontFamily: fonts.MontserratMedium }}>+91-7010935074</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
  };
  
  export default GetHelp;