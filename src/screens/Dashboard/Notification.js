import { View, Text, StyleSheet, Pressable, Image, FlatList, TouchableOpacity , ActivityIndicator } from 'react-native'
import React from 'react';
// import apis from '../../lib/apis';
import apis from '../../lib/apis';
import { useEffect } from 'react';
import { useState } from 'react';
import fonts from '../../theme/fonts';
import Entypo from 'react-native-vector-icons/Entypo'   
import AntDesign from 'react-native-vector-icons/AntDesign'   
import { useNavigation } from '@react-navigation/native';

const Notification = () => {
    const navigation = useNavigation()

    const [notification, setNotification] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // getAddress()
        getNotification()
      
  },[])

    function getNotification() {
        setLoading(true);
        console.log("getNotification");

        apis
            .getNotification()
            .then((res) => {
                console.log("response", res);
                // setLoading(true)

                if (res.data.message) {
                    console.log("success", res.data.message);
                    setNotification(res.data.notification);
                    // setUser(res.data.user.addresses)
                    console.log("set notification", res.data.notification);
                } else {
                    console.log("error", res.data.error);
                }
            })
            .catch((err) => {
                console.log("err", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }
  return (
    <View style={styles.mainView}>
          <View
              style={{
                  width: "100%",
                  paddingHorizontal: 20,
                  marginTop: 20,
                //   justifyContent: "center",
                  alignItems:'center',
                  flexDirection:'row'
              }}
          >
              <TouchableOpacity
                  onPress={() => {
                      navigation.goBack();
                  }}
              >
                  <AntDesign name="left" size={20} color="white" />
              </TouchableOpacity>

              <Text style={{
                  paddingStart:'30%',
                  color: "white",
                  fontSize: 20,
                  fontFamily: fonts.MontserratBold,
              }}>Notification</Text>
              
          </View>

          {/* <View
              style={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: 40,
                  paddingHorizontal: 20,
              }}
          >
              <Text
                  style={{
                      color: "white",
                      fontSize: 20,
                      fontFamily: fonts.MontserratBold,
                  }}
              >
                  Manage address
              </Text>

              <Text
                  style={{
                      color: "white",
                      fontSize: 14,
                      fontFamily: fonts.MontserratRegular,
                      paddingTop: 10,
                  }}
              >
                  you can view details of your saved address
              </Text>
          </View> */}

          {loading ? (
              <View>
                  <ActivityIndicator color="white" />
              </View>
          ) : (
              <FlatList
                  data={notification}
                  style={{ marginTop: 20 }}
                  showsVerticalScrollIndicator={false}
                  // numColumns={3}
                  ListEmptyComponent={() => (
                      <Text
                          style={{
                              color: "white",
                              fontFamily: fonts.MontserratBold,
                              alignSelf: "center",
                              fontSize: 20,
                              paddingTop: "50%",
                          }}
                      >
                          No Address found
                      </Text>
                  )}
                  renderItem={({ item }) => {
                      return (
                          <View
                              style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  width: "100%",
                                  paddingHorizontal: 20,
                                  marginTop: 20,
                              }}
                          >
                              
                              {/* <AntDesign name="bells" size={20} color="white" /> */}

                              <View
                                  style={{
                                      width: "100%",
                                      flexDirection: "row",
                                      alignItems: "center",
                                      paddingHorizontal: 5,
                                      backgroundColor: "black",
                                    //   borderRadius: 20,
                                      borderWidth: 1,
                                      borderBottomColor:'grey',
                                      justifyContent: "space-between",
                                      paddingVertical: 20,
                                  }}
                              >
                                  <View style={{justifyContent:'center', alignItems:'center'}}>
                                  <AntDesign name="bells" size={20} color="white" />
                                  </View>

                                  <View style={{alignItems:'center', width:'100%', }}>
                                
                                  
                                  
                                  
                                  
                                  <View style={styles.deleterow}>
                                      
                                      {/* <AntDesign name="bells" size={20} color="white" /> */}
                                      
                                      {/* <TouchableOpacity

                                          

                                      >
                                          <Entypo name={"edit"} color={"white"} size={20} />
                                      </TouchableOpacity>
                                      <TouchableOpacity
                                          onPress={() => {
                                              removeAddress(item.pin_code);
                                          }}
                                      >
                                          <AntDesign name={"delete"} color={"white"} size={20} />
                                      </TouchableOpacity> */}
                                  </View>

                                  <View
                                      style={{
                                          width: "100%",
                                          justifyContent: "center",
                                          alignItems: "center",
                                      }}
                                  >
                                      {/* <View style={styles.row}>
                                          <Text
                                              style={{
                                                  color: "white",
                                                  fontFamily: fonts.MontserratMedium,
                                                  fontSize: 16,
                                              }}
                                          >
                                              Type:
                                          </Text>
                                          <Text
                                              style={{
                                                  color: "white",
                                                  fontFamily: fonts.MontserratMedium,
                                                  fontSize: 16,
                                              }}
                                          >
                                              {item.type}
                                          </Text>
                                      </View> */}
                                      <View style={styles.row}>
                                          {/* <Text
                                              style={{
                                                  color: "white",
                                                  fontFamily: fonts.MontserratMedium,
                                                  fontSize: 16,
                                              }}
                                          >
                                             header
                                          </Text> */}
                                          <Text
                                              style={{
                                                  color: "#ffef22",
                                                  fontFamily: fonts.MontserratBold,
                                                  fontSize: 16,
                                              }}
                                          >
                                              {item.header}
                                          </Text>
                                      </View>
                                      <View style={styles.row}>
                                          {/* <Text
                                              style={{
                                                  color: "white",
                                                  fontFamily: fonts.MontserratMedium,
                                                  fontSize: 16,
                                              }}
                                          >
                                              body
                                          </Text> */}
                                          <Text
                                              style={{
                                                  color: "white",
                                                  fontFamily: fonts.MontserratMedium,
                                                  fontSize: 14,
                                              }}
                                          >
                                              {item.body}
                                          </Text>
                                      </View>
                                      {/* <View style={styles.row}>
                                          <Text
                                              style={{
                                                  color: "white",
                                                  fontFamily: fonts.MontserratMedium,
                                                  fontSize: 16,
                                              }}
                                          >
                                              Type:
                                          </Text>

                                          <Text
                                              style={{
                                                  color: "white",
                                                  fontFamily: fonts.MontserratMedium,
                                                  fontSize: 16,
                                              }}
                                          >
                                              {item.type}
                                          </Text>
                                      </View> */}
                                  </View>

                                  <View
                                      style={{
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                          flexDirection: "row",
                                          width: "20%",
                                      }}
                                  >
                                      {/* <AntDesign name='checkcircle' color="#FFEF22" size={15} />
                                    <TouchableOpacity onPress={() => {
                                        deleteBank(item.upi);
                                        //   setUPI(item.upi);

                                    }}>
                                        <AntDesign name="delete" color="yellow" size={15} />
                                    </TouchableOpacity> */}
                                      </View>
                              </View>
                              
                              </View>

                                  </View>
                              
                          
                      );
                  }}
              />
          )}

         

         
              
             
    </View>
  )
}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'black'
    },
    deleterow: {
        width: "100%",
        height: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    row: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    mainView: {
        flex: 1,
        backgroundColor: "black",
    },
    buttonView: {
        width: "100%",

        marginTop: "20%",
        backgroundColor: "grey",
        height: "70%",
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
    top: {
        marginBottom: "auto",
        marginTop: 0
    },
    bottom: {
        marginBottom: 0,
        marginTop: "auto"
    },
    left: {
        marginLeft: 0,
        marginRight: "auto"
    },
    right: {
        marginLeft: "auto",
        marginRight: 0
    },
    center: {}
})

export default Notification