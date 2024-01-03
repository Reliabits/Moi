import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useToast, Box } from "native-base";
import fonts from "../../theme/fonts";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import apis from "../../lib/apis";
import { LOADER } from "../../Redux/Constant";
import { useDispatch } from "react-redux";

const Age = (props) => {
  const [payload, setPayload] = useState(props.route.params.payload);
  const toast = useToast();
  const dispatch = useDispatch();

  const navigation = useNavigation();

  function verifyDetail() {
    dispatch({
      type: LOADER,
      payload: true,
    });
    apis
      .updateAccount(payload)
      .then((res) => {
        dispatch({
          type: LOADER,
          payload: false,
        });
        if (res.status == 200) {
          toast.show({
            render: () => {
              return (
                <Box
                  bg="green.500"
                  color={"white"}
                  px="3"
                  py="3"
                  rounded="xl"
                  mb={5}
                >
                  {res.data.message}
                </Box>
              );
            },
          });
          navigation.navigate("Success", { name: payload?.name });
        } else {
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
                  {res.data.message}
                </Box>
              );
            },
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

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

        <Text
          style={{
            color: "yellow",
            fontSize: 20,
            fontFamily: fonts.MontserratBold,
            paddingStart: 20,
          }}
        >
          About
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
          What Gender do you identify with ?
        </Text>
      </View>

      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Pressable
          style={{
            width: "90%",
            height: 70,
            backgroundColor: "white",
            borderRadius: 10,
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            setPayload({ ...payload, gender: "male" });
          }}
        >
          <Fontisto
            name={
              payload.gender == "male"
                ? "radio-btn-active"
                : "radio-btn-passive"
            }
            size={40}
            color="black"
            style={{ paddingLeft: 10 }}
          />
          <Text
            style={{
              color: "black",
              fontFamily: fonts.MontserratBold,
              paddingLeft: 10,
            }}
          >
            Male
          </Text>
        </Pressable>

        <Pressable
          style={{
            width: "90%",
            height: 70,
            backgroundColor: "white",
            borderRadius: 10,
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            setPayload({ ...payload, gender: "female" });
          }}
        >
          <Fontisto
            name={
              payload.gender == "female"
                ? "radio-btn-active"
                : "radio-btn-passive"
            }
            size={40}
            color="black"
            style={{ paddingLeft: 10 }}
          />
          <Text
            style={{
              color: "black",
              fontFamily: fonts.MontserratBold,
              paddingLeft: 10,
            }}
          >
            Female
          </Text>
        </Pressable>

        <Pressable
          style={{
            width: "90%",
            height: 70,
            backgroundColor: "white",
            borderRadius: 10,
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            setPayload({ ...payload, gender: "other" });
          }}
        >
          <Fontisto
            name={
              payload.gender == "Other"
                ? "radio-btn-active"
                : "radio-btn-passive"
            }
            size={40}
            color="black"
            style={{ paddingLeft: 10 }}
          />
          <Text
            style={{
              color: "black",
              fontFamily: fonts.MontserratBold,
              paddingLeft: 10,
            }}
          >
            Other
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (payload.gender.length == 0) {
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
                      {"Please select gender"}
                    </Box>
                  );
                },
              });
              return;
            }
            verifyDetail();
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
