import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
    Alert,
  Keyboard
} from "react-native";
import React, { useEffect, useState } from "react";
import { Input, NativeBaseProvider, Divider, ScrollView, Modal, Button, FormControl, KeyboardAvoidingView } from "native-base";
import fonts from "../../../theme/fonts";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import apis from "../../../lib/apis";


const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Address = (props) => {
  console.log("props from addAdress", props);
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState("");
  const [updatingLoading, setUpdatingLoading] = useState(false)
    const openModal = placement => {
        setOpen(true);
        setPlacement(placement);
    };

  useEffect(() => {
    getAddress();
  }, [props, props.pincode]);

  function getAddress() {
    setLoading(true);
    console.log("getAddress test");

    apis
      .getAddress()
      .then((res) => {
        console.log("response", res);
        // setLoading(true)

        if (res.data.message) {
          console.log("success", res.data.message);
          setUser(res.data.user.addresses);
          // setUser(res.data.user.addresses)
          console.log("set user", res.data.user.addresses);
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

  const removeAddressConformation = (code) =>
    Alert.alert('Address', 'Are you sure to delete address', [
      {
        text: 'Cancel',
        // onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => removeAddress(code)},
    ]);


  function removeAddress(pin_code) {
    // setLoader(true);
    let params = {
      pin_code: pin_code,
    };
    console.log("params", params);
    apis
      .removeAddress(params)
      .then(async (res) => {
        // setLoader(false);
        // setUrl("set url ",res.data.url)
        if (res.status == 200) {
          // setUrl("set url ", res.data.url)
          console.log("res", res);
          console.log(" response status", `${res.data.message}`);
          Alert.alert("", res.data.message);
          getAddress();
          // navigation.navigate("PaymentPayu", { url: res.data.url })
          // Linking.openURL(res.data.url)

          // navigation.dispatch(StackActions.replace("HomeScreen"));
        } else {
          console.log("error", `${res.data.error}`);
          Alert.alert("", res.data.message);
          // toast.show({
          //     render: () => {
          //         return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
          //             {res.data.message}
          //         </Box>;
          //     }
          // });
        }
      })
      .catch((err) => {
        // setLoader(false);
        console.log("err", err);
      });
  }



  function editAddress(pin_code) {
    // setLoader(true);
    let params = {
      address: address,
      pin_code: pincode,
      state: state,
      type:type,
    };
    setUpdatingLoading(true)
    console.log("params", params);
    apis
      .editAddress(params)
      .then(async (res) => {
        // setLoader(false);
        // setUrl("set url ",res.data.url)
        if (res.status == 200) {
          setOpen(false);
          // setUrl("set url ", res.data.url)
          console.log("res", res);
          console.log(" response status", `${res.data.message}`);
          Alert.alert("", res.data.message);
          getAddress();
          // navigation.navigate("PaymentPayu", { url: res.data.url })
          // Linking.openURL(res.data.url)
          setUpdatingLoading(false)
          // navigation.dispatch(StackActions.replace("HomeScreen"));
        } else {
          console.log("error", `${res.data.error}`);
          setUpdatingLoading(false)
          Alert.alert("", res.data.message);
          // toast.show({
          //     render: () => {
          //         return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
          //             {res.data.message}
          //         </Box>;
          //     }
          // });
        }
      })
      .catch((err) => {
        // setLoader(false);
        setUpdatingLoading(false)
        console.log("err", err);
      });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    getAddress();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
      <View style={styles.mainView}>
          <KeyboardAvoidingView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
          >
         
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            marginTop: 20,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <AntDesign name="left" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View
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
        </View>

        {loading ? (
          <View>
            <ActivityIndicator color="white" />
          </View>
        ) : (
          <FlatList
            data={user}
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
                  <View
                    style={{
                      width: "100%",
                      // flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 5,
                      backgroundColor: "#2A2A2A",
                      borderRadius: 20,
                      justifyContent: "space-between",
                      paddingVertical: 20,
                    }}
                  >
                          <View style={styles.deleterow}>
                              <TouchableOpacity
                                  onPress={() => {openModal("center");setAddress(item.address);
                                  setPincode(item.pin_code);setState(item.state);setType(item.state)
                                }}
                              >
                                  <Entypo name={"edit"} color={"white"} size={20} />
                              </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          removeAddressConformation(item.pin_code)
                          // removeAddress(item.pin_code);
                        }}
                      >
                        <AntDesign name={"delete"} color={"white"} size={20} />
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View style={styles.row}>
                        <Text
                          style={{
                            color: "white",
                            fontFamily: fonts.MontserratMedium,
                            fontSize: 16,
                          }}
                        >
                          Address:
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            fontFamily: fonts.MontserratMedium,
                            fontSize: 16,
                          }}
                        >
                          {item.address}
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Text
                          style={{
                            color: "white",
                            fontFamily: fonts.MontserratMedium,
                            fontSize: 16,
                          }}
                        >
                          Pin Code:
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            fontFamily: fonts.MontserratMedium,
                            fontSize: 16,
                          }}
                        >
                          {item.pin_code}
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Text
                          style={{
                            color: "white",
                            fontFamily: fonts.MontserratMedium,
                            fontSize: 16,
                          }}
                        >
                          State:
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            fontFamily: fonts.MontserratMedium,
                            fontSize: 16,
                          }}
                        >
                          {item.state}
                        </Text>
                      </View>
                      <View style={styles.row}>
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
                      </View>
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
              );
            }}
          />
        )}

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{
              width: 296,
              height: 51,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FACD18",
              borderRadius: 10,
            }}
            onPress={() => {
              navigation.navigate("AddAddress");
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 16,
                fontFamily: fonts.MontserratBold,
              }}
            >
              Add Address
            </Text>
                  </TouchableOpacity>
                  

              </View>
              
              <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
                  <Modal.Content bg={"#262626"} maxWidth="350" {...styles[placement]}>
                      <Modal.CloseButton />
                      <Modal.Header >Update Address</Modal.Header>
                      <Modal.Body>
                          <FormControl>
                              {/* <FormControl.Label style={{color:'white'}}>Address</FormControl.Label> */}

                              <Text style={{color:"white", marginBottom:3}}  >
                                Address
                              </Text>
                  <Input style={{color:'white'}} value={address}  onChangeText={(val) => {
                    console.log("address", val)
                    setAddress(val)
                              }} />
                          </FormControl>
                          <FormControl mt="3">
                              {/* <FormControl.Label>Pin Code</FormControl.Label> */}

                              <Text style={{ color: "white", marginBottom: 3 }}  >
                                Pin Code
                              </Text>
                  <Input style={{color:'white'}}
                  value={pincode}
                    onChangeText={(val) => {
                      console.log("pincode", val)
                      setPincode(val)
                    }}
                  />
                          </FormControl>

                          <FormControl mt="3">
                              {/* <FormControl.Label>State</FormControl.Label> */}
                              <Text style={{ color: "white", marginBottom: 3 }}  >
                                 State
                              </Text>
                  <Input style={{color:"white"}}
                  value={state}
                    onChangeText={(val) => {
                      console.log("state", val)
                      setState(val)
                    }}
                  />

                          </FormControl>
                          <FormControl mt="3">
                              {/* <FormControl.Label>Type</FormControl.Label> */}
                              <Text style={{ color: "white", marginBottom: 3 }}  >
                                  Type
                              </Text>
                  <Input style={{color:'white'}} value={type} onChangeText={(val) => {
                    console.log("type", val)
                    setType(val)
                  }} />
                          </FormControl>
                      </Modal.Body>
                      <Modal.Footer>
                          <Button.Group space={2}>
                              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                  setOpen(false);
                              }}>
                                  Cancel
                              </Button>
                            {updatingLoading ? <ActivityIndicator /> : <Button onPress={() => {
                    editAddress()
                              }}>
                                  Save
                              </Button>}
                          </Button.Group>
                      </Modal.Footer>
                  </Modal.Content>
              </Modal>
      </ScrollView>
          </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Address;
