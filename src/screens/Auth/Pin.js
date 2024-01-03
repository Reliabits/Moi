import { View, Text, StyleSheet, TouchableOpacity, Image,  } from 'react-native'
import React, {useState} from 'react'
import { Input, NativeBaseProvider } from "native-base";
import fonts from '../../theme/fonts';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'

const Pin = () => {
    const navigation = useNavigation();
    const [loader , setLoader] = useState()
  return (
      <View style={styles.mainView}>
          
          <View style={{
              width: '100%', justifyContent: 'center', marginTop: 40, paddingHorizontal: 20,

          }}>
              <View style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',

              }}>
                  <TouchableOpacity onPress={()=> {navigation.goBack()}}>
                      <AntDesign name="left" color="white" size={20} />
                  </TouchableOpacity>
              <Text style={{color:'white', fontSize:20, fontFamily:fonts.MontserratBold, paddingStart:30}}>
                Enter Pin
                  </Text>
                  </View>

              <Input
                  variant="outline"
                  placeholder="Enter Pin"
                  mt={5}
                
                  p={18}
                  fontFamily={fonts.MontserratBold}
                  fontSize={18}
                
                  color={"white"}
              />
              <View style={styles.buttonView}>
                  <TouchableOpacity
                    //   onPress={() => {
                    //       kycpancard();
                    //       kycAdhaar();
                    //     //   setLoader(true)

                    //   }}
                      style={styles.button}
                  >
                      {loader ? (
                          <ActivityIndicator color="white" />

                      ) : (
                          <Text
                              style={{
                                  color: "#000000",
                                  fontSize: 18,
                                  fontFamily: fonts.MontserratBold,
                              }}
                          >
                              CONFIRM
                          </Text>
                      )}

                  </TouchableOpacity>
              </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor:'black'

    },
    buttonView: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20%",
        marginBottom: 100
    },
    button: {
        flexDirection: "row",
        padding: 15,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FACD18",
        borderRadius: 40,
    },
})

export default Pin