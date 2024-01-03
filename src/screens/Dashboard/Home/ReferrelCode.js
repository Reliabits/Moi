/**
    * @description      : 
    * @author           : sheezy
    * @group            : 
    * @created          : 02/02/2023 - 16:04:48
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 02/02/2023
    * - Author          : sheezy
    * - Modification    : 
**/
import { Checkbox, Row, ScrollView, View } from 'native-base'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import fonts from '../../../theme/fonts'
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';


const headerReferrelCode=()=>{

    const navigation = useNavigation();

return (
    <SafeAreaView >
    <View
      style={{
        width: "100%",
        alignItems: "center",
        height: 40,
        flexDirection: "row",
        justifyContent:"space-between",
        paddingHorizontal: 20,
        
      }}
    >
      <TouchableOpacity onPress={() => navigation.pop()}>
        <AntDesign name="arrowleft" size={25} color="grey" />
      </TouchableOpacity>
      <View >
      <Text  style={[styles.label]}>Refer and Earn</Text>
      <Text style={{color:"yellow",fontSize:13}}>24k | 99.95% Pure Gold</Text>
      </View>
      <View>
      <AntDesign name="star" size={25} color="yellow" />
      </View>
    </View>
    <View style={{borderWidth:0.5,
        borderBottomColor:'gray',paddingTop:5}}>
    </View>
  </SafeAreaView>
)
}

const ReferrelCode = () => {
  return (
  <View style={{flex:1,backgroundColor:"black"}}>
    {headerReferrelCode()}
    <ScrollView>
      <View style={{paddingHorizontal:8}}>

    <View style={{height:120,width:"100%",backgroundColor:"#272139",marginTop:20,
   paddingHorizontal:21,borderRadius:10
  }}>
        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center", height:60, borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 1,
  borderLeftWidth: 0,
       borderBottomColor:"gray"}}>
          <View style={{flexDirection:"row"}}>

          <Checkbox
        checked={true}
        />
            <Text style={{color:"white",paddingLeft:10}}>
            Use Winnings
            </Text>
        </View>
            <View style={{borderLeftWidth:1,borderLeftColor:"gray",paddingLeft:10,alignItems:"center"}}>

            <Text style={{color:"white" }} >
            Available Today
            </Text>
            <Text style={{color:"white" }}>
            ₹67.1
            </Text>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center"}}>
        <Text style={{color:"white",paddingTop:20}}>
          You pay ₹5.50 less on ₹101 gold purchase
        </Text>
        </View>
    </View>

    {/* Amount payable section  */}
    <View style={{height:110, borderRightWidth: 0, marginTop:30,
  borderBottomWidth: 1,
  borderLeftWidth: 0,borderTopWidth:1,borderColor:"gray",flexDirection:"row",
      justifyContent:"space-between",alignItems:"center"
  }}>
    <View>
      <Text style={{color:"gray"}}>
      Amount Payable 
      </Text>
      <Text style={{color:"white",paddingTop:5}}>

      ₹95.95(incl.GST)
      </Text>
    </View>
    <View style={{flexDirection:"row"}}>
      <Text style={{color:"gray",paddingRight:8}}>
        Show Breakdown
      </Text>
        <AntDesign name="down" size={18} color="grey" />
    </View>
    </View>
  {/* coupon section  */}
  <View style={{flexDirection:"row",marginTop:20}}>
    <AntDesign name="plussquareo" size={28} color="grey" />
    <Text style={{color:"white",fontSize:20,paddingLeft:20}}>Apply Coupon</Text>
  </View>

  {/* scroll cards  */}
  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

  <View style={{height:180,width:300,backgroundColor:"#272139",marginTop:20,margin:10,
   paddingHorizontal:21,borderRadius:10}}>
    <View style={{flexDirection:"row",justifyContent:"space-between",paddingTop:10}}>
      <View style={{flexDirection:"row"}}>
      <AntDesign name="tago" size={18} color="grey" />

        <Text style={{color:"white",paddingLeft:8}}>
      THIRDJAR
        </Text>
      </View>
      <Text style={{color:"seagreen"}}>
  APPLY
      </Text>
    </View>
 <View style={{paddingTop:30}}>
  <Text style={{color:"white"}}>
    Get 5% of Gold
  </Text>
  <Text style={{color:"gray"}}>
    upto Rs 20 min purchase of Rs20
  </Text>
 </View>
 </View >

  <View style={{height:180,width:300,backgroundColor:"#272139",marginTop:20,margin:10,
   paddingHorizontal:21,borderRadius:10}}>
    <View style={{flexDirection:"row",justifyContent:"space-between",paddingTop:10}}>
      <View style={{flexDirection:"row"}}>
      <AntDesign name="tago" size={18} color="grey" />

        <Text style={{color:"white",paddingLeft:8}}>
      THIRDJAR
        </Text>
      </View>
      <Text style={{color:"seagreen"}}>
  APPLY
      </Text>
    </View>
 <View style={{paddingTop:30}}>
  <Text style={{color:"white"}}>
    Get 5% of Gold
  </Text>
  <Text style={{color:"gray"}}>
    upto Rs 20 min purchase of Rs20
  </Text>
 </View>
 </View >

     </ScrollView>
     
<View style={{flexDirection:"row"}}>

<Text style={{color:"gray"}}>Have a different code ?</Text>
<Text style={{color:"white" ,paddingLeft:3,borderBottomWidth:1,borderBottomColor:"white"}}>Click Here</Text>
</View>

{/* live buy price  */}

<View style={{flexDirection:"row" ,justifyContent:"space-between",paddingHorizontal:5,height:50,alignItems:"center", backgroundColor:"#272165",marginTop:20}}>
  <View style={{flexDirection:'row'}}>

  <Text style={{color:"gray"}}>
Live buy price
  </Text>
  <Text style={{color:"white",paddingLeft:5}}>
 ₹5846.4/gm
  </Text>
  </View>
  <Text style={{color:"gray"}}>
valid for 02:04
  </Text>
</View>

{/* button portion  */}
<View style={{flexDirection:"row",justifyContent:"center"}}>

<View style={{backgroundColor:"#A443FF",height:45,width:"80%",borderRadius:20,marginTop:15,justifyContent:"center",alignItems:"center"}}>
  <Text style={{color:"white",fontSize:20,fontWeight:"bold"}}>
  Button
  </Text>
</View>
</View>

<View style={{flexDirection:"row",justifyContent:"center",paddingTop:20}}>
  <Text style={{color:"gray",paddingEnd:5}}>
    Term of use 
  </Text>
  <Text style={{color:"gray",paddingEnd:5}}>
      |
  </Text>
  <Text style={{color:"gray"}}>
     Privacy of policy
  </Text>
</View>


  </View>

    </ScrollView>
  </View>
    )
}

const styles = StyleSheet.create({
    label: {
      color: "white",
      fontFamily: fonts.MontserratBold,
      fontSize: 15,
    },
    padding: {
      paddingStart: 20,
    },
    underline: {
      borderBottomWidth: 1,
      borderBottomColor: "grey",
      paddingBottom: 10,
    },
    labelRight: {
      color: "white",
      paddingStart: 20,
      fontFamily: fonts.MontserratRegular,
      fontSize: 15,
      alignSelf: "center",
    },
   
    mainView: {
      backgroundColor: "#000000",
    },
  });

export default ReferrelCode