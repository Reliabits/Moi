import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { NativeBaseProvider, Input, useToast,Box } from "native-base";
import fonts from "../../theme/fonts";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const UserName = () => {
  const navigation = useNavigation();
  const [payload, setPayload] = useState({
    name: "",
    age: '',
    gender: "",
  });
  const toast = useToast();


  return (
    <ScrollView style={styles.mainView}>
      <View style={{ width: "100%", marginTop: 50, paddingHorizontal: 20 }}>
        <Text
          style={{
            color: "yellow",
            fontSize: 20,
            fontFamily: fonts.MontserratBold,
          }}
        >
          lets get to know
        </Text>
        <Text
          style={{
            color: "yellow",
            fontSize: 20,
            fontFamily: fonts.MontserratBold,
          }}
        >
          you. Shall we
        </Text>
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
          What is your name ?
        </Text>

        <Input
          onChangeText={(val) => {
            setPayload({ ...payload, name: val });
          }}
          style={{ color: "white" ,margin :15,fontFamily : fonts.MontserratBold, fontSize :18}}
          placeholder="Enter Your name"
        />
      </View>

      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: '50%',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if(payload.name.length == 0){
                toast.show({
                    render: () => {
                      return (
                        <Box bg="red.500" color={'white'} px="3" py="3" rounded="xl"
                         mb={5}>
                          {'Please enter username'}
                        </Box>
                      );
                    },
                  });
                  return ;
            }
            navigation.navigate("Age",{payload : payload});
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

export default () => {
  return (
    <NativeBaseProvider>
      <UserName />
    </NativeBaseProvider>
  );
};
