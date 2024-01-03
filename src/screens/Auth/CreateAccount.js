import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Pressable, TextInput } from 'react-native'
import React,{useState} from 'react'
import fonts from '../../theme/fonts'
import { Input, Center, Box, Heading, VStack, FormControl, HStack, Link, Button, Icon } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import google from '../../assets/images/google.png'

const CreateAccount = () => {
    const [show, setShow] = React.useState(false);
    const [passwordVisible, setPasswordVisible] = useState(true);


  return (
    <View style={styles.mainView}>
          <ScrollView>
              <View style={styles.header}>
                  <Text style={{fontSize:24, color:"#FFEF22", fontFamily:fonts.MontserratMedium}}>
                      Create Account
                  </Text>
                  <Text style={{ fontSize:12, color: "#FFEF22", marginTop:8, fontFamily:fonts.MontserratMedium }}>
                      Sign up to get started
                  </Text>
                    
              </View>

              <View style={styles.inputView}>
                  
                  <View style={styles.allInputWithIcon}>
                  <Text style={styles.text}>Name</Text>
                  <View style={styles.searchSection}>
                          <AntDesign style={styles.searchIcon} name="user" size={20} color="#A9A9A9" />
                      <TextInput
                          style={styles.input}
                          placeholder="Enter First and Last name"

                          underlineColorAndroid="transparent"
                      />
                  </View>
                  </View>

                  <View style={styles.allInputWithIcon}>
                      <Text style={styles.text}>Email</Text>
                      <View style={styles.searchSection}>
                          <MaterialCommunityIcons style={styles.searchIcon} name="email-open-outline" size={20} color="#A9A9A9" />
                          <TextInput
                              style={styles.input}
                              placeholder="Enter Name"

                              underlineColorAndroid="transparent"
                          />
                      </View>
                  </View>

                  <View style={styles.allInputWithIcon}>
                      <Text style={styles.text}>Phone</Text>
                      <View style={styles.searchSection}>
                          <FontAwesome style={styles.searchIcon} name="phone" size={20} color="#A9A9A9" />
                          <TextInput
                              style={styles.input}
                              placeholder="Enter your phone mobile number"

                              underlineColorAndroid="transparent"
                          />
                      </View>
                  </View>

                  <View style={styles.allInputWithIcon}>
                      <Text style={styles.text}>Password</Text>
                  <View style={styles.searchSection}>
                          <AntDesign style={styles.searchIcon} name="lock" size={20} color="#A9A9A9" />
                      <TextInput
                          style={styles.input}
                          placeholder="Enter Password"
                          secureTextEntry={passwordVisible}
                          underlineColorAndroid="transparent"
                      // onChangeText={(text) => setPassword(text)}


                      />

                      <Feather name={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)} size={15} style={styles.icon} />
                      </View>
                  </View>
                  
                  <View style={styles.buttonView}>
                      <TouchableOpacity
                          // onPress={() => {
                          //     createLoginOTP();
                          // }}
                          style={styles.button}
                      >
                          {/* {loader ? (
                                        <View>
                                            <ActivityIndicator color="white" />
                                        </View>
                                    ) : ( */}
                          <Text
                              style={{
                                  color: "#000000",
                                  fontSize: 12,
                                  fontFamily: fonts.MontserratBold,
                              }}
                          >
                              Create Account
                          </Text>
                          {/* )} */}
                      </TouchableOpacity>
                  </View>

                  <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop:10 }}>
                      <Text style={{ fontSize: 12, fontFamily: fonts.MontserratBold, color: 'white' }}>
                          Or
                      </Text>

                  </View>

                  <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                      <Text style={{ fontSize: 14, fontFamily: fonts.MontserratRegular, color: 'white', }}>
                          Sign up using
                      </Text>
                      {/* <Image style={{ marginStart: 10 }} source={google} /> */}

                  </View>

                  <View style={{ width: '100%',  alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                      
                      <TouchableOpacity style={{ width: 144, height:40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',backgroundColor:'white', borderRadius:5 }}>
                     
                          <Image style={{ marginStart: 20 }} source={google} />
                          <Text style={{ fontSize: 14, fontFamily: fonts.MontserratMedium, color: 'black',marginEnd:40 }}>
                              Gmail
                          </Text>
                      </TouchableOpacity>
                  </View>

                  <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                      
                      <Text style={{ fontSize: 16, fontFamily: fonts.MontserratRegular, color: 'white' }}>Aready have an account? <Text style={{ fontSize: 16, fontFamily: fonts. MontserratBold, color: '#ffef22',  }}>Login</Text>
                      </Text>

                  </View>

                  <View style={styles.bottomText}>
                      <Text
                          style={{
                              color: "white",
                              fontFamily: fonts.MontserratRegular,
                              fontSize: 9.75,
                          }}
                      >
                          By proceeding, you accept the{" "}
                          <Text style={{ fontFamily: fonts.MontserratBold, color: '#ffef22' }}>
                              {" "}
                              terms and conditions
                          </Text>
                      </Text>
                      <Text
                          style={{
                              color: "white",
                              fontFamily: fonts.MontserratRegular,
                              fontSize: 9.75,
                          }}
                      >
                          Read the privacy policy{" "}
                          <Text style={{ fontFamily: fonts.MontserratBold, color: '#ffef22' }}> here.</Text>
                      </Text>
                  </View>



              </View>

              

              
     </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({

    bottomText: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop:20
        // position :'absolute',
        // bottom :10,
    },

    button: {
        height: 44,
        width: 268,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FACD18",
        borderRadius: 40,
    },
    buttonView: {
        width: "100%",

        justifyContent: "center",
        alignItems: "center",
        marginTop: 18,
       
    },
    allInputWithIcon: {
        width: '100%',
        marginTop:10

    },
    text: {
        fontSize: 14,
        fontFamily: fonts.MontserratRegular,
        color:'#ffef22'

    },
    searchSection: {
        width: '100%',
        height: 61,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 10
    },
    searchIcon: {
        padding: 10,
    },
    icon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
    mainView: {
        flex: 1,
        backgroundColor: 'black',
    },
    header: {
        width: '100%',
        paddingHorizontal: 21,
        marginTop:34 
    },
    inputView: {
        width: '100%',
        paddingHorizontal: 21,
        marginTop: 16,
        
    }

})

export default CreateAccount