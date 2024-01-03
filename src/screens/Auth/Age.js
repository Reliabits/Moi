import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { NativeBaseProvider, Input, useToast, Box } from "native-base";

import fonts from "../../theme/fonts";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";

const Age = (props) => {
  const navigation = useNavigation();
  const [payload, setPayload] = useState(props.route.params.payload);
  const toast = useToast();

  return (
   
      <ScrollView style={styles.mainView}>
        <View
          style={{
            width: "100%",
            marginTop: 50,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign name="arrowleft" size={25} color="yellow" />
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", marginTop: 100, paddingHorizontal: 20 }}>
          <Text
            style={{
              color: "yellow",
              paddingVertical: 20,
              fontSize: 20,
              fontFamily: fonts.MontserratMedium,
            }}
          >
            {" "}
            What's your Age ?
          </Text>

          <Input
            onChangeText={(val) => {
              setPayload({ ...payload, age: val });
            }}
            keyboardType={'phone-pad'}
            style={{ color: "white" ,margin :15,fontFamily : fonts.MontserratBold, fontSize :18}}
            placeholder="Enter Your age"
          />
        </View>

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: '40%',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (payload.age.length == 0) {
                toast.show({
                  render: () => {
                    return (
                      <Box
                        bg="red.500"
                        color={"white"}
                        px="3"
                        py="3"
                        rounded="xl"
                        mb={5}
                      >
                        {"Please enter age"}
                      </Box>
                    );
                  },
                });
                return;
              }

              navigation.navigate("Gender", { payload: payload });
            }}
            style={{
              width: "90%",
              height: 50,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "yellow",
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 18,
                fontFamily: fonts.MontserratBold,
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
  
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default Age;
